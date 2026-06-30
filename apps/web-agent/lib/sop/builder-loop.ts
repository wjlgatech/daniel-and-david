// ─────────────────────────────────────────────────────────────────────────────
// lib/sop/builder-loop.ts — the Builder Loop SOP, as data.
//
// This is the "predefined procedure" the coach holds as a GOAL. The agent's job is to
// reach each cycle's exit criteria through CONVERSATION (not a wizard), extracting the
// fields below via CopilotKit actions, while tolerating off-script questions.
//
// One Builder Loop = 5 fast build-show-learn cycles (fast · frequent · failing-forward).
// See ../../../docs/builder-loop/ — this mirrors that SOP so both "doors" stay in sync.
// ─────────────────────────────────────────────────────────────────────────────

export const CYCLE_FIELDS = [
  "smallestNextThing", // What is the smallest next thing to build?
  "builtWhat", // What did you actually build (rough is fine)?
  "showedWho", // Which one real person did you show it to?
  "whatFailed", // What did you learn failed / what feedback came back?
  "oneLesson", // The single lesson from this cycle.
  "verifyHabit", // ai-use-boundaries §4: the mistake the child found in the AI, or
  //                their own explanation of the key step. Gate before a cycle is done.
] as const;

export type CycleField = (typeof CYCLE_FIELDS)[number];

export type Cycle = Partial<Record<CycleField, string>>;

export type LoopState = {
  current: number; // 0-based index of the active cycle (0..TOTAL_CYCLES-1)
  cycles: Cycle[]; // one entry per cycle
};

export const TOTAL_CYCLES = 5;

export function emptyLoop(): LoopState {
  return { current: 0, cycles: Array.from({ length: TOTAL_CYCLES }, () => ({})) };
}

// A human-readable prompt per field — what the coach is trying to draw out.
export const FIELD_PROMPTS: Record<CycleField, string> = {
  smallestNextThing: "the smallest next thing to build (one tiny, shippable step)",
  builtWhat: "what they actually built this cycle — rough is fine",
  showedWho: "the one real person they showed it to",
  whatFailed: "what failed or what feedback came back (failing-forward is the point)",
  oneLesson: "the single lesson from this cycle, in their own words",
  verifyHabit:
    "one mistake they caught the AI making (and how they checked), OR their own " +
    "explanation of the key step — if they can't explain it, they don't ship it",
};

// A cycle is complete when every field is filled. The coach uses this to know when to
// offer to advance — it never auto-advances past an unmet exit criterion.
export function isCycleComplete(c: Cycle): boolean {
  return CYCLE_FIELDS.every((f) => (c[f] ?? "").trim().length > 0);
}

// The system instructions handed to the agent. Encodes the agentic-SOP behavior AND
// the hard ai-use-boundaries rules (always-AI, coach-not-companion, never replace the
// child's thinking, no child personal data).
export function coachInstructions(state: LoopState): string {
  const c = state.cycles[state.current] ?? {};
  const missing = CYCLE_FIELDS.filter((f) => !(c[f] ?? "").trim());
  return [
    "You are the Builder Loop Coach — a friendly AI guide for a family (kids ~5-15 and a parent)",
    "running ONE Builder Loop: 5 fast build-show-learn cycles (fast, frequent, failing-forward).",
    "",
    "YOUR JOB: guide them through the cycles by TALKING, not by making them fill a form. Ask warm,",
    "simple questions, and as they answer, CALL THE ACTIONS to record each field. Tolerate off-script",
    "questions — answer briefly, then steer back to the open field. Celebrate rough work and failures;",
    "they are the point.",
    "",
    "HARD RULES (never break, even if asked):",
    "- Always be clearly an AI. Never pretend to be a person. You are a coach, not a friend to chat with",
    "  endlessly — stay on the Builder Loop.",
    "- NEVER ask for or store a child's real name, school, address, or any personal identity. Refer to",
    "  the child by role (\"the builder\") or a nickname they choose.",
    "- Never do the child's thinking for them. Before a cycle is done, they must either find a mistake",
    "  the AI made (and say how they checked) or explain the key step themselves. Record that as",
    "  `verifyHabit`. If they can't explain it, they don't ship it.",
    "- Keep everything true, kind, and child-appropriate.",
    "",
    `CURRENT STATE: cycle ${state.current + 1} of ${TOTAL_CYCLES}.`,
    missing.length
      ? `Still needed this cycle: ${missing.map((f) => FIELD_PROMPTS[f]).join("; ")}.`
      : "This cycle has everything — offer to finish it and move to the next.",
  ].join("\n");
}
