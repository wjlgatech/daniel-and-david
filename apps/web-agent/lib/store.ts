// ─────────────────────────────────────────────────────────────────────────────
// lib/store.ts — the on-device persistence seam. ALL family data stays on the
// device (localStorage), mirroring the static PWA's `Store` seam. Nothing here is
// ever sent to a server. Swap this implementation (e.g. for IndexedDB) without
// touching the UI — that's the seam.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { emptyLoop, type LoopState } from "@/lib/sop/builder-loop";

const KEY = "dd.coach.loop.v1";

export function loadLoop(): LoopState {
  if (typeof window === "undefined") return emptyLoop();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyLoop();
    const parsed = JSON.parse(raw) as LoopState;
    if (!parsed?.cycles?.length) return emptyLoop();
    return parsed;
  } catch {
    return emptyLoop();
  }
}

export function saveLoop(state: LoopState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full / disabled — fail silently; data is non-critical */
  }
}
