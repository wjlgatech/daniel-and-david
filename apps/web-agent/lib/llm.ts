// ─────────────────────────────────────────────────────────────────────────────
// lib/llm.ts — the free-LLM survival chain (per the /free-llm skill), adapted from
// the agentic-portfolio reference build. Every provider is OpenAI-compatible, so one
// code path serves all. The key lives ONLY here (server-side); never shipped to the
// browser.
//
// TWO hard constraints decide the model + order — both learned the hard way wiring a
// CopilotKit chat UI, and both are why this coach can "do real work":
//
//  1. TOOL-CALLING. The coach drives the Builder Loop via CopilotKit *actions*
//     (OpenAI tools). A model that can't emit structured `tool_calls` makes
//     /api/copilotkit 400 and the chat goes silent.
//  2. CLEAN CONTENT STREAMING. CopilotKit's OpenAIAdapter renders `delta.content`.
//     *Reasoning* models stream `delta.reasoning_content` with empty content — the
//     call returns 200 but the UI shows NOTHING.
//
// Verified to satisfy BOTH: Groq `llama-3.3-70b-versatile` and Gemini `2.5-flash`.
// NIM's tool-capable frontier models are mostly reasoning-class (constraint 2), so it
// sits BELOW Groq/Gemini here even though the generic /free-llm default is NIM-first —
// for a CopilotKit chat UI, clean streaming wins. Override via *_MODEL env vars.
//
// PRIVACY NOTE: this is the CLOUD brain. Per SPEC §4 it is the adults-only path until
// an on-device WebLLM brain lands; child free-text/PII must be redacted before it is
// used. Keeping the chain here (not in the route) keeps that boundary in one place.
// ─────────────────────────────────────────────────────────────────────────────

export type LlmProvider = {
  provider: "groq" | "gemini" | "nvidia-nim" | "openai";
  baseURL?: string;
  apiKey: string;
  model: string;
};

// The FULL survival chain — every configured provider, in order.
export function resolveLlmChain(): LlmProvider[] {
  const chain: LlmProvider[] = [];
  // 1) Groq — fastest, clean content streaming, solid tool-calling. Best for chat.
  if (process.env.GROQ_API_KEY) {
    chain.push({
      provider: "groq",
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: process.env.GROQ_API_KEY,
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    });
  }
  // 2) Google Gemini — biggest free daily quota; clean content + tools.
  if (process.env.GEMINI_API_KEY) {
    chain.push({
      provider: "gemini",
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
      apiKey: process.env.GEMINI_API_KEY,
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    });
  }
  // 3) NVIDIA NIM — frontier variety; override NIM_MODEL with a non-reasoning tool model.
  if (process.env.NVIDIA_API_KEY && process.env.NIM_MODEL) {
    chain.push({
      provider: "nvidia-nim",
      baseURL: "https://integrate.api.nvidia.com/v1",
      apiKey: process.env.NVIDIA_API_KEY,
      model: process.env.NIM_MODEL,
    });
  }
  // 4) OpenAI — paid fallback (gpt-4o-mini supports tools + clean streaming).
  if (process.env.OPENAI_API_KEY) {
    chain.push({
      provider: "openai",
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    });
  }
  return chain;
}
