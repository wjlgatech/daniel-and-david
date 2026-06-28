# Builder Loop app — AR / AI-glasses readiness

The [Builder Loop app](https://wjlgatech.github.io/daniel-and-david/app.html) is built so it can
move onto **AI glasses and AR headsets** later without a rewrite. This doc records the design
seams and what's real today vs. future.

> **Honest status:** voice input and the seams ship **now**; a full immersive AR view is **future
> work**. The app says "AR-ready," meaning the plumbing is in place — not that a 3D scene exists yet.

## What's real today
- **🎤 Voice dictation** (Web Speech `SpeechRecognition`) on the cycle steps — the natural input
  for glasses where there's no keyboard. Speak your answer; it fills the field.
- **🔊 Read-aloud** (Web Speech `speechSynthesis`) on each step question — hands-free output.
- **✦ AR-ready probe** — on load the app calls `navigator.xr.isSessionSupported("immersive-ar")`;
  if the device supports WebXR AR, an "AR-ready" chip appears. Tapping it explains the roadmap
  (the immersive view is not built yet).
- **Big tap targets, high contrast, large-text mode, per-step color** — already friendly to
  HUD-style, glanceable displays.

## The two seams (so XR plugs in later, not rewrites)
1. **Input seam.** Today text comes from keyboard **or** voice; both write through the same
   `field()` path that persists to the `Store`. A future XR controller / gaze / pinch handler is a
   third input source that calls the same `field()` — no UI rewrite.
2. **Render/presentation seam.** All screens are produced by pure `view*()` functions that return
   markup from state. A future `Presenter` (a WebXR DOM-overlay or a 3D layout) can consume the
   same state and the same step model (`STEPS`) without touching the logic. `enterAR()` is the
   stub entry point where an immersive session would start.

This mirrors the project's [swappable-seam discipline](principles/agentic-engineering.md): the
volatile boundary (how input arrives, how output renders) is isolated so it can be swapped.

## Privacy holds in XR too
The on-device rule is unchanged: **no accounts, no third-party scripts, no network calls for user
data.** Voice recognition uses the browser's built-in engine; photos stay in IndexedDB on the
device (see [privacy-by-design](safety/privacy-by-design.md)). Any future AR rendering must keep
camera frames **on-device** and never upload them — especially since children are involved
([child-safety](safety/child-safety.md)).

## Roadmap (future PRs)
- A WebXR DOM-overlay "glance" mode: the current step shown as a floating card, voice-driven.
- Gaze/pinch "Next/Back" navigation through the 5 steps.
- Optional spatial capture of a build (on-device only) as photo evidence.
