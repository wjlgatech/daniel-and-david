# Solutions — our compounding engineering memory 🛠️

Where we record **our own** hard-won learnings — bugs hit, patterns set, conventions adopted — so
we don't relearn them. The companion to [`docs/research/`](../research/) (which holds the *world's*
external evidence); this folder holds *our* experience.

> **The rule:** after solving something non-obvious (a tricky bug, a design call, a convention),
> add a short doc here — *problem · root cause · fix · the reusable lesson*. (`/ce-compound` writes
> here; a `goal-10x` run folds the headline into `memory/` too.)

## Learnings so far
- **White-on-white in nested dark sections** — a light card inside a dark section inherits the dark
  section's `color`; set an explicit text color. Caught only by a full-page screenshot, not by
  structural checks → *always screenshot-verify web UI at desktop width*.
- **i18n'd dark sections** — when restyling, change *hue* but keep light/dark *value* stable, or
  every translation's inline white text breaks at once.
- **The closed-loop guard pattern** — every promise this repo makes is enforced by a `scripts/check-*.sh`
  (status-truth · registration-safety · webapp · i18n · cards) in CI: turn an invariant into a check, not a
  hope.
- **`fetch()` of a local file needs a server to verify** — the apps gallery (`apps.html`) reads
  `cards/registry.json` via `fetch`, which is **blocked over `file://`** — opening the page directly
  shows an empty grid even when it's correct. To screenshot-verify, serve it first
  (`python3 -m http.server` then point headless Chrome at `http://localhost`). Don't conclude "broken"
  from a `file://` open.
- **Vercel + a subdirectory site → set the project Root Directory** — our site lives in `apps/web/`,
  not the repo root. The Vercel CLI, run *inside a git repo*, uploads the **whole repo** (not the
  cwd), so deploying from `apps/web` still built the repo root → empty output → 404 on every path
  (including `/api/*`). Fix: set the project's **Root Directory = `apps/web`** (a project *setting*,
  not expressible in `vercel.json`); then zero-config serves `public/` + `api/` correctly — no
  `vercel.json` needed. Also: new Vercel projects default to **Deployment Protection (SSO)** which
  302-redirects the public to a login — disable `ssoProtection` to make a public site reachable.
- **Dual-source kept honest by a check** — the Agentic App Card lives in two places on purpose: the
  portable `cards/<slug>.md` (the standard) and `cards/registry.json` (the gallery's fast index).
  Two sources risk drift, so `check-cards.sh` makes them agree (every card ↔ every entry, fields
  match) — the same move as keeping i18n tags in sync. A second source is fine *if* a guard binds them.

*(Add one entry per non-obvious solve. Keep it short and reusable.)*
