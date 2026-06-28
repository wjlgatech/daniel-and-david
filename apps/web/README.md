# apps/web — Landing Page + Builder Loop App

Two dependency-free pages, no build step, no framework:

- **`public/index.html`** — the academy home page (capability ladder, Founding Halving, application).
- **`public/app.html`** — the **Builder Loop app**: an installable, offline **PWA** that walks a
  family through the 5-cycle loop, tracks progress, and **stores everything on-device**
  (localStorage; no account, no network calls for user data). Backed by
  `manifest.webmanifest`, `sw.js` (cache-first app shell), and `icons/`.

> **Why a PWA?** Non-technical parents can't navigate a GitHub repo — but they can tap a link,
> **"Add to Home Screen,"** and run the loop like a native app. The persistence layer is behind a
> small `Store` seam so it can later sync to a backend without rewriting the UI.
>
> **Privacy:** the app makes **no external requests for user data** and has **no third-party
> scripts** — a family's loop notes (and **photos**, stored in IndexedDB) never leave their device.
> `scripts/check-webapp.sh` (in CI) guards the PWA shell and these on-device guarantees.

**Features:** multiple children + loop history + a "Best Flops" lessons gallery; per-cycle badges,
sound, and confetti (ethical — no streak-guilt); share/export/import; on-device **photo evidence**;
**🎤 voice dictation** and **AR/AI-glasses readiness** (voice in/out + WebXR probe + documented
input/render seams — see [`docs/builder-loop-app-xr.md`](../../docs/builder-loop-app-xr.md)).

The home page is deliberately **dependency-free**: a single HTML file with inline CSS, so a
6-year-old (or anyone) can open it instantly — no install, no build, no Node.

## See it live (no install)

It's hosted on GitHub Pages so a non-technical parent can just click a link:

**→ https://wjlgatech.github.io/daniel-and-david/**

Published automatically by [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml)
on every push to `main` that touches `apps/web/public/`. (One-time setup: repo **Settings →
Pages → Source: GitHub Actions**.)

## Run it locally

```bash
open public/index.html        # macOS
xdg-open public/index.html    # Linux
start public/index.html       # Windows
```

That's it. Edit `public/index.html`, refresh the browser, see your change live. It's the
perfect [first build quest](../../docs/curriculum/daniel-age-11/README.md) for Daniel.

## A note on links

The page links to the repo's docs with **absolute GitHub URLs**
(`https://github.com/wjlgatech/daniel-and-david/blob/main/…`) rather than relative paths, so
every "Read more →" works identically whether the page is opened from a local file or the
hosted Pages URL (where relative `../../docs` paths would fall outside the site root).

## Why no framework (yet)

Per [agentic-engineering](../../docs/principles/agentic-engineering.md): start with the
simplest thing that works. A static page teaches HTML/CSS and lets a kid see instant results.
When the academy genuinely needs a build step (interactivity, many pages), we'll add one —
and document *why* in `CHANGELOG.md`. Not before.

## Good contributions here

- Improve the design (clarity, accessibility, mobile polish).
- Fix copy or add a section linking to new docs/ventures.
- Add a simple, framework-free interactive element (e.g., a milestone progress bar).

Keep it loadable by double-click. If a change needs a build step, discuss it in an issue first.
