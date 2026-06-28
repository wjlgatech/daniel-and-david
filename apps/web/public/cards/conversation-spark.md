---
name: "Conversation Spark"
slug: "conversation-spark"
app_type: demo

pain_solved: "Get your 6- or 11-year-old talking tonight — one good question, on demand."

host: static
status: live

safety: "On-device. Collects no child name or data. Parent-facing only; an optional LLM never sees a child's identity."

emoji: "💬"
tags: [parents, conversation, ages-5-15]
llm: "optional · free-llm seam"
framework: "static-html"
license: "MIT"
demo_url: "./demos/conversation-spark.html"
repo_url: "https://github.com/wjlgatech/daniel-and-david/blob/main/apps/web/public/demos/conversation-spark.html"
---

## How to run
Open the link — it runs in your browser, offline, on your device. Pick your child's age, get a
question, ask it at dinner or in the car.

## Notes
Built with [Pain2Gain](https://github.com/wjlgatech/daniel-and-david/blob/main/docs/principles/pain2gain.md).
A curated offline question bank works with no internet; an optional LLM (the `SPARK` seam) can
suggest more questions — it's parent-facing and never receives a child's name or data.
