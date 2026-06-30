// ─────────────────────────────────────────────────────────────────────────────
// lib/show.ts — the async "Build & Show → Feedback" surface (see
// docs/curriculum/daniel-age-11/build-kit.md). Turns a Builder Loop cycle into the
// **Show template** and helps the child send it to their MENTOR (a parent).
//
// SAFETY (child-safety rules 5 & 8): this is parent↔child only and stays ON-DEVICE.
// The "send" is a **swappable seam** that defaults to the user's own mail client
// (mailto:) or clipboard — the child/guardian sends it themselves. NOTHING is stored
// on a server and no AI tool retains the child's data. The mentor address is set once,
// by an adult, and lives only in this browser. (Mirrors the signup form's mailto seam.)
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { type LoopState } from "@/lib/sop/builder-loop";

const MENTOR_KEY = "dd.coach.mentor.v1";

export function loadMentor(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(MENTOR_KEY) || "";
  } catch {
    return "";
  }
}

export function saveMentor(email: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MENTOR_KEY, email.trim());
  } catch {
    /* storage disabled — non-critical */
  }
}

// Compose the Show template from a cycle (defaults to the current cycle) + an optional
// "where I'm stuck" line the child adds. Returns a subject + plain-text body.
export function composeShow(loop: LoopState, whereStuck = ""): { subject: string; body: string } {
  const i = loop.current;
  const c = loop.cycles[i] ?? {};
  const built = (c.builtWhat || c.smallestNextThing || "").trim();
  const showed = (c.showedWho || "").trim();
  const failed = (c.whatFailed || "").trim();
  const lesson = (c.oneLesson || "").trim();
  const aiMiss = (c.verifyHabit || "").trim();

  const failLesson = [failed, lesson ? `Lesson: ${lesson}` : ""].filter(Boolean).join(" — ");

  const body = [
    `Builder Loop — my 60-second Show (cycle ${i + 1})`,
    ``,
    `What I built: ${built || "—"}`,
    `Who I showed it to + what happened: ${showed || "—"}`,
    `What failed / the one lesson: ${failLesson || "—"}`,
    `One AI mistake I caught: ${aiMiss || "—"}`,
    `Where I'm stuck / what I need from you: ${whereStuck.trim() || "—"}`,
    ``,
    `(Sent from my Builder Loop Coach. Reply with: what's strong · one thing to try next · one`,
    `question to make me think · green light?)`,
  ].join("\n");

  return { subject: `Builder Loop — my Show (cycle ${i + 1})`, body };
}

// Open the user's own mail client to the mentor address with the Show pre-filled.
// The child/guardian presses Send — the data never touches our servers.
export function mailtoShow(mentor: string, subject: string, body: string): string {
  return `mailto:${encodeURIComponent(mentor)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
