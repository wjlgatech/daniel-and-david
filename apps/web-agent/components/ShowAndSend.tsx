"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ShowAndSend — the async "Build & Show → Feedback" surface for the coach.
// The child records/dictates a 60-second show; the agent (or a tap) structures it
// into the Show template (lib/show.ts); they send it to their MENTOR (a parent) via
// their own mail client — parent↔child, on-device, nothing stored on a server.
// Self-contained: registers its own CopilotKit action so Coach.tsx stays small.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { useCopilotAction } from "@copilotkit/react-core";
import { VoiceInput } from "@/lib/voice";
import { composeShow, loadMentor, mailtoShow, saveMentor } from "@/lib/show";
import { type LoopState } from "@/lib/sop/builder-loop";

export function ShowAndSend({ loop }: { loop: LoopState }) {
  const [mentor, setMentor] = useState("");
  const [stuck, setStuck] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => setMentor(loadMentor()), []);

  const { subject, body } = composeShow(loop, stuck);

  // The agent can assemble + offer to send the Show when the family asks to update
  // their mentor. It fills "whereStuck" from the conversation; the human presses send.
  useCopilotAction({
    name: "prepareShowForMentor",
    description:
      "Assemble the family's 60-second 'Show' for their mentor (a parent) from the current " +
      "Builder Loop cycle. Call this when they want to show/update their mentor (e.g. 'show my dad'). " +
      "Optionally pass what they're stuck on. The human reviews and presses Send — you never send it.",
    parameters: [
      { name: "whereStuck", type: "string", description: "What they're stuck on / need help with.", required: false },
    ],
    handler: async ({ whereStuck }: { whereStuck?: string }) => {
      if (whereStuck) setStuck(whereStuck);
      return "Show assembled in the 'Show your mentor' panel. Review it, then press Send (it opens your own mail app — nothing is sent automatically).";
    },
  });

  function send() {
    const m = mentor.trim();
    if (!m) return;
    saveMentor(m);
    window.location.href = mailtoShow(m, subject, body);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — ignore */
    }
  }

  return (
    <section className="card" style={{ padding: "1rem", marginTop: "1rem" }}>
      <h2 style={{ fontSize: 16, margin: "0 0 0.25rem" }}>📲 Show your mentor</h2>
      <p style={{ color: "var(--muted)", fontSize: 12.5, margin: "0 0 0.7rem" }}>
        A 60-second update for your mentor (a parent). It opens <strong>your own email</strong> —
        you press Send. Parent↔child only; nothing is stored online. 🔒
      </p>

      <label style={{ fontSize: 12, color: "var(--muted)" }}>
        One thing I'm stuck on / need help with (type or tap 🎤):
      </label>
      <textarea
        id="coach-stuck"
        value={stuck}
        onChange={(e) => setStuck(e.target.value)}
        rows={2}
        placeholder="e.g. my sign's words are too small to read from far away"
        style={{ width: "100%", marginTop: 4, padding: "0.5rem 0.6rem 0.5rem 2.4rem", borderRadius: 10, border: "1px solid var(--line)", font: "inherit", resize: "vertical" }}
      />
      <VoiceInput targetSelector="#coach-stuck" />

      <pre
        style={{
          whiteSpace: "pre-wrap",
          background: "#faf7f2",
          border: "1px solid var(--line)",
          borderRadius: 10,
          padding: "0.7rem 0.8rem",
          fontSize: 12.5,
          color: "var(--ink)",
          margin: "0.7rem 0",
          fontFamily: "inherit",
        }}
      >
        {body}
      </pre>

      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <input
          type="email"
          value={mentor}
          onChange={(e) => setMentor(e.target.value)}
          placeholder="mentor's email (an adult sets this once)"
          style={{ flex: "1 1 14rem", padding: "0.55rem 0.7rem", borderRadius: 999, border: "1px solid var(--line)", font: "inherit" }}
        />
        <button className="btn" onClick={send} disabled={!mentor.trim()} title="Opens your email app">
          Send to mentor →
        </button>
        <button className="btn ghost" onClick={copy}>{copied ? "Copied ✓" : "Copy"}</button>
      </div>
    </section>
  );
}
