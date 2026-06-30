# Conversational Builder Loop Coach — Spec (`apps/web-agent`)

**Prepared:** Monday, June 29, 2026
**Status:** 🟡 **Spec in design — PR2.5: live loop verified working (agent does real work); not deployed.** (Say "spec in design," never "live.")
**Decision:** Build a **second door** into the Builder Loop — a voice-first **conversational
agent** (CopilotKit) that *guides* a family through the 5-cycle SOP by talking, extracting their
inputs through dialogue, and tolerating off-script questions — instead of forcing a wizard.

**Do not:**
- Send any child name, photo, free text, or family data off the device **by default** (the brain
  runs on-device; see §4). The hard rules in [`docs/safety/`](../../docs/safety/) bind this app.
- Let the agent become an "unsupervised companion" for a child, present itself as a person, hide
  that it is AI, or replace the child's own thinking (ai-use-boundaries §2/§4/§5).
- Replace or break the existing static PWA (`apps/web/public/app.html`). This ships **alongside** it.
- Add an LLM to any kid-facing demo in `apps/web/public/demos/` — those stay LLM-free.

---

## 1. Why this exists

The current Builder Loop PWA is a good, honest wizard — but it makes the user *follow a
predefined procedure*. The better UX is **agentic**: the user talks (by voice or text), and an
agent that *holds the SOP as a goal* guides them, pulls the structured inputs out of natural
conversation, answers off-script questions, and gets back on track — a much lower-friction way
for a non-technical family (and a 6- and 11-year-old) to run a real build-show-learn cycle.

This is the same Builder Loop SOP (`docs/builder-loop/`), expressed conversationally. Both doors
write the same on-device data model so a family can move between them.

## 2. The two doors (scope)

| | Door 1 — Wizard (exists) | Door 2 — Coach (this spec) |
|---|---|---|
| Path | `apps/web/public/app.html` (static PWA) | `apps/web-agent/` → `/coach` (Next.js) |
| Interaction | Tap through steps | Talk / type to an agent |
| Brain | None (deterministic) | On-device LLM (WebLLM), §4 |
| Status | Live | **Spec in design** |

Door 1 is **unchanged**. Door 2 is a new, separate deploy. Same Builder Loop, same on-device
privacy promise.

## 3. Architecture

```
apps/web-agent/                     Next.js (App Router) + CopilotKit
  app/coach/page.tsx                the conversational coach UI
  lib/sop/builder-loop.ts           the SOP as data: 5 cycles, fields, prompts, exit criteria
  lib/llm/                          model seam (see §4)
    webllm-adapter.ts               DEFAULT — in-browser model, OpenAI-compatible client-side
    proxy-adapter.ts                OPTIONAL fallback — adults-only, consent-gated → /api/spark
  lib/voice/whisper.ts              on-device speech-to-text (transformers.js), §5
  lib/store.ts                      on-device persistence seam (localStorage/IndexedDB), §4
  app/api/copilotkit/route.ts       CopilotKit runtime — used ONLY by the proxy fallback path
```

**The agentic SOP (the core).** `lib/sop/builder-loop.ts` encodes the Builder Loop as a small
**state machine + goal**: the 5 cycles, the fields each cycle must capture (smallest next thing →
build → show one real person → one lesson → repeat), and each cycle's exit criteria. The agent is
told its job is to *reach those exit criteria through conversation*. CopilotKit **actions**
(`useCopilotAction`) let the agent write those structured fields as it extracts them from chat;
`useCopilotReadable` gives it the current cycle/state so it always knows where the family is.
Off-script questions are answered, then the agent steers back to the open field — it guides, it
doesn't railroad.

## 3a. PR2.5 — the live loop works (and what the "reload" actually was)

**The end-to-end loop is verified working** (screenshot): a user message →
the agent fires the `recordCycleField` action → the on-device store updates
(`{"smallestNextThing":"a colorful lemonade stand sign"}`) → the cycle panel ticks to 17% →
the agent guides to the next field ("Great choice! What did you build recently?"). The agent
*does real work* via tool-calls, exactly as designed.

**The "reload on send" was a misdiagnosis.** What looked like a send-triggered reload was two
artifacts: (1) **Next.js dev Fast-Refresh** full-reloads on port 3210 (frequent during active
editing), and (2) my test method — a `$B js "setTimeout(16000)"` in-page sleep that **exceeded the
headless browser harness's ~15s command timeout**, which reset the page. Production (`next start`,
no HMR) left untouched kept its JS context (`window.__ctx` survived). Lesson logged: when driving a
streaming UI through a headless harness, wait with a **shell `sleep`**, never an in-page timer.

**What we changed in PR2.5:**
- **Upgraded `@copilotkit/* → 1.61.2`** (pinned; the failed first install just needed
  `--legacy-peer-deps` + `zod>=3`). Note 1.61's chat **textarea lost the `.copilotKitInput` class**;
  selectors updated to `.copilotKitChat textarea`.
- **Root-caused & fixed a real provider bug:** CopilotKit 1.61 drives the model through
  **`@ai-sdk/openai`, which calls the Responses API (`/responses`)**. **Gemini's OpenAI-compat
  endpoint 404s on `/responses`** (it only supports `/chat/completions`) → `AI_APICallError: Not
  Found`. The route now **pre-flights each provider against `/responses`** and picks the first that
  works (so a Gemini-first env cleanly falls through to OpenAI). This also closes the §9a mid-stream
  failover gap. Verified: with a Gemini-first env, 0 `/responses` 404s reach the chat. Added
  `showDevConsole={false}`, a React **error boundary**, and a no-key on-ramp.

**Open caveat:** re-verifying the *full happy path* through the headless harness is flaky (it
struggles with CopilotKit's now-class-less, dynamically-remounted textarea, and the page
intermittently went blank in automated runs I could not conclusively pin to the app vs. the
harness). **Fresh renders are consistently healthy and one clean run proved the loop.** Recommend a
**real-browser** confirmation (open `/coach`, chat, watch the panel fill) before deploy; if a real
reload is seen there, capture the `GET /coach` initiator via devtools (Network → preserve log).

## 4. Privacy & safety (the hard part)

> **⚠️ Finding from the agentic-portfolio reference build (PR2):** "doing real work" = the agent
> firing CopilotKit **actions** (tool-calls). That needs a model that (a) emits structured
> `tool_calls` and (b) streams plain `content` (reasoning models return 200 → blank UI). The proven
> combo is **cloud** Groq `llama-3.3-70b-versatile` / Gemini `2.5-flash`. **Small on-device WebLLM
> models are unreliable at exactly this** — so there is a real tension: *real work wants cloud
> tool-calling; privacy wants on-device.* Resolution below stands (on-device is the default goal),
> but **PR3 must verify a local model can tool-call well enough**; if not, the on-device mode runs
> with reduced/guided actions and the full-action coach stays the adults-only cloud path. PR2 ships
> the cloud path first (gated) so the SOP+actions are proven before we fight the on-device model.

**The brain runs on-device by default.** "Nothing leaves the device" is a hard rule for child
data here ([privacy-by-design](../../docs/safety/privacy-by-design.md),
[child-safety](../../docs/safety/child-safety.md)). So:

- **Default model = WebLLM in-browser.** CopilotKit is pointed at a **client-side**
  OpenAI-compatible model (e.g. a small instruct model via WebLLM/transformers.js). No
  conversation, name, or photo leaves the device. Family data persists only through the on-device
  `Store` seam, mirroring the existing PWA.
- **Optional fallback = the free-LLM proxy**, for devices too weak to run a local model. It is
  **off by default, adults-only, consent-gated, and redacts names/PII before the request** — and
  it reuses the existing `/api/spark` core. This is the *only* path where text leaves the device,
  and it is an explicit, disclosed adult choice. A clear in-UI banner states which brain is active.
- **Tradeoff (accepted):** the on-device model is a large first-load download (~hundreds of MB to
  ~1 GB) and slower than cloud. We take that cost to keep the privacy promise honest. Cache the
  model; show a one-time download state.

**ai-use-boundaries compliance** (these are requirements, mechanically reviewable):
- The agent **self-identifies as an AI** every session and never role-plays a person (§5 of
  boundaries).
- It is a **builder coach, not a companion** — scoped to the Builder Loop; no open-ended
  child companionship, no private "keep chatting" loop (§2).
- It **preserves the child's own thinking**: every AI-assisted step is paired with the existing
  "find one mistake the AI made / explain it yourself" habit before a cycle can be marked done
  (§4). If a child can't explain it, they don't ship it.
- **No child personal-data collection.** On-device only; nothing is retained server-side (§1).
- The [4-Question Test](../../docs/principles/values.md) is surfaced before anything is "shipped."

## 5. Voice (press-to-talk, on-device)

The user can press a **mic button** and **speak instead of typing** into the conversation box —
the same capability the wizard exposes (🎤), now for the coach.

- **Default = on-device speech-to-text** (Whisper via transformers.js, WASM). Mic → record →
  transcribe locally → fill the composer → the user reviews/sends → goes to the on-device LLM.
  Keeps voice consistent with the "nothing leaves the device" promise.
- **Known gap to fix/align:** the existing PWA's 🎤 uses the Web Speech API
  (`webkitSpeechRecognition`, `apps/web/public/app.html:430`), which in Chrome **streams audio to
  Google's servers** — it is *not* truly on-device. This spec uses on-device Whisper instead; we
  should file a follow-up to revisit the PWA's 🎤 for the same reason. (Web Speech remains a
  possible low-end fallback, but only with the same disclosure as the proxy LLM.)
- Optional later: text-to-speech for the agent's replies (on-device speech synthesis), for a
  fully hands-free, AR-glasses-friendly loop (ties into `docs/builder-loop-app-xr.md`).

## 6. i18n

UI strings ship in all **5 languages** (EN/中文/ES/한국어/日本語), English as source, same as the
rest of the site. A local model's *replies* won't be perfectly multilingual at small sizes — set
the system prompt to answer in `dd.lang` and accept best-effort, since the structured SOP fields
(the part that matters) are language-tagged in the UI.

## 7. Guardrails & checks

- This app lives **outside** `apps/web/public/`, so `check-webapp.sh` (which scans the static PWA)
  does not cover it. Add a small `scripts/check-web-agent.sh` asserting the safety invariants:
  default brain is on-device, the proxy adapter is gated + redacts, the agent self-identifies, and
  no analytics/third-party telemetry is wired in. Wire it into `check.sh` + CI.
- It is a real Next.js build (a deliberate exception to the repo's "no build" norm, scoped to this
  one app — noted in `CLAUDE.md`/`AGENTS.md` when it lands).
- Add an **app card** (`apps/web/public/cards/builder-loop-coach.md` + a `registry.json` line);
  `host` likely `static` or a new value — confirm vocab with `check-cards.sh` when building.

## 8. Build plan (small, reversible PRs)

1. **PR1 — this spec + safety note** (no code). Adds `apps/web-agent/SPEC.md`, a coach section in
   `docs/safety/ai-use-boundaries.md`, CHANGELOG entry. ← *this PR.*
2. ✅ **PR2 — Next.js + CopilotKit skeleton** (this build), modeled on the agentic-portfolio
   reference: real **survival-chain** brain (`lib/llm.ts`) with stream-init failover, the SOP as
   data (`lib/sop/builder-loop.ts`), **real-work actions** (`recordCycleField`/`advanceCycle`),
   on-device `Store`, reusable voice mic, adults-only gate + disclosure banner. Cloud-first on
   purpose (see §4 finding). **Verified: `next build` green; full branded UI verified by screenshot
   (desktop + mobile); no-key on-ramp; health route; error boundary.** Smoke-tested against live
   Gemini/OpenAI → uncovered the **blocking send-reload bug (§3a)**.
2b. ✅ **PR2.5 — live verification + CopilotKit 1.61.2 upgrade + Gemini `/responses` fix (§3a).**
   Loop proven working; "reload" was a dev-HMR/test-harness artifact, not an app bug.
3. **PR3 — on-device WebLLM.** ⏳ **Gated on the probe (§11).** A standalone probe page is built
   (`/probe-webllm`) to answer "can a small local model reliably tool-call?" before building the
   on-device brain. Run it on a GPU browser; then either make on-device the default (GREEN) or keep
   full actions on the adults-only cloud path with on-device as a guided/opt-in mode (YELLOW/RED).
4. **PR4 — on-device voice** (Whisper STT) + mic button.
5. **PR5 — optional adults-only proxy fallback** (consent + redaction) behind the seam.
6. **PR6 — i18n, app card, `check-web-agent.sh`, deploy** (Vercel), README + AGENTS/CLAUDE sync.

## 9. Open questions

- Which small instruct model is good enough at ~CPU/WebGPU budgets for a kid-legible coach?
- Does CopilotKit cleanly target a fully client-side model, or do we keep its runtime route only
  for the proxy path and drive the on-device model through a thinner custom hook? (Resolve in PR2.)
- App-card `host` vocabulary for a self-contained Next.js app — extend or reuse `static`?

## 9a. Mid-stream failover gap — FIXED via pre-flight (PR2.5)

The original failover only caught errors at **stream-init** or `5xx`; a provider that returns 200
then errors mid-stream (a free tier hitting 401/429 after the stream starts, or Gemini's
`/responses` 404) was not caught, so the chat died. **Fixed:** `/api/copilotkit` now runs a cheap
**pre-flight** (`openai.responses.create`, 16 tokens) per provider and pins the first healthy one
(cached 5 min). Adds ~1 round-trip on a cold cache; buys real survival-chain robustness. The
`agentic-portfolio` reference still has the original gap.

## 11. PR3 probe — on-device tool-calling (built; must be run on a GPU browser)

The gating question for PR3 (§4): **can a small in-browser model reliably emit `tool_calls`?** If
not, on-device can't run the full-action coach. Built `/probe-webllm` (`app/probe-webllm/page.tsx`,
WebLLM `0.2.84`, code-split): it loads a model **entirely on-device** and measures how often it
calls the coach's real `recordCycleField` tool with the right field + valid args across 5 trials,
then prints a 🟢/🟡/🔴 verdict.

**Cannot be run in our automation:** the headless test browser has **no WebGPU** (verified), which
WebLLM requires. So this is a "verify at the user's altitude" probe — run it on a real
Chrome/Edge desktop:
```bash
cd apps/web-agent && npm run dev      # open http://localhost:3000/probe-webllm
# pick a model (default Qwen2.5-3B), click "Run probe", read the verdict.
```

**Prior (to be confirmed by the probe), why this matters for the family use case:**
- **Hermes-2-Pro / Hermes-3 (8B)** are FC-tuned → most likely to pass, but **~4.5 GB** download.
- **Qwen2.5-3B / Llama-3.2-3B** are **~2 GB** but 3B function-calling is hit-or-miss.
- Real UX costs for *non-technical families on phones*: a multi-GB first download, **WebGPU is
  desktop-Chrome-strong but spotty on mobile**, and slower inference. So even a GREEN probe may not
  make on-device the right *default* for the target users.

**Decision framework (set after running the probe):**
- 🟢 **GREEN (≥80%)** → on-device can be the default privacy brain on capable devices; cloud stays
  the fallback for weak devices (the existing seam).
- 🟡/🔴 **(<80%)** → keep the **full-action coach on the adults-only cloud path** (today's working
  state) and offer on-device as an **opt-in "max privacy" / guided mode** (agent guides via plain
  text; the app captures fields with lighter heuristics rather than trusting local tool-calls).

## 10. Investigated / rejected

- **CopilotKit runtime → cloud free-LLM proxy as the default** (the stack option's first preview).
  *Rejected:* it sends conversation off-device, violating the on-device child-data rule. Demoted to
  an optional adults-only fallback (§4).
- **Web Speech API as the coach's primary voice.** *Rejected as default:* streams audio to a cloud
  vendor (the same gap that exists in the current PWA). On-device Whisper instead (§5).
- **Replace the wizard.** *Rejected:* the deterministic wizard is a fine, zero-download path and a
  safety floor; we ship the coach as a parallel door and can A/B the UX.
