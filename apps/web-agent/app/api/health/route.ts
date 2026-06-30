// Lightweight health probe so the UI can show an inspiring on-ramp instead of a dead
// error when no LLM key is configured yet. Reports ONLY booleans — never a key value.
import { NextResponse } from "next/server";
import { resolveLlmChain } from "@/lib/llm";

export const runtime = "nodejs";

export async function GET() {
  const chain = resolveLlmChain();
  return NextResponse.json({
    hasBrain: chain.length > 0,
    providers: chain.map((c) => c.provider), // names only, no secrets
    adultGate: Boolean(process.env.COACH_ADULT_TOKEN),
  });
}
