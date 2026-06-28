# 🃏 The Agentic App Card

*One file. One screen. Everything a kid, a parent, or an agent needs to understand and run
an agentic app.*

A HuggingFace **model card** describes a model. An **Agentic App Card** describes an *app you
can actually run* — the kind we build in the [Builder Loop](builder-loop/README.md) and ship to
the [apps gallery](../apps/web/public/apps.html). We took the model-card idea and made it
**~10× simpler**: HF's template has **7+ metadata fields and 14 prose sections**; ours has
**6 required fields, a one-line pitch, and a "How to run."** It fits on one screen and in one
PR diff.

> **Why a card at all?** Cards are the unit that made HuggingFace a *platform* — once every model
> spoke the same little format, you could list, filter, compare, and remix them. We want the same
> for the small agentic apps a family builds: a shared, tiny format so they can be catalogued,
> played, and mixed.

---

## The format

A card is a Markdown file with a **YAML frontmatter** block + a short body. It lives at
`apps/web/public/cards/<slug>.md`. Copy [`_template.md`](../apps/web/public/cards/_template.md)
to start.

```yaml
---
# ── IDENTITY (required) ──
name: "Conversation Spark"            # what people see
slug: "conversation-spark"            # url-safe; MUST match the filename
app_type: demo                        # agent | tool | demo | pipeline

# ── THE PITCH (required) ──
pain_solved: "Get your 6- or 11-year-old talking tonight — one good question, on demand."

# ── WHERE IT LIVES (required) ──
host: static                          # static | space | proxy | cli | concept
status: live                          # live | wip | concept

# ── SAFETY (required) ──
safety: "On-device. Collects no child name or data. Parent-facing only."

# ── NICE TO HAVE (optional) ──
emoji: "💬"
tags: [parents, conversation, ages-5-15]
llm: "optional · free-llm seam"       # the model it can use, or 'none (on-device)'
framework: "static-html"              # static-html | gradio | docker | edge | cli
license: "MIT"
demo_url: "./demos/conversation-spark.html"
repo_url: "https://github.com/wjlgatech/daniel-and-david/blob/main/apps/web/public/demos/conversation-spark.html"
---

## How to run
Just open the link — it runs in your browser, offline, on your device.

## Notes (optional)
Curated offline question bank; an optional LLM can suggest more (parent-facing, no child data).
```

That's the whole standard.

---

## The 6 required fields (and why only these)

| Field | What it answers | Maps to model-card… |
|---|---|---|
| `name` | What is it called? | model name |
| `slug` | Its stable id / URL (must equal the filename) | repo id |
| `app_type` | `agent` / `tool` / `demo` / `pipeline` | `pipeline_tag` |
| `pain_solved` | **Why would I use this?** (one line) | "Intended use" |
| `host` | **Where does it run?** (the *mixing* field — see below) | (new) |
| `safety` | What it does with data + its limits (one line) | "Bias, risks & limitations" |

Everything else is optional. If you can't fill a field honestly, leave it out — an empty field
is more honest than a guessed one.

### `app_type`
- **`agent`** — decides + acts in a loop (calls tools, plans).
- **`tool`** — one job, one call (a function with a face).
- **`demo`** — a small interactive proof of an idea.
- **`pipeline`** — a fixed multi-step flow.

### `status`
- **`live`** — you can open and use it right now.
- **`wip`** — being built; partly works.
- **`concept`** — designed, not built. (Honest status is non-negotiable here — same rule as the
  venture badges; see [`scripts/check-status-truth.sh`](../scripts/check-status-truth.sh).)

---

## `host` — the one field that lets us *mix*

The user's question was: *do we host agentic apps on HuggingFace, or become a host ourselves?*
The answer is **both, by design** — the `host` field makes a card point anywhere, so the gallery
mixes apps from different homes:

| `host` | Runs on | Use when |
|---|---|---|
| `static` | our GitHub Pages (browser, offline) | on-device, no backend — **our default** |
| `space` | a HuggingFace **Space** (Gradio/Docker) | needs a live backend / heavier compute |
| `proxy` | our serverless edge fn (e.g. `api/spark.js`) | needs an LLM key kept server-side |
| `cli` | the user's own machine | a builder tool, run locally |
| `concept` | nowhere yet | designed, not built |

So the gallery is a **static registry** we own, and any individual app can live on Pages, on an
HF Space, or behind our own proxy. We don't have to choose — see the full reasoning in
[`docs/research/agentic-app-cards.md`](research/agentic-app-cards.md).

---

## How the gallery finds cards

The [apps gallery](../apps/web/public/apps.html) reads
[`apps/web/public/cards/registry.json`](../apps/web/public/cards/registry.json) — a small index
of every card. **The card `.md` is the portable standard; `registry.json` is the fast index the
page renders.** They must agree, and [`scripts/check-cards.sh`](../scripts/check-cards.sh)
enforces that in CI (every card has a registry entry, every entry has a card, required fields
present, statuses honest). Closed loop: add a card → add its registry line → the check passes →
it appears in the gallery.

## Add your own app (3 steps)
1. `cp apps/web/public/cards/_template.md apps/web/public/cards/<your-slug>.md` and fill the 6
   required fields.
2. Add one matching object to `apps/web/public/cards/registry.json`.
3. Run `bash scripts/check-cards.sh` — green means it's live in the gallery.

---

*Children read this repo. Keep every card kind, honest, and age-appropriate. No card may claim a
`live` status it hasn't earned, collect a child's identity, or send a child's data anywhere.*
