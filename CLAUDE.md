# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**[`AGENTS.md`](AGENTS.md) is the authoritative guide** — read it first for *what this repo is*,
the governance/safety rules, and how to work here. This file is its synced twin and adds the
concrete **commands + architecture** an agent needs to be productive. When the two could drift,
keep them in step (a behavior change updates both).

## The mental model: there is no build

This repo is **not a compiled app**. It is mostly **static HTML/CSS/JS** (`apps/web/public/`),
**markdown docs** (`docs/`, `ventures/`), one tiny **Node serverless function**
(`apps/web/api/`), a **Python starter agent** (`agents/hello-agent/`), and a set of **bash
guardrail scripts** (`scripts/`). There is **no root `package.json`, no lockfile, no bundler, no
`npm install`**. You edit files and open them directly. The "test suite" is the guardrail scripts.

**One scoped exception:** `apps/web-agent/` (the Builder Loop Coach, 🟡 spec-in-design / PR2
skeleton) is a real **Next.js + CopilotKit** app with its own `package.json` and build step. It is
self-contained — the no-build rule still holds for everything else, especially `apps/web/public/`.
See `apps/web-agent/SPEC.md` and `AGENTS.md`.

## Commands

```bash
./scripts/setup.sh                 # one-time: makes scripts runnable, runs every guardrail (safe to re-run)
./scripts/check.sh                 # FAST local pre-PR check (secrets, changelog, status-truth, reg-safety, webapp, i18n)
open apps/web/public/index.html    # view the landing page locally (or app.html / apps.html / demos/*.html)
```

**The real CI gate** (run any of these individually to reproduce a CI failure — they are the
authoritative checks, `check.sh` is only a friendly subset):

```bash
bash scripts/validate-toolkit.sh        # .claude/ skills, workflows, hooks + tools/ plugins parse & are well-formed
bash scripts/check-links.sh             # every relative Markdown link resolves
bash scripts/check-status-truth.sh      # no public surface claims venture #1 is "live/shipping" (it is "build not started")
bash scripts/check-registration-safety.sh  # signup form stays adults-only / honeypot / consent / privacy-safe
bash scripts/check-webapp.sh            # PWA shell + every demo: on-device, no <script src>, no child-name field, JS parses
bash scripts/check-i18n.sh              # all 5 languages in sync with the English source (landing data-i18n + app STR)
bash scripts/check-cards.sh             # app cards ↔ registry.json coherent (required fields, allowed vocab, honest status)
bash scripts/check-spark.sh             # free-LLM proxy safety invariants; runs the one unit test below
node apps/web/api/spark.test.mjs        # the ONLY unit test (mocked, no key/network): no child name/free-text reaches the LLM
python3 agents/hello-agent/agent.py --price 29 --cost 7   # starter-agent smoke (CI runs this exact line)
```

There is no lint/format step beyond `.editorconfig`. To run a single guardrail, just call its
script. CI (`.github/workflows/ci.yml`) runs the block above; `pages.yml` deploys the static site
to GitHub Pages; `i18n-translate.yml` auto-translates via `scripts/i18n-translate.py`.

## Architecture & invariants that aren't obvious from one file

- **Guardrail scripts are the contract.** Most "rules" in this repo are *enforced by a bash script
  in CI*, not just prose. Before changing anything in `apps/web/` or `.claude/`, find the matching
  `scripts/check-*.sh` and make sure your change still passes it. A change that's "correct" but
  fails a guardrail will be rejected.

- **On-device privacy is a hard invariant, not a preference.** `apps/web/public/app.html` (the
  Builder Loop PWA) and every file in `public/demos/` must keep **all user/child data on-device**:
  no `<script src>` to a CDN, no `fetch` of user data, no analytics, no child-name input field.
  Photos live in an IndexedDB `Media` seam and are never uploaded. `check-webapp.sh` enforces this.
  **Kid-facing demos must stay LLM-free.**

- **Swappable seams.** User-facing integrations are isolated behind a single named seam so they can
  be swapped without touching logic: `Store` (localStorage) and `Media` (IndexedDB) in the PWA, the
  `FORM` endpoint in the signup page (mailto fallback), and `SPARK.endpoint` for the proxy. Preserve
  these seams; don't inline a hard-coded URL or storage call.

- **i18n: English is the source.** The landing page uses a `data-i18n` + `I18N` dict + 🌐 selector
  for **5 languages (EN/中文/ES/한국어/日本語)**; the PWA uses a `STR` dict + `t()`. When you
  add/edit any user-facing string you **must** add it to all 5 languages or `check-i18n.sh` fails.
  Outbound doc links from the landing page use **absolute** GitHub URLs (work hosted *and* from a
  local file) — keep that convention.

- **The free-LLM proxy has one shared core.** `apps/web/api/_spark-core.js` holds the logic; the
  Vercel entry (`api/spark.js`) and the Netlify edge function (`netlify/edge-functions/spark.js`)
  both delegate to it — **never fork the logic** (`check-spark.sh` enforces both delegate). It is
  parent-facing and **tag-only**: no child name or free text may reach the LLM. The API key stays
  server-side. It is LIVE at `https://daniel-and-david.vercel.app/api/spark`; deploy via
  `scripts/deploy-spark.sh` (Vercel) or Netlify git-integration, then `scripts/set-spark-endpoint.sh`.

- **App cards.** Every small app ships a portable card: one `.md` per app in `public/cards/<slug>.md`
  (copy `_template.md`, 6 required fields) plus a line in `public/cards/registry.json`; `apps.html`
  renders the gallery from the registry. The card's `host` field (`static`/`space`/`proxy`/`cli`/
  `concept`) is what lets the gallery mix Pages-hosted, HuggingFace-Space, and proxy apps.

- **Status truth is mechanically checked.** Venture #1 (`ventures/kc-matchday-basecamp/`) is
  **"pilot in design / build not started"** — never "live" or "shipping". `check-status-truth.sh`
  fails the build if a public surface overclaims it. The `ventures/.../SPEC.md` compliance "do-not"
  list (no protected branding, no food/alcohol/tickets, never store cards, never commit secrets) is
  authoritative — see `AGENTS.md` for the full list.

## Docs ship with code (enforced)

A behavior/API/flag change must, in the **same** change, update `CHANGELOG.md` (`## [Unreleased]`)
+ the relevant human doc (`README.md` / `docs/**` / `ventures/**`) + this agent guide if
agent-facing behavior changed. `check.sh` warns when code changed without a changelog entry; a
global pre-push hook blocks pushes missing changelog + human doc + agent guide. Formatting/test-only
changes are exempt. See `AGENTS.md` → "How to work here" for the full rule and the safety rules in
`docs/safety/` that bind agents too.
