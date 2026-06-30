"use client";

// ─────────────────────────────────────────────────────────────────────────────
// PR3 PROBE — can a small ON-DEVICE model (WebLLM) reliably do TOOL-CALLING?
//
// This is the gating question for PR3 (SPEC §4): the coach "does real work" only if
// the model emits structured tool_calls. Cloud Groq/OpenAI do; small in-browser models
// are the unknown. This page loads a WebLLM model entirely in the browser (nothing
// leaves the device) and measures how reliably it calls the coach's REAL tool
// (recordCycleField) with the right field + valid args, across several trials.
//
// MUST be run in a real browser with WebGPU (Chrome/Edge). The first run downloads the
// model (~2–4.5 GB) and caches it. Read the verdict at the bottom.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { CYCLE_FIELDS } from "@/lib/sop/builder-loop";

const MODELS = [
  { id: "Hermes-2-Pro-Llama-3-8B-q4f16_1-MLC", note: "Best function-calling · ~4.5 GB" },
  { id: "Hermes-3-Llama-3.1-8B-q4f16_1-MLC", note: "Strong FC · ~4.5 GB" },
  { id: "Qwen2.5-3B-Instruct-q4f16_1-MLC", note: "Smaller · good FC · ~2 GB" },
  { id: "Llama-3.2-3B-Instruct-q4f16_1-MLC", note: "Smallest · FC uncertain · ~2 GB" },
];

// The EXACT tool the coach exposes (mirrors components/Coach.tsx).
const TOOL = {
  type: "function" as const,
  function: {
    name: "recordCycleField",
    description:
      "Record one field of the current Builder Loop cycle, extracted from what the family just said.",
    parameters: {
      type: "object",
      properties: {
        field: { type: "string", enum: [...CYCLE_FIELDS], description: "Which field." },
        value: { type: "string", description: "The value, in the family's own words." },
      },
      required: ["field", "value"],
    },
  },
};

const SYSTEM =
  "You are the Builder Loop Coach. When the family answers a question, you MUST call the " +
  "recordCycleField tool to save it. Pick the single best matching field.";

// Representative trials: each utterance maps to one expected SOP field.
const TRIALS: { say: string; expect: string }[] = [
  { say: "I want to build a colorful sign for my lemonade stand.", expect: "smallestNextThing" },
  { say: "I built a little cardboard sign and colored it in with markers.", expect: "builtWhat" },
  { say: "I showed it to my grandma next door.", expect: "showedWho" },
  { say: "She said the letters were too small to read from the street.", expect: "whatFailed" },
  { say: "So the one lesson is: make the words big and bold.", expect: "oneLesson" },
];

type Trial = {
  say: string;
  expect: string;
  calledTool: boolean;
  field: string | null;
  fieldOk: boolean;
  value: string | null;
  valueOk: boolean;
  raw: string;
};

export default function ProbePage() {
  const [model, setModel] = useState(MODELS[2].id);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [trials, setTrials] = useState<Trial[]>([]);

  async function run() {
    setRunning(true);
    setTrials([]);
    setStatus("Loading model (first run downloads ~2–4.5 GB, then cached)…");
    try {
      const webllm = await import("@mlc-ai/web-llm");
      const engine = await webllm.CreateMLCEngine(model, {
        initProgressCallback: (p: { progress: number; text: string }) => {
          setProgress(Math.round((p.progress || 0) * 100));
          setStatus(p.text);
        },
      });
      setStatus("Running tool-calling trials…");
      const results: Trial[] = [];
      for (const t of TRIALS) {
        let calledTool = false,
          field: string | null = null,
          value: string | null = null,
          raw = "";
        try {
          const reply = await engine.chat.completions.create({
            messages: [
              { role: "system", content: SYSTEM },
              { role: "user", content: t.say },
            ],
            tools: [TOOL],
            tool_choice: "auto",
            temperature: 0,
          });
          const msg = reply.choices?.[0]?.message;
          raw = JSON.stringify(msg?.tool_calls ?? msg?.content ?? "").slice(0, 200);
          const call = msg?.tool_calls?.[0];
          if (call?.function?.name === "recordCycleField") {
            calledTool = true;
            try {
              const args = JSON.parse(call.function.arguments || "{}");
              field = args.field ?? null;
              value = args.value ?? null;
            } catch {
              /* invalid JSON args */
            }
          }
        } catch (e) {
          raw = "ERROR: " + (e instanceof Error ? e.message : String(e));
        }
        results.push({
          say: t.say,
          expect: t.expect,
          calledTool,
          field,
          fieldOk: field === t.expect,
          value,
          valueOk: Boolean(value && value.trim().length > 2),
          raw,
        });
        setTrials([...results]);
      }
      setStatus("Done.");
    } catch (e) {
      setStatus("Failed: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setRunning(false);
    }
  }

  const done = trials.length === TRIALS.length;
  const calls = trials.filter((t) => t.calledTool).length;
  const correct = trials.filter((t) => t.calledTool && t.fieldOk && t.valueOk).length;
  const pct = done ? Math.round((correct / TRIALS.length) * 100) : 0;
  const verdict =
    pct >= 80 ? ["🟢 GREEN", "On-device can do real-work actions — make it the default brain."]
    : pct >= 50 ? ["🟡 YELLOW", "Marginal — works sometimes. Consider a bigger model, or on-device = guided mode + cloud for full actions."]
    : ["🔴 RED", "On-device tool-calling is unreliable. Keep full-action coach on cloud (adults-only); on-device = guided/no-action mode."];

  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "1.5rem 1rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>🔬 PR3 Probe — on-device (WebLLM) tool-calling</h1>
      <p style={{ color: "#666" }}>
        Measures whether a small in-browser model reliably calls the coach&apos;s <code>recordCycleField</code>{" "}
        tool with the right field + valid args. Needs a <strong>real browser with WebGPU</strong>. First run
        downloads the model (cached after).
      </p>

      <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "1rem 0" }}>
        <select value={model} onChange={(e) => setModel(e.target.value)} disabled={running} style={{ padding: 6 }}>
          {MODELS.map((m) => (
            <option key={m.id} value={m.id}>{m.id} — {m.note}</option>
          ))}
        </select>
        <button onClick={run} disabled={running} style={{ padding: "6px 16px", fontWeight: 700, cursor: "pointer" }}>
          {running ? "Running…" : "Run probe"}
        </button>
      </div>

      {status && (
        <p style={{ fontSize: 13, color: "#444" }}>
          {progress > 0 && progress < 100 ? `[${progress}%] ` : ""}{status}
        </p>
      )}

      {trials.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 12 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
              <th>Said</th><th>Expected</th><th>Tool?</th><th>Field</th><th>Value ok?</th>
            </tr>
          </thead>
          <tbody>
            {trials.map((t, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ maxWidth: 240 }}>{t.say}</td>
                <td>{t.expect}</td>
                <td>{t.calledTool ? "✅" : "❌"}</td>
                <td style={{ color: t.fieldOk ? "#15803d" : "#b91c1c" }}>{t.field ?? "—"}</td>
                <td>{t.valueOk ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {done && (
        <div style={{ marginTop: 16, padding: 16, border: "1px solid #ddd", borderRadius: 10 }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{verdict[0]} — {correct}/{TRIALS.length} fully correct ({pct}%)</div>
          <p style={{ margin: ".4rem 0 0", color: "#444" }}>{verdict[1]}</p>
          <p style={{ fontSize: 12, color: "#888" }}>Tool called: {calls}/{TRIALS.length} · correct field+value: {correct}/{TRIALS.length}</p>
        </div>
      )}
    </main>
  );
}
