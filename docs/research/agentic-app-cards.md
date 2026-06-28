# Research — agentic app cards + where to host agentic apps

*Synthesis behind [the Agentic App Card standard](../agentic-app-card.md) + the
[apps gallery](../../apps/web/public/apps.html). Reuse before re-researching model cards, app
registries, or HF Spaces hosting.*

## Key findings

- **What a HuggingFace model card actually is** — a single `README.md` with a **YAML frontmatter**
  block (machine-indexed: `license`, `pipeline_tag`, `library_name`, `tags`, `language`,
  `datasets`, `base_model`) + ~**14 prose sections** (Details, Uses/Out-of-Scope, Bias-Risks-
  Limitations, How-to-Get-Started, Training, Evaluation, …). All technically optional; a handful are
  de-facto required for discoverability. **What makes it a platform primitive:** one file, zero new
  infra, the hub auto-renders the markdown and indexes the YAML for search/filter/cross-linking.
  That shared little format is what let HF *list, filter, compare, and remix* models at scale.
- **10×-simpler mapping → an "Agentic App Card."** Keep the few fields that drive discovery + the
  sections that answer "why/how/safe," drop the model-training apparatus. Our card = **6 required
  fields** (`name`, `slug`, `app_type`, `pain_solved`, `host`, `status`, `safety`) + a one-line
  pitch + "How to run." Model→app field map: `pipeline_tag`→`app_type`, `base_model`→`llm`,
  Intended-Use→`pain_solved`, Limitations→`safety`, How-to-Start→body. **Prior art confirms the
  shape:** Google's **A2A AgentCard** (`/.well-known/agent-card.json`; `name`, `description`, `url`,
  `skills[]`, `capabilities`) and **AGNTCY/OASF** are the machine-to-machine cousins — same field
  set, ours is the *human-readable, kid-legible* variant.
- **HF Spaces as a host (free tier, 2026).** SDKs: **Gradio** (primary), **Docker** (any stack —
  FastAPI/Node), **static HTML**; **Streamlit deprecated** as first-class (Docker now). Free =
  **2 vCPU / 16 GB / 50 GB ephemeral, $0**, **sleeps on idle** (~30 s cold start), **no persistent
  disk** (write state to an external DB or a private HF Dataset). **Secrets** are first-class
  (Settings → Secrets, encrypted, read via env). **An LLM-backed agent app runs cleanly** *if it
  calls an external LLM API* (key as a Secret) rather than loading weights — the heavy compute lives
  at the provider; the Space just orchestrates + serves UI.
- **Host strategy — use BOTH, by design (the `host` field).** Three options weighed:
  (A) host every app *on HF Spaces* and link them — great per-app demo runtime, but **sleep-on-idle
  kills UX** for a low-traffic family gallery, and it's a poor *gallery* layer;
  (B) become a *static registry ourselves* (GitHub Pages + cards + index) — always-on, $0,
  full editorial/child-safety control, but **no compute** of its own;
  (C) **mix** — a static registry we own, where each card's `host` points wherever that app lives
  (static / HF Space / our proxy / cli / concept). **(C) is the recommendation:** the gallery is a
  static, always-on, child-safe registry on Pages; any individual app can live on Pages (on-device,
  our default), on an HF Space (needs a backend), or behind our serverless proxy (needs an LLM key).
  No vendor lock-in; cards still render even if a linked app is offline. **A minimal registry needs
  only:** a card schema (one `.md`/app) + an index (`registry.json`) + a gallery page + a CI check —
  no database, no server.
- **Gallery design (from base44 / lovable / printingpress).** Cross-cutting moves worth copying:
  **screenshot/visual-first card** (we substitute a big emoji band — no screenshots yet),
  **color-coded type badge** (one per card, scannable), **`pain_solved` as the only prose**
  (forces clarity), **horizontal filter tabs not a sidebar**, **uniform card height** (organized
  grid > masonry), an **LLM chip** (borrowed from model-card `base_model` — signals maturity), and
  an **"add your app" dashed empty-state** card (invites contribution). base44 = light/neutral,
  screenshot-dominant, clone-count social proof; lovable = dark, centered one-input hero,
  image-dominant cards; printingpress = monochrome + terminal-as-hero, extreme whitespace. **Our
  choice:** keep the warm clay-on-paper palette + serif headings (kids read it; differentiates from
  lovable's dark mode) but adopt their modern card *patterns*.

## Sources
HF Model Cards docs + annotated template (YAML fields, required-vs-optional sections); HF Spaces
overview + config + Docker docs (free-tier 2vCPU/16GB/50GB ephemeral, sleep-on-idle, no persistent
disk, Secrets); Google **A2A AgentCard** spec + **AGNTCY/OASF** (agent-card prior art); base44
(Design Pack + templates gallery), lovable.dev (+ templates), printingpress.dev (UI characterization).
