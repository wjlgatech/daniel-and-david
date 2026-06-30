"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Coach.tsx — the Builder Loop Coach. The agent DOES REAL WORK: CopilotKit actions
// write the SOP fields as it extracts them from conversation; useCopilotReadable
// keeps it aware of live state. State persists ON-DEVICE (lib/store.ts). The UI is
// built to make a family FEEL momentum — a journey, celebration, and an inspiring
// on-ramp instead of a dead error when no LLM key is set yet.
// ─────────────────────────────────────────────────────────────────────────────

import { Component, type ReactNode, useEffect, useRef, useState } from "react";
import { CopilotKit, useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { VoiceInput } from "@/lib/voice";
import {
  CYCLE_FIELDS,
  TOTAL_CYCLES,
  coachInstructions,
  emptyLoop,
  isCycleComplete,
  type CycleField,
  type LoopState,
} from "@/lib/sop/builder-loop";
import { loadLoop, saveLoop } from "@/lib/store";

const FIELD_LABEL: Record<CycleField, string> = {
  smallestNextThing: "Smallest next thing",
  builtWhat: "What you built",
  showedWho: "Who you showed",
  whatFailed: "What you learned",
  oneLesson: "The one lesson",
  verifyHabit: "You checked the AI",
};

function CoachInner() {
  const [loop, setLoop] = useState<LoopState>(emptyLoop());
  const [celebrate, setCelebrate] = useState<number | null>(null);
  const doneCount = useRef(0);

  useEffect(() => setLoop(loadLoop()), []);
  useEffect(() => saveLoop(loop), [loop]);

  // FIX: the inline CopilotChat composer sits in a <form> whose submit isn't
  // prevented, so pressing Enter / clicking send triggers a full PAGE RELOAD that
  // wipes the conversation mid-flight (the agent's action never lands). CopilotKit
  // sends via its own click handler, so swallowing the native form submit inside the
  // chat is safe and stops the reload. (Found via live smoke test, PR2.)
  useEffect(() => {
    const onSubmit = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest(".copilotKitChat, .copilotKitInput")) e.preventDefault();
    };
    document.addEventListener("submit", onSubmit, true);
    return () => document.removeEventListener("submit", onSubmit, true);
  }, []);

  // Fire a celebration the moment a new cycle becomes complete.
  useEffect(() => {
    const completed = loop.cycles.filter(isCycleComplete).length;
    if (completed > doneCount.current) setCelebrate(completed);
    doneCount.current = completed;
  }, [loop]);
  useEffect(() => {
    if (celebrate == null) return;
    const t = setTimeout(() => setCelebrate(null), 3200);
    return () => clearTimeout(t);
  }, [celebrate]);

  useCopilotReadable({
    description:
      "The family's live Builder Loop state: current cycle (0-based) and the fields " +
      "captured so far per cycle. Use this to know what is still missing.",
    value: loop,
  });

  useCopilotAction({
    name: "recordCycleField",
    description:
      "Record one field of the CURRENT Builder Loop cycle, extracted from what the " +
      "family just said. Call this whenever they answer one of the cycle's questions.",
    parameters: [
      { name: "field", type: "string", description: `One of: ${CYCLE_FIELDS.join(", ")}.`, required: true },
      { name: "value", type: "string", description: "The value, in the family's own words.", required: true },
    ],
    handler: async ({ field, value }: { field: string; value: string }) => {
      if (!CYCLE_FIELDS.includes(field as CycleField)) {
        return `"${field}" is not a Builder Loop field. Use one of: ${CYCLE_FIELDS.join(", ")}.`;
      }
      setLoop((prev) => ({
        ...prev,
        cycles: prev.cycles.map((c, i) => (i === prev.current ? { ...c, [field]: value } : c)),
      }));
      return `Recorded ${field} for cycle ${loop.current + 1}.`;
    },
  });

  useCopilotAction({
    name: "advanceCycle",
    description:
      "Move to the next Builder Loop cycle. Only call this once the current cycle has " +
      "all fields (including the verify-the-AI habit). Refuses if the cycle is incomplete.",
    parameters: [],
    handler: async () => {
      const cur = loop.cycles[loop.current] ?? {};
      if (!isCycleComplete(cur)) {
        const missing = CYCLE_FIELDS.filter((f) => !(cur[f] ?? "").trim());
        return `Not yet — cycle ${loop.current + 1} still needs: ${missing.join(", ")}.`;
      }
      if (loop.current >= TOTAL_CYCLES - 1) return "That was the last cycle — the Builder Loop is complete! 🎉";
      setLoop((prev) => ({ ...prev, current: Math.min(prev.current + 1, TOTAL_CYCLES - 1) }));
      return `On to cycle ${loop.current + 2} of ${TOTAL_CYCLES}.`;
    },
  });

  const completed = loop.cycles.filter(isCycleComplete).length;

  return (
    <>
      <Journey loop={loop} />
      <div
        className="coach-grid"
        style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 20rem", gap: "1rem", marginTop: "0.6rem" }}
      >
        <div className="card copilotKitChat" style={{ minHeight: "62vh", overflow: "hidden" }}>
          <CopilotChat
            instructions={coachInstructions(loop)}
            labels={{
              title: "Builder Loop Coach",
              initial:
                "Hi! I'm your Builder Loop Coach — an AI helper (not a person 🙂). Together we'll turn " +
                "one small idea into something a real person *loves*. Ready? **What's the smallest next " +
                "thing you'd love to build?** Type it, or tap 🎤 and just say it.",
            }}
          />
        </div>
        <CyclePanel loop={loop} completed={completed} />
      </div>
      <VoiceInput targetSelector=".copilotKitChat textarea, textarea" />
      {celebrate != null && <Celebration cycle={celebrate} />}
    </>
  );
}

function Journey({ loop }: { loop: LoopState }) {
  return (
    <div className="journey" aria-label="Builder Loop progress">
      {Array.from({ length: TOTAL_CYCLES }).map((_, i) => {
        const done = isCycleComplete(loop.cycles[i] ?? {});
        const current = i === loop.current && !done;
        return (
          <div key={i} style={{ display: "contents" }}>
            <div className="node">
              <div className={`dot${done ? " done" : current ? " current" : ""}`}>{done ? "✓" : i + 1}</div>
              <div className="label">Cycle {i + 1}</div>
            </div>
            {i < TOTAL_CYCLES - 1 && <div className={`bar${done ? " done" : ""}`} />}
          </div>
        );
      })}
    </div>
  );
}

function CyclePanel({ loop, completed }: { loop: LoopState; completed: number }) {
  const c = loop.cycles[loop.current] ?? {};
  const pct = Math.round((CYCLE_FIELDS.filter((f) => (c[f] ?? "").trim()).length / CYCLE_FIELDS.length) * 100);
  return (
    <aside className="card" style={{ padding: "1rem", alignSelf: "start" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h2 style={{ fontSize: 15, margin: 0 }}>Cycle {loop.current + 1} of {TOTAL_CYCLES}</h2>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>{pct}%</span>
      </div>
      <p style={{ color: "var(--muted)", fontSize: 12, margin: "0.25rem 0 0.7rem" }}>
        {completed} of {TOTAL_CYCLES} cycles shipped · stays on this device 🔒
      </p>
      <ul className="ticks">
        {CYCLE_FIELDS.map((f) => {
          const filled = Boolean((c[f] ?? "").trim());
          return (
            <li key={f} className={filled ? "filled" : ""}>
              <span className="mark">{filled ? "✓" : ""}</span>
              {FIELD_LABEL[f]}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function Celebration({ cycle }: { cycle: number }) {
  const bits = ["🎉", "✨", "🚀", "🌟", "🎈", "💥", "🏆", "⭐"];
  return (
    <>
      <div className="confetti" aria-hidden>
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 37) % 100}%`,
              animationDuration: `${2 + ((i * 7) % 18) / 10}s`,
              animationDelay: `${((i * 13) % 10) / 10}s`,
            }}
          >
            {bits[i % bits.length]}
          </span>
        ))}
      </div>
      <div className="toast" role="status">
        Cycle {cycle} shipped! 🎉 You built it, showed it, and learned — that's the loop.
      </div>
    </>
  );
}

// Error boundary so a render error in the chat NEVER white-screens the family — it
// degrades to a friendly message (and captures the stack for us at window.__coachErr).
class CoachBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: { componentStack?: string }) {
    if (typeof window !== "undefined") {
      (window as unknown as { __coachErr?: string }).__coachErr =
        `${error?.message}\n${info?.componentStack ?? ""}`;
    }
  }
  render() {
    if (this.state.error) {
      return (
        <div className="card" style={{ padding: "1.4rem", maxWidth: 560, margin: "1rem auto", textAlign: "center" }}>
          <div style={{ fontSize: "1.8rem" }}>🛠️</div>
          <h2 style={{ margin: ".3rem 0" }}>The coach hiccupped</h2>
          <p style={{ color: "var(--muted)" }}>
            Something glitched mid-conversation. Your progress is saved on this device — just
            reload to pick up where you left off.
          </p>
          <button className="btn" onClick={() => location.reload()}>Reload the coach</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Provider + no-brain on-ramp ────────────────────────────────────────────────
export function Coach() {
  const [brain, setBrain] = useState<"loading" | "ready" | "none">("loading");
  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => setBrain(d.hasBrain ? "ready" : "none"))
      .catch(() => setBrain("none"));
  }, []);

  if (brain === "loading") {
    return <p style={{ color: "var(--muted)", textAlign: "center", padding: "2rem" }}>Waking the coach…</p>;
  }
  if (brain === "none") return <NoBrain />;

  return (
    <CopilotKit runtimeUrl="/api/copilotkit" showDevConsole={false}>
      <DisclosureBanner />
      <CoachBoundary>
        <CoachInner />
      </CoachBoundary>
    </CopilotKit>
  );
}

function NoBrain() {
  return (
    <div className="card" style={{ padding: "1.6rem", maxWidth: 620, margin: "1rem auto", textAlign: "center" }}>
      <div style={{ fontSize: "2rem" }}>🧠</div>
      <h2 style={{ margin: "0.4rem 0" }}>Give your coach a brain — it's free, ~60 seconds</h2>
      <p style={{ color: "var(--muted)", lineHeight: 1.55 }}>
        The coach runs on a <strong>free</strong> LLM. Grab a Groq key (no card), drop it in, and
        restart — then watch it turn your conversation into a real Builder Loop.
      </p>
      <ol style={{ textAlign: "left", display: "inline-block", color: "var(--ink)", lineHeight: 1.7 }}>
        <li>Get a free key at <strong>console.groq.com</strong></li>
        <li>In <code>apps/web-agent/</code>: <code>cp .env.example .env.local</code></li>
        <li>Set <code>GROQ_API_KEY=…</code>, then <code>npm run dev</code></li>
      </ol>
      <p style={{ color: "var(--muted)", fontSize: 13 }}>
        Gemini and OpenAI work too — see <code>.env.example</code>. An on-device brain (nothing
        leaves your device) is on the way; see <code>SPEC.md</code>.
      </p>
    </div>
  );
}

function DisclosureBanner() {
  return (
    <div
      style={{
        background: "var(--terra-soft)",
        border: "1px solid #fad9c4",
        color: "#7c2d12",
        borderRadius: 12,
        padding: "0.6rem 0.9rem",
        margin: "0.2rem 0 0.2rem",
        fontSize: 12.5,
        textAlign: "center",
      }}
    >
      You're talking to an <strong>AI</strong>, not a person. This early build uses a{" "}
      <strong>cloud</strong> model + cloud speech, so it's <strong>adults-only</strong> for now —
      please don't type a child's real name. An on-device version is coming (<code>SPEC.md</code>).
    </div>
  );
}
