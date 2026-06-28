---
# ── IDENTITY (required) ──
name: "Your App Name"
slug: "your-app-slug"            # url-safe; MUST match this filename (your-app-slug.md)
app_type: demo                   # agent | tool | demo | pipeline

# ── THE PITCH (required) ──
pain_solved: "One line: the pain it removes, and for whom."

# ── WHERE IT LIVES (required) ──
host: static                     # static | space | proxy | cli | concept
status: concept                  # live | wip | concept

# ── SAFETY (required) ──
safety: "What it does with data + its limits. Kid-facing apps: on-device, no child data."

# ── NICE TO HAVE (optional — leave out what you can't fill honestly) ──
emoji: "✨"
tags: [example, ages-5-15]
llm: "none (on-device)"          # or e.g. 'anthropic/claude · proxy seam'
framework: "static-html"         # static-html | gradio | docker | edge | cli
license: "MIT"
demo_url: ""                     # link to the running app (omit if not live)
repo_url: ""                     # link to the source
---

## How to run
Describe the single fastest way to use it. For a `static` app, "open the link" is enough.

## Notes (optional)
Anything a parent or builder should know before they start.
