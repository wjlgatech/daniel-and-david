# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
this project aims for [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- **README curriculum: adult tracks added.** Expanded "The curriculum" from "two tracks
  (age-appropriate)" to **"one method, every age"** — kept Daniel (11) & David (6), and added four
  grown-up archetype tracks (the single parent · the disrupted professional · the seasoned mentor ·
  the young hustler) under the adults-only [Restoration Track](docs/vision/isaiah-35-restoration.md) /
  4-week [Restoration Loop](docs/curriculum/adult-restoration/), all running the *same* Builder Loop
  on the four R's. Marked *in design*. Also linked Daniel's [AI Build Kit](docs/curriculum/daniel-age-11/build-kit.md)
  from his bullet.
- **Whole-family rebrand (positioning).** Widened the public promise from "for your child (5–15)" to
  **the whole family — grown-ups and kids growing wiser than AI, together.** Rewrote the README
  sub-hero ("a family field lab where the whole family becomes wise, creative, AI-ready builders —
  together") and hero lede ("You and your kids don't need to fear it — together, you can become wiser
  than it… for the **whole family**, grown-ups and children (~5–15), side by side"), softened
  kid-only lines ("AI is the teammate; **you** stay the mind and the conscience — at every age"; the
  Capability Ladder is "what anyone — child *or* grown-up — can do"). Rebranded the live landing's
  hero `tag` in **all 5 languages** (EN/中文/ES/한국어/日本語) — `check-i18n` green, hero visually
  verified. Unifies with the Isaiah 35 adult Restoration Track: one engine (Builder Loop), every age.
  Honest status unchanged (status-truth passes).
- **Builder Loop Coach — async "Show your mentor" surface (`apps/web-agent/`).** Wires the `/coach`
  app to be Daniel's async show-and-feedback surface (closes the 1,000-mile gap). New
  `components/ShowAndSend.tsx` + `lib/show.ts`: the agent (`prepareShowForMentor` CopilotKit action)
  assembles a **60-second Show** from the current Builder Loop cycle into the
  [build-kit](docs/curriculum/daniel-age-11/build-kit.md) template (talk it in with 🎤), and the child
  sends it to a **parent** via their **own mail client** (`mailto:` seam) or clipboard. **Safety
  (child-safety 5 & 8):** parent↔child only, **on-device**, the send is a swappable seam — nothing is
  stored on a server, no AI tool retains child data, mentor address lives only in the browser. Build
  green; panel visually verified; docs synced (SPEC §12, app README, build-kit, AGENTS). In design.
- **Daniel's AI Build Kit & Remote-Mentor Loop.** Added `docs/curriculum/daniel-age-11/build-kit.md`
  + `docs/assets/daniel-build-kit.svg` to match how the 11-yo builder actually works now:
  semi-autonomous, leading an **AI team** (Codex · Hermes on `/free-llm` · `/goal-10x` · `/anyagent`
  · `/super-u` · `/dreammaketrue`), with a **mentor who may be remote**. Documents the solo Builder
  Loop with the kit, an async **Build & Show → Feedback** ritual (with copy-paste Show/Feedback
  templates, kept parent↔child per safety rule 5), and **selling in the real world** with a
  **non-negotiable present-adult rule** for anything public + the compliance basics (drinks/food need
  permits, no protected branding, never store cards, serve-don't-exploit, give-as-you-grow). Public
  selling is framed **plan-now / sell-together**: while the mentor is remote the child *plans* the
  sell solo (product, price, sign, pitch) and the real public sale waits until a trusted adult is
  physically present — so the doc never implies an unsupervised minor selling in public. Aligned
  the track README's co-located assumptions ("explain to Dad" → "to your mentor in person or async";
  "with Dad's help" → "with a present, trusted adult"). Safety-first by design: child stays the mind,
  verify-the-AI, no location/schedule published (child-safety #4), present adult for real-world steps
  (#9 + supervision note). Docs only; in design.
- **Adult Restoration Loop — the runnable 4-week curriculum (in design).** Built
  `docs/curriculum/adult-restoration/` (README + printable `worksheet.md`) + a `restoration-loop-4week.svg`
  infographic: the grown-up parallel to the kids' Builder Loop. Four weeks, one R per week —
  **Restoration** (heals hopeless) → **Redemption** (meaningless) → **Regeneration** (helpless) →
  **Resurrection, with Christ** (peaceless) — each pairing inner work (renew the mind, Isaiah 35
  anchors, orphan→beloved) with one outer **Builder Loop cycle** (ship one real thing, show one real
  person, keep the verify-the-AI habit). Measured on the same capability checkpoints
  (Before/During/After/Transfer) and North Star (evidence of a rebuilt trajectory, month over month);
  the "12x" = the loop repeated. Includes a compassionate **crisis/help note** (988 ·
  findahelpline.com) since it addresses depression. Wired into the curriculum index, the Isaiah 35
  vision doc ("run it" CTA), `README.md`, and `AGENTS.md`. Adults-only; kids stay the core; safety
  rules unchanged. Infographic visually verified. Status: in design, not shipped.
- **Isaiah 35 Restoration Track — adult audience expansion (in design).** Added
  `docs/vision/isaiah-35-restoration.md` + `docs/assets/isaiah-35-restoration.svg`: a parallel,
  **adults-only** track for grown-ups rebuilding their trajectory (AI-disrupted, "old in skin, young
  at heart," orphan mindset, the four faces of depression). Anchored in **Isaiah 35** with four
  operating principles — **Restoration · Redemption · Regeneration · Resurrection (with Christ)** —
  each answering one of depression's lies and run through the *same* Builder Loop + Capability Ladder
  + AI-as-teammate engine (a "12x" of one's life trajectory). Faith-rooted/Christ-centered yet
  **welcoming to all beliefs** (consistent with `values.md`); **kids stay the core** and all
  `docs/safety/` child-safety rules are unchanged. Wired into `README.md` (honest "in design"
  callout) and `AGENTS.md`. Infographic visually verified. Status: in design, not shipped.
- **Builder Loop Coach — infographic + docs.** Added `docs/assets/builder-loop-coach.svg` (brand-matched
  SVG: you say it → coach guides the 5-cycle SOP → does the work on-device → you stay the mind) and
  embedded it in `apps/web-agent/README.md` (hero) and the main `README.md` under an honest, **"in
  design, not shipped"** callout in the hub section. Visually verified (Quick Look render).
- **Builder Loop Coach — PR3 probe + dogfood finding (`apps/web-agent/`).** Added `/probe-webllm`
  (`app/probe-webllm/page.tsx`, WebLLM `0.2.84`, code-split) — a standalone, **on-device** harness
  that measures whether a small in-browser model reliably calls the coach's real `recordCycleField`
  tool (right field + valid args, 5 trials → 🟢/🟡/🔴 verdict). This gates PR3 (SPEC §11): build the
  on-device brain only if a local model can tool-call. Must be run on a **real GPU browser** — the
  automated test browser has **no WebGPU** (verified). **Dogfood finding:** the earlier "reload on
  send" was conclusively a **test-harness artifact** — the headless browse daemon resets the page
  context ~every 12s (a trivial non-app page loses its marker identically); the coach itself has no
  reload bug and the live loop is verified working. Recommend a real-browser dogfood before deploy.
- **Builder Loop Coach — PR2.5: live loop works + UX pass (`apps/web-agent/`).** The agent now
  **does real work end-to-end** (verified by screenshot): a user message → the agent fires the
  `recordCycleField` CopilotKit action → the on-device store updates → the cycle panel ticks to 17%
  → it guides to the next field. Gave the coach a warm branded UI (gradient hero, a pulsing 5-cycle
  **journey**, live cycle panel, cycle-complete **celebration**), an inspiring **no-key on-ramp**
  (new `/api/health` route), `showDevConsole={false}`, and a React **error boundary**. **Upgraded
  CopilotKit `1.5.20 → 1.61.2`** (pinned; 1.61 dropped the `.copilotKitInput` textarea class, so
  selectors moved to `.copilotKitChat textarea`). **Root-caused & fixed a real provider bug:** 1.61
  drives the model via `@ai-sdk/openai` (the **Responses API `/responses`**), and **Gemini's
  OpenAI-compat endpoint 404s on `/responses`** — so `/api/copilotkit` now **pre-flights** each
  provider against `/responses` and pins the first healthy one (cached 5 min), which also closes the
  mid-stream failover gap (SPEC §9a). The earlier "reload on send" was a **misdiagnosis** — Next dev
  Fast-Refresh + a test-harness command-timeout artifact, not an app bug (prod left untouched keeps
  its context). `next build` green. Not deployed; re-verifying the full path through the headless
  harness is flaky (recommend a real-browser confirmation). Kid-facing demos remain LLM-free.
- **Builder Loop Coach — PR2 skeleton (`apps/web-agent/`).** Scaffolded the conversational coach
  as a Next.js + CopilotKit app, modeled on the `wjlgatech/agentic-portfolio` reference build: a
  free-LLM **survival chain** (`lib/llm.ts`, Groq→Gemini→NIM→OpenAI) behind `/api/copilotkit` with
  **stream-init failover**; the Builder Loop SOP **as data** (`lib/sop/builder-loop.ts`);
  **real-work CopilotKit actions** (`recordCycleField` / `advanceCycle`) so the agent fills the SOP
  from conversation instead of a wizard; on-device `Store` (localStorage); a reusable **voice mic**
  (`lib/voice/`); and an adults-only gate (`COACH_ADULT_TOKEN`) + disclosure banner. CopilotKit
  pinned to `1.5.20`. **Key finding recorded** (SPEC §4): real-work tool-calling needs a model that
  emits structured `tool_calls` AND streams plain `content` (reasoning models render blank) — proven
  with cloud Groq/Gemini, which is in tension with the on-device-WebLLM goal; PR3 must verify a local
  model can tool-call. Cloud-first, gated, **not deployed**. Voice currently uses the Web Speech API
  (cloud STT) — flagged in-code; PR4 swaps in on-device Whisper.
- **Conversational Builder Loop Coach — spec in design (`apps/web-agent/SPEC.md`).** Designed a
  voice-first second "door" into the Builder Loop: a CopilotKit agent that *guides* a family
  through the 5-cycle SOP by conversation (extracting structured inputs from natural dialogue,
  tolerating off-script questions) instead of a wizard. Brain runs **on-device (WebLLM) by
  default** so no child data leaves the device; the cloud free-LLM proxy is demoted to an optional
  adults-only, consent-gated, PII-redacted fallback. Voice = **on-device Whisper** STT (and
  flagged that the existing PWA's 🎤 Web Speech API streams audio to the cloud — a follow-up).
  Ships **alongside** the existing static PWA, which is unchanged. Added a conversational-agent
  section to `docs/safety/ai-use-boundaries.md` codifying the rules (on-device default, coach-not-
  companion, always-visibly-AI, never replaces the child's thinking). Build not started.
- **The ✨ AI is live.** Conversation Spark's optional "fresh ideas" button is now wired to the
  deployed proxy (`SPARK.endpoint = https://daniel-and-david.vercel.app/api/spark`) with
  `NIM_API_KEY` set in Vercel — the live endpoint returns real, age/interest-aligned opener questions.
  Still parent-facing and tags-only (verified by `check-spark.sh`); the offline question bank remains
  the default if the network/endpoint is unavailable. Absolute URL so it works from both the Vercel
  and GitHub Pages hosts.
- **Live on Vercel.** The agentic webapp is deployed and public at
  **<https://daniel-and-david.vercel.app/>** (static hub + the `/api/spark` edge function, which is
  live and returns `NIM_API_KEY not set` until a key is added). Removed the misleading
  `apps/web/vercel.json` (`outputDirectory: public` isn't honored without a build) — zero-config
  works once the project's **Root Directory = `apps/web`** (required; the CLI uploads the whole git
  repo, so a repo-root build 404s). DEPLOY.md + `docs/solutions` updated with the root-directory and
  SSO-deployment-protection gotchas.
- **Free-LLM proxy: Netlify host added (the rbit-ai multi-host pattern).** Factored the proxy into a
  host-agnostic core (`apps/web/api/_spark-core.js`) so Vercel (`api/spark.js`) and **Netlify**
  (`netlify/edge-functions/spark.js`) share one safety logic — no logic forks (now enforced by a
  structural guard in `check-spark.sh`). Added `apps/web/netlify.toml` (publish `public/`, route
  `/api/spark` to the edge function, NODE_VERSION 22) and `apps/web/.env.example`, mirroring how
  rbit-ai deploys (Netlify git-integration auto-deploy + dashboard env var). `set-spark-endpoint.sh`
  now also accepts a same-origin path (`/api/spark`) for all-on-Netlify/Vercel hosting. DEPLOY.md
  gains a first-class Netlify section. Still off until a maintainer connects a host + sets a free NIM
  key; kids' apps stay on-device with no AI.
- **Free-LLM proxy: verified + turnkey deploy.** Made the parent-facing Conversation Spark LLM
  enhancement (`apps/web/api/spark.js`, NVIDIA NIM) deployable in one command and proved it safe.
  New **mocked test suite** (`apps/web/api/spark.test.mjs`, 13 cases) + CI guard
  (`scripts/check-spark.sh`) lock the safety invariant: a child's name or free text can **never**
  reach the LLM (tags-only), the key stays server-side (Bearer), and missing-key/wrong-method/
  upstream-failure degrade gracefully (500/405/502, no crash). New helpers:
  `scripts/deploy-spark.sh` (deploy `apps/web/` to Vercel + set the key, after a one-time
  `vercel login`) and `scripts/set-spark-endpoint.sh <url>` (wire the live URL into every SPARK-seam
  demo, or `""` to disable). `apps/web/api/package.json` marks the function ESM. DEPLOY.md gains a
  one-command path. The button stays off until a maintainer supplies a free NIM key + deploys —
  honest by design; kids' apps remain fully on-device with no AI.

### Changed
- **Landing page 10× — bold modern structure + a live demo showcase.** Redesigned the front door
  along the lovable.com / base44.com / printingpress.dev references while keeping the warm
  "clay-on-paper" palette + serif (per the design research in `docs/research/agentic-app-cards.md`).
  Hero is now bolder — an "AI-native family field lab" badge, oversized type, and a two-button CTA
  (Apply + "See the apps"). New full-width **"See it work" showcase** band runs the **three real demos
  live, inline, in phone frames** (Conversation Spark · Transition Timer · Homework Chunker) — the
  printingpress "show the artifact" idea — each tappable and openable full-screen. Added an honest
  **"AI, the safe way"** note surfacing the free-LLM seam: where AI helps (Conversation Spark's fresh
  ideas) it runs through a free open-model proxy (NVIDIA NIM), **parent-facing only**, tags-only, and
  **off until a maintainer deploys a key**; kids' apps stay fully on-device with no AI. 10 new i18n
  keys (`hero.badge`, `hero.see`, `showcase.*`) translated across all 5 languages; `check-i18n` green
  (69 keys). `overflow-x:hidden` guard added.

### Added
- **Homework Chunker — third demo app** (`apps/web/public/demos/homework-chunker.html`). Targets the
  #1 daily pain of an eleven-year-old (*homework overwhelm/avoidance*, high anxiety). **Kid-facing and
  kid-owned** (deliberately not parent-set): the kid dumps in everything due, tags each Quick/Medium/
  Big/Huge (→ 15-minute blocks), then Focus mode runs **one block at a time** (a 15:00 timer with
  "done early" + "+5 min" and a progress bar that fills as blocks clear) — **they choose the order**.
  Calm, un-babyish tone (no confetti); ends with a quiet "Plan cleared. 💪". Designed around early-
  adolescent psychology: **autonomy** + **competence** (SDT). **On-device, no LLM** (kid-facing →
  LLM-free per the safety line), no name/account/data. Ships an Agentic App Card
  (`cards/homework-chunker.md` + registry entry) → auto-appears in the gallery; linked from the README;
  written up in `docs/pain-analysis.md` (all three top demos now built). Guards green.
- **Transition Timer — second demo app** (`apps/web/public/demos/transition-timer.html`). Targets the
  #1 daily pain of a six-year-old (*transition refusal*, ~20-min meltdowns). A grown-up taps a preset
  routine (Morning / Wind-down / Screen-time) or builds one from picture-steps + minutes; the child
  then sees a big picture, a **shrinking countdown ring**, a **1-minute warning**, and an
  always-visible **"Next:"** preview, and chooses when to advance (predictability + agency are what
  prevent meltdowns). Celebrates finishing, never punishes. **On-device, no LLM, no network, no child
  data** — a pure behavioral scaffold per the safety line. Ships with an Agentic App Card
  (`cards/transition-timer.md` + registry entry) so it auto-appears in the gallery; linked from the
  README on-ramp; analysed in `docs/pain-analysis.md`. Guards: `check-webapp.sh` (demo scan) +
  `check-cards.sh` green.
- **Agentic App Card + apps gallery.** A tiny, portable standard for describing the small apps we
  build — like a HuggingFace **model card** but **~10× simpler** (6 required fields + a one-line
  pitch + "How to run", vs. HF's 7+ metadata fields and 14 prose sections). Spec +
  copy-to-start template in [`docs/agentic-app-card.md`](docs/agentic-app-card.md) /
  `apps/web/public/cards/_template.md`; first cards for the Builder Loop app, Conversation Spark, and
  the KC Matchday venture (`apps/web/public/cards/*.md` + `registry.json`). New **apps gallery**
  (`apps/web/public/apps.html`) — warm clay-on-paper palette + modern card patterns (color-coded type
  badges, host/LLM chips, `pain_solved` as the only prose, filter tabs, hover-lift, an "add your app"
  empty-state) — reads the registry and is linked from the landing page in all 5 languages
  (`free.gallery`). **Host strategy = mix, by design:** the card's `host` field (`static` / `space` /
  `proxy` / `cli` / `concept`) lets the static registry we own list apps that run on GitHub Pages, a
  HuggingFace Space, or our serverless proxy — so we don't have to choose between *using* HF and
  *being* a host. New closed-loop guard `scripts/check-cards.sh` (in CI) enforces required fields,
  allowed vocab, honest status, and card↔registry sync (no drift). Research saved to
  [`docs/research/agentic-app-cards.md`](docs/research/agentic-app-cards.md).
- **Research library — compound, don't restart** (`docs/research/`). This session's deep research
  passes are now **saved as distilled, cited syntheses** so future work builds on them instead of
  re-researching from zero: deep-problem-understanding, family-pains (6yo/11yo/parents),
  founding-cohort-selection, kids-family-app-ux, oss-landing-pages — plus an index with the rule
  *"search here before dispatching a research agent; add a doc after."* Wired into `/goal-10x`
  step 0 and AGENTS. (A synthesis can later be `kgfy`'d into a graph or `skillfy`'d into a skill.)
- **Pain2Gain applied + the first demo app.** `docs/pain-analysis.md` runs Pain2Gain on real,
  evidence-based pains of a 6-year-old, an 11-year-old, and their parents (top 3–5 each, with
  burden + dimension + depth rung + app concept), plus the explicit child-safety "what we will NOT
  build" rules (COPPA 2026 / SB-243). Shipped the first playable demo — **Conversation Spark**
  (`apps/web/public/demos/conversation-spark.html`): a *parent* tool that gives 3 warm opener
  questions for their 6/11-year-old, **on-device, no signup, no child data**, with a curated offline
  bank. The optional ✨ "fresh ideas" button is an **LLM seam** to a parent-facing free-LLM proxy
  (`apps/web/api/spark.js` + `vercel.json` + `DEPLOY.md`) — off until a maintainer adds an
  `NIM_API_KEY` and deploys (Vercel/Netlify/fly); sends only age + interest tags, never child data.
  `check-webapp.sh` now also guards demos (on-device note + no child-name field). Linked from the
  hub, the landing page (all 5 languages), and Pain2Gain.
- **Pain2Gain — a deep-pain investigation methodology** (`docs/principles/pain2gain.md` +
  `docs/principles/pain-dossier.md` worksheet + `docs/assets/pain-depth-ladder.svg`). The rigorous
  front end to the Builder Loop's *Understand* phase and companion to 5W1H: a **depth ladder**
  (anecdote → survey → correlation → causal → mechanism → first-principle, with a per-rung self-test
  and "don't build before rung 4"), the **six dimensions** of a pain (physical · psychological ·
  behavioral · relational · organizational · spiritual — Engel/Sulmasy biopsychosocial-spiritual),
  **5W1H → Three-Legged 5-Why + fishbone** for root cause, **burden** (prevalence × severity ×
  duration) + spatial-temporal + one vivid thick-description story, **need-grounding** (JTBD · SDT ·
  Max-Neef · Kano), and **Meadows leverage** for transformative (not cosmetic) solutions. Kid +
  venture versions; evidence-based (cited); balances depth against the loop's fast-iteration ethos.
  Wired into the Builder Loop Aim phase, critical-thinking, README principles, and AGENTS. Replaces
  the prior surface-level ("single-pass 5W1H") problem understanding.
- **Builder Loop app — fully translated.** Finished the app's secondary screens (aim, dashboard,
  parent tools, evidence checklist, the decide step, retro, history, Best-Flops) in
  中文/Español/한국어/日本語 — the whole app is now multilingual (125 keys × 4 languages, all gated by
  `check-i18n.sh`). Reuses the landing page's `dd.lang`.
- **Auto-translate Action — config set.** Repo variables `I18N_LLM_BASE_URL` (NVIDIA NIM free
  endpoint) and `I18N_LLM_MODEL` are set; the workflow is active. It stays inert until the
  `I18N_LLM_KEY` secret is added (the one step that needs a human-owned API key).

### Changed
- **Restyled the whole site to the Anthropic "clay on paper" aesthetic** (matching the repo's own
  infographics): warm paper backgrounds (`#FAF9F5`/`#F0EEE6`), warm ink (`#29261F`), **clay accent**
  (`#CC785C`) for buttons/links/pills, warm gold kickers, subtle warm borders, **serif display
  headings** (Tiempos feel), and warm-dark (not navy/blue) hero + founding sections. Applied across
  `index.html`, `app.html`, and `privacy.html`. Replaces the old blue/green theme. (Dark sections
  kept dark-but-warm so the translated white text keeps working.)

### Added
- **Builder Loop app UI — multilingual core.** The app (`apps/web/public/app.html`) now translates
  its **welcome screen + the cycle wizard + chrome** (privacy ribbon, Kid/Parent, the 5 steps'
  names/questions/hints/placeholders, Next/Back/Finish/Voice/Add-a-photo, the photo notice, the
  celebrate modal) into 中文/Español/한국어/日本語 via a `t()` dictionary + a 🌐 selector — **reusing the
  landing page's `dd.lang` choice** so language carries over. English is the source/fallback.
  `check-i18n.sh` now also verifies the app's `STR` dictionary (39 keys × 4 langs) stays in sync.
  (Secondary screens — dashboard, retro, history, Best-Flops, parent tools, aim — remain English
  for a follow-up.)
- **"Translation may lag" banner + opt-in auto-retranslation.** The landing page now shows an honest
  amber banner *only for non-English* — "English is the authoritative version, and translations may
  lag behind it" (translated into all 4 languages). And the optional fully-automatic path is wired:
  `scripts/i18n-translate.py` (fills only *missing* keys from English via an OpenAI-compatible LLM,
  never overwriting human edits or English) + `.github/workflows/i18n-translate.yml` (runs on
  English changes, opens a review PR). **Off until you add the `I18N_LLM_KEY` secret** — inert and
  harmless without it. Policy: **English is ground truth; machine drafts are always reviewed.**
- **Multilingual landing page (5 languages, live in-page 🌐 selector).** `apps/web/public/index.html`
  now speaks **English · 中文 · Español · 한국어 · 日本語**: a `data-i18n` system + an `I18N` dictionary
  swap all the essential copy (hero, idea, the founding "Halving" section, and the *entire*
  application form incl. the adults-only/consent/mutual-fit notices) live, persisted in
  localStorage, auto-detecting the browser language. English stays the in-HTML default (so the
  registration-safety grep still passes). Fully usable by a non-technical, non-English family.
- **i18n sync guard** (`scripts/check-i18n.sh` + CI + `check.sh` + `setup.sh`): fails the build if
  any translated key is missing in any language — so an English change can't ship without all five
  language tags in step. The dependable, zero-cost "auto-update across all languages." Optional
  fully-automatic re-translation path documented in `docs/i18n/README.md`. README gained a 🌐
  language row.

### Changed
- **Founding-family age range → roughly 5–15** (was 6–12): landing-page application buckets
  (Under 5 / 5–7 / 8–11 / 12–15 / Mixed / 16+) and `docs/founding-families.md`, README.

### Added
- **1-click setup + shipped Claude Code commands.** `scripts/setup.sh` now actually sets up
  (makes scripts runnable, detects Claude Code, runs all five guardrails) instead of just printing
  links. New project commands `.claude/commands/goal-10x.md` (a repo-tuned objective driver wired
  to this repo's checks) and `.claude/commands/check.md` (run every guardrail) — so `/goal-10x`
  and `/check` work the moment you clone. README gained a "1-click setup" section (clone →
  `setup.sh`, plus the marketplace install of the `critical-thinking` plugin).
- **Founding-family privileges + research-backed selection** in `docs/founding-families.md`:
  private early access to the studio's AI workshop (**AnyAgent, Super U, DreamMakeTrue** — named
  with benefit-level descriptions, internals private, granted on acceptance); and a **selection
  rubric grounded in research** (Hoover-Dempsey role construction · SDT autonomous motivation ·
  conscientiousness · giver-orientation · builder-comfort · honest capacity · mutual fit), a
  transparent two-stage (Entrofy) process, and an explicit **do-not-select-on** list (no
  wealth/credentials/grades/religion/ZIP/child PII — COPPA- and anti-discrimination-safe). The
  landing-page application added the two highest-signal questions.
- **Launch package** (`docs/marketing/launch.md`) — the dated "it's live" announcement set:
  a primary LinkedIn post (free installable app), a Founding-Families "Halving" post (honest
  Genesis-cohort scarcity), an X short post, a one-liner, and a pre-post checklist. Every claim
  is true as of launch (live site + installable app + open Genesis cohort; venture #1 still
  "pilot in design"). Linked from `linkedin-posts.md`; added `founding-halving` to the launch-image
  manifest. Drafts only — publishing is a human action.
- **Builder Loop app v2·2 — photo evidence + AR/glasses readiness.** On-device **photo/drawing
  evidence** for the build/show steps via a new IndexedDB `Media` seam (thumbnails on the dashboard;
  photos **never leave the device** — excluded from export/share). **AR / AI-glasses prep:**
  **🎤 voice dictation** (Web Speech recognition) on the cycle steps, a documented **input + render
  seam**, and a **WebXR capability probe** that shows an "✦ AR-ready" chip where supported (the
  immersive view itself is future work — see `docs/builder-loop-app-xr.md`). `check-webapp.sh` now
  also asserts no external scripts, IndexedDB-only photos, and the "never uploaded" promise.
- **Builder Loop app v2·1** (`apps/web/public/app.html`): **multiple children & loops** (a child/
  loop switcher + a "📚 All loops" history with open/delete), a **"🏆 Best Flops"** gallery that
  aggregates every lesson across loops, **delight polish** (Web-Audio chime + richer confetti +
  per-cycle 🏅 badge stamps + rotating growth-mindset cheers, all behind a sound toggle — no
  streaks-guilt, no notifications), and **share & portability** (Web Share text summary that
  carries no child data, JSON export/import to move a loop between devices). All still on-device.
- **Builder Loop web app (installable PWA)** — `apps/web/public/app.html`, so non-technical
  families can *run* the loop without ever touching GitHub. A dual-mode (kid-playful /
  parent-calm) single-file app that guides the **5 fast cycles** (pick → build → show a real
  person → learn the flop → decide), tracks progress (ring + dots), keeps an evidence checklist,
  **celebrates every flop**, and exports/prints. Research-backed UX: one-thing-per-screen,
  per-step accent colors, read-aloud (Web Speech), large-text mode, Finch-style "celebrate, never
  punish." **Installable + offline** via `manifest.webmanifest` + `sw.js` + `icons/`.
  **Privacy by design:** all data is on-device (localStorage behind a swappable `Store` seam),
  **no accounts, no external scripts, no network calls for user data** — COPPA-clean. Linked from
  the landing page ("Open the Builder Loop app"), README, and the Builder Loop guide.
- **`scripts/check-webapp.sh`** + CI + `check.sh`: PWA smoke check — verifies the app/manifest/
  service-worker/icons exist, the manifest is installable (name/start_url/display/512-icon), the JS
  parses, and the app links the manifest + registers the SW + states the on-device promise.
- **Founding Families — "The Halving"** (`docs/founding-families.md`, `FOUNDERS.md`): an authentic,
  honor-based exclusivity model for the pilot cohort. Like Bitcoin issuance, the founder's reward
  **halves** each epoch while the cohort **doubles** (Genesis 8 → 16 → 32 → 64 → open at #121).
  Honest scarcity — fixed public schedule, real caps, real selection — and a living scarcity
  lesson for the boys. Replaces the vague "ten pilot families" line in the Theory of Change.
- **Email registration on the landing page** (`apps/web/public/index.html`): a founding-cohort
  **application** form (name, email, region, child **age-range only**, one question) wired through a
  single swappable `FORM` endpoint (the email-capture **seam**) with a **mailto: fallback** so no
  application is lost before a provider is chosen. Includes a honeypot, a required 18+ consent
  checkbox, an adults-only notice, and an honest "spots remaining" counter from one config value.
  New hosted **privacy notice** (`apps/web/public/privacy.html`). **Recommended provider: Formspree**
  (posts into the custom safety-checked form, GDPR DPA, free tier covers the 120-family cap) — go
  live by pasting one endpoint; Tally documented as an alternative in `docs/founding-families.md`.
- **`scripts/check-registration-safety.sh`** + a CI step + a `check.sh` check — fails the build if
  the signup form loses its honeypot, consent, adults-only notice, or privacy link, or if it ever
  collects a child's identity. Closed-loop guard on the child-safety promise; self-disables if no
  form exists.
- **Founding Halving infographic** (`docs/assets/founding-halving.svg`), embedded in the founding
  doc — rendered & visually verified.

### Changed
- Landing-page hero now leads with **"Apply to the founding cohort"** + an honest Genesis scarcity
  badge; the Builder Loop is reframed as the **free** path for everyone (and updated to the
  iterative "5 fast cycles" wording). README, Theory of Change, and privacy-by-design updated to
  reference the Founding Halving.
- **Builder Loop redesigned from one-shot to iterative — 5 fast cycles, not one big reveal.**
  `docs/builder-loop/README.md` now teaches **fast · frequent · failing-forward**: a repeating
  ~4–5 day micro-cycle (PICK → BUILD → SHOW to a real person → LEARN the failure → DECIDE), run
  **≥5 times in 4 weeks** (a short "aim" up front, then ship v0.1→v1.0). A loop now "counts" at
  ≥5 iterations, each shown to a real person, each with a logged failure-lesson. Why: the prior
  design front-loaded 3 weeks of planning and served once at the end — the opposite of what it
  preaches. Downstream mentions (README, story, LinkedIn, curriculum tracks, ventures) updated to
  match; `printable.md` rewritten to a 5-iteration tracker; `builder-loop-4week.svg` redesigned
  to show the repeating cycle + cadence.

### Added
- **Builder Loop infrastructure** that keeps cycles fast and logged: `docs/builder-loop/iteration-log.md`
  (one block per cycle) and `scripts/builder-loop-log.sh` (appends a dated iteration block to a
  per-child `builder-loop-log-<child>.md`, shows `--status` progress toward the 5-cycle target).
  The per-child log is git-ignored (may contain a child's notes — see `docs/safety/privacy-by-design.md`).
- **Hosted landing page (GitHub Pages).** New `.github/workflows/pages.yml` publishes
  `apps/web/public` to `https://wjlgatech.github.io/daniel-and-david/` on every push to `main`,
  so a non-technical parent gets a clickable URL — no `git clone`. (One-time: Settings → Pages →
  Source: GitHub Actions.) Landing-page doc links rewritten to absolute GitHub URLs so they work
  from both the hosted page and a local file.
- **Printable Builder Loop** (`docs/builder-loop/printable.md`) — a one-page, tick-box family
  sheet a parent can print and run.
- **Four new infographics** (Anthropic style) for the new developments:
  `capability-ladder.svg`, `builder-loop-4week.svg`, `theory-of-change.svg`, `safety-layer.svg`
  — embedded in the README, milestones, builder-loop, theory-of-change, and safety docs.

### Changed
- **Onboarding split into two clear paths.** README now has **"For families (no code)"** (just a
  web link → Builder Loop → safety → child's track) and **"For developers & contributors"**
  (clone, run `./scripts/check.sh`, open a PR). Closes the gap where the only on-ramp was
  `git clone` + opening a file path.
- **Marketing realigned to the new positioning.** `docs/marketing/the-daniel-and-david-story.md`
  now leads with capability/builders (not the billion-dollar headline), shows the Capability
  Ladder as the hero (money ladder moved into a "venture track" section), introduces the 4-week
  Builder Loop, and sequences the hub *after* the loop with a safety note. `linkedin-posts.md`
  reframed to match (capability-first hooks, Builder Loop, new launch images).
- **Discoverability:** curriculum tracks (Daniel/David), `docs/community/hub.md`, and
  `ventures/README.md` now link the Builder Loop + safety layer and stop overclaiming venture
  status ("Live ventures" → "Current ventures"; venture #1 marked "pilot in design").
- **Repositioned the public wedge to "a family field lab for raising wise, creative, AI-ready
  builders."** The README hero and the landing page (`apps/web/`) now lead with a **Capability
  Ladder** (Notice→Ask→Make→Serve→Learn→Team→Bless) instead of the $1M→$10B money ladder. Why:
  competing ambitions on the homepage obscured one clear promise; the money ladder is preserved
  but demoted to an advanced "venture track" in `docs/vision/milestones.md`.
- **Truth fix — venture #1 status.** The landing page no longer says venture #1 is "live now /
  SHIPPING"; it now reads "pilot in design · spec ready · build not started," matching
  `ventures/kc-matchday-basecamp/`. Same correction in `README.md`. Why: the prior wording
  failed our own first question ("Is it true?"). Agent guides now forbid "live"/"shipping" for
  unbuilt work.
- **Reframed the near-term goal away from "100 contributions a day"** in `README.md` and the
  landing page toward a behavior-change proof goal (ten families finishing one Builder Loop) and
  safety-gated, tightly-scoped contributions. Why: a volume target creates moderation/safety
  risk while children are involved and measures the wrong thing.
- **Curriculum now measures capability, not participation** — added Before/During/After/Transfer
  checkpoints and a weak-vs-strong outcomes table in `docs/curriculum/README.md`.

### Added
- **The Builder Loop** (`docs/builder-loop/`) — the four-week family loop (Notice → Understand →
  Build → Serve) that is now the project's atomic unit, with a fixed six-part weekly structure
  (child activity / parent guide / AI exercise / independent-thinking task / real-world action /
  reflection) and a measurable per-loop scorecard.
- **Theory of Change + North Star metric** (`docs/vision/theory-of-change.md`) — the causal model
  (inputs → behaviors → near-term → long-term outcomes) and the metric we track: *Independent
  Builder Evidence per child per month* (capability, not stars/dollars).
- **Child-safety governance layer** (`docs/safety/`) — `child-safety.md`, `privacy-by-design.md`,
  `parent-consent.md`, `community-moderation.md`, `ai-use-boundaries.md`, plus an index. These
  bind humans *and* AI agents, and must exist before any account/profile/upload/matching feature.
- **Capability Ladder** added to `docs/vision/milestones.md` as the public, measured ladder
  above the (now clearly-labeled) venture/money track.
- **Status-truth eval** (`scripts/check-status-truth.sh` + a CI step in `toolkit-validate` +
  a check in `scripts/check.sh`) — fails the build if a public surface (`README.md`,
  `apps/web/`) claims venture #1 is "live"/"shipping" while `ventures/.../README.md` still says
  "build not started." Turns our first question ("Is it true?") into a machine-checkable eval so
  status drift can't regress. Self-disables once the venture build actually starts.
- Initial repository scaffold: an AI-native venture studio + learning academy for raising
  the next generation of wealth creators (Daniel, 11, and David, 6).
- Mission and milestone ladder ($1M → $10M → $100M → $1B → $10B) in `docs/vision/`.
- Operating principles: AI-native company, agentic engineering, and values in `docs/principles/`.
- Two age-appropriate curriculum tracks in `docs/curriculum/`.
- **Venture #1 — KC Matchday Basecamp**: full 16-day launch spec, unit economics, compliance
  gates, partner/marketing systems, and a buildable web-app PRD in `ventures/kc-matchday-basecamp/`.
- Academy landing page (`apps/web/`) — a dependency-free page a child can open in a browser.
- `hello-agent/` — a tiny, readable starter agent as a first "AI teammate."
- Open-source contributor on-ramp: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`,
  issue/PR templates, CODEOWNERS, and a CI workflow, designed for ~100 contributions/day.
- Four kid-friendly, Anthropic-styled SVG infographics in `docs/assets/` embedded in the
  README — the milestone "Climb," the builder's loop, the AI-teammate agent loop, and the
  4-question values test — so a 6- and 11-year-old can grasp each section visually.
- Per-doc infographics (same style) embedded in the source docs: `mission-value-chain.svg`
  (SEE → BUILD → SERVE → EARN → BLESS) in `docs/vision/mission.md`; `ladder.svg` +
  `milestones-games.svg` (each rung's skill and the question it answers) in
  `docs/vision/milestones.md`; `values-non-negotiables.svg` (the 7 non-negotiables) +
  the 4-question test in `docs/principles/values.md`.

- **Critical-thinking (5W1H) capability — for humans *and* agents.** Recreated the classic
  5W1H critical-thinking poster in the repo's Anthropic style (`docs/assets/critical-thinking.svg`,
  all 48 questions) and built a matching toolkit around it:
  - *Human curriculum* in `docs/curriculum/critical-thinking/` — David (6) "Six Detective Words"
    and Daniel (11) applied 5W1H (decisions, media/AI literacy, venture #1).
  - *Agent toolkit* in `.claude/`: a `critical-thinking` **skill**, a `critical-thinking-review`
    **dynamic workflow** (six agents fan out, one per question-word, then synthesize a verdict),
    and a high-stakes-edit **hook** (`hooks/critical-thinking-nudge.sh`).
  - *Installable plugin* in `tools/critical-thinking-plugin/` (command + skill + hook), listed
    in a new repo `.claude-plugin/marketplace.json`.
  - `.claude/README.md` documents the five ways to extend an AI teammate (skill / command / hook
    / workflow / plugin) as a teaching artifact.
- **CI now validates the agent toolkit.** New `scripts/validate-toolkit.sh` (run locally too) and
  a `toolkit-validate` CI job check that every plugin/marketplace/hooks JSON parses, every
  `.claude/workflows/*.js` passes `node --check`, every `SKILL.md`/command has valid frontmatter,
  hook scripts pass `bash -n`, and plugin `hooks.json` references resolve — so a malformed
  toolkit artifact can't merge.
- **CI now checks Markdown links.** New `scripts/check-links.sh` walks every tracked `.md`,
  resolves all relative links and image embeds, and fails on any dead target (skips external
  URLs and `#` anchors) — so a renamed file or moved infographic can't silently break the docs.

- **Storytelling + hub repositioning.** Added a long-form, kid-simple-but-expert-deep article
  (`docs/marketing/the-daniel-and-david-story.md`) with one infographic per section and every main
  claim cited to a seminal study *or* scripture; ready-to-post LinkedIn posts
  (`docs/marketing/linkedin-posts.md`); a Hub guide (`docs/community/hub.md`) framing the project as
  three hubs (living learning · agent tools · AI+people collaboration-matching) with a lightweight
  on-GitHub matching flow; an **💡 Idea / 🤝 Collaboration** issue template; and a README "What
  this is becoming: a hub" section.

### Investigated / Rejected
- **Single-app repo (just the KC web app).** Rejected: the goal is a *durable studio* that
  hosts many ventures over years, plus a teaching layer — a monorepo serves both.
- **Operating venture #1 as stadium-adjacent street vending.** Rejected in the spec itself:
  legally risky (clean-zone / brand-protection / permit exposure). The chosen model is
  venue-partnered, brand-safe local commerce with explicit go/no-go gates.
