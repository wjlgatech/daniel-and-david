# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
this project aims for [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
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
