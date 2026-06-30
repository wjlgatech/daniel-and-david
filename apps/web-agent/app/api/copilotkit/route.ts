// ─────────────────────────────────────────────────────────────────────────────
// CopilotKit runtime endpoint — the agentic brain of the Builder Loop Coach.
// Backed by the free-LLM survival chain (lib/llm.ts).
//
// PROVIDER SELECTION (the right way — SPEC §9a): the streaming adapter pins ONE
// provider and a mid-stream failure (e.g. a provider whose OpenAI-compat endpoint
// 404s under CopilotKit 1.61.2's adapter — observed with Gemini) can't be failed over
// once the stream has started. So we PRE-FLIGHT: a cheap 1-token completion picks the
// first provider that actually responds, then hand the live request to it. Result is
// cached briefly so we don't pre-flight every message. The key never leaves the server.
//
// SAFETY: per SPEC §4 the cloud brain is adults-only; COACH_ADULT_TOKEN gates it.
// ─────────────────────────────────────────────────────────────────────────────
import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { resolveLlmChain, type LlmProvider } from "@/lib/llm";

export const runtime = "nodejs";

// Cache the last healthy provider for a short window to avoid a pre-flight per message.
const HEALTHY_TTL_MS = 5 * 60_000;
let cached: { provider: LlmProvider; at: number } | null = null;

async function pickHealthyProvider(chain: LlmProvider[]): Promise<LlmProvider | null> {
  if (cached && Date.now() - cached.at < HEALTHY_TTL_MS && chain.some((c) => c.model === cached!.provider.model)) {
    return cached.provider;
  }
  for (const llm of chain) {
    try {
      const openai = new OpenAI({ apiKey: llm.apiKey, baseURL: llm.baseURL });
      // Probe the SAME endpoint CopilotKit 1.61's adapter uses — the Responses API
      // (/responses), NOT /chat/completions. This is what catches a provider whose
      // OpenAI-compat surface lacks /responses (e.g. Gemini → 404), so we skip it and
      // fall through to one that works (OpenAI). A /chat/completions probe would wrongly
      // pass Gemini and then the real stream would 404.
      await openai.responses.create({ model: llm.model, input: "hi", max_output_tokens: 16 });
      cached = { provider: llm, at: Date.now() };
      return llm;
    } catch {
      // provider's /responses endpoint is unhealthy (404/401/429) — try the next.
    }
  }
  return null;
}

export const POST = async (req: NextRequest) => {
  const requiredToken = process.env.COACH_ADULT_TOKEN;
  if (requiredToken) {
    const presented =
      req.headers.get("x-coach-adult-token") || new URL(req.url).searchParams.get("adult");
    if (presented !== requiredToken) {
      return NextResponse.json(
        { error: "This coach uses a cloud model and is adults-only. An adult must unlock it." },
        { status: 403 },
      );
    }
  }

  const chain = resolveLlmChain();
  if (chain.length === 0) {
    return NextResponse.json(
      { error: "No LLM key configured. Set GROQ_API_KEY, GEMINI_API_KEY, or OPENAI_API_KEY." },
      { status: 503 },
    );
  }

  const llm = await pickHealthyProvider(chain);
  if (!llm) {
    return NextResponse.json(
      { error: "All LLM providers failed a health check (rate-limited or down)." },
      { status: 503 },
    );
  }

  const openai = new OpenAI({ apiKey: llm.apiKey, baseURL: llm.baseURL });
  const serviceAdapter = new OpenAIAdapter({ openai, model: llm.model });
  const runtimeInstance = new CopilotRuntime();
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime: runtimeInstance,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });
  return handleRequest(req);
};
