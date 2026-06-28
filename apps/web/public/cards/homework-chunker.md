---
name: "Homework Chunker"
slug: "homework-chunker"
app_type: tool

pain_solved: "Turn an 11-year-old's scary homework pile into small 15-minute wins they choose the order of."

host: static
status: live

safety: "Kid-facing and kid-owned. On-device, no name, no account, no data, no LLM. A behavioral scaffold (chunk + focus + visible progress), never tracking or profiling."

emoji: "📚"
tags: [kids, ages-10-13, homework, focus, autonomy]
llm: "none (on-device)"
framework: "static-html"
license: "MIT"
demo_url: "./demos/homework-chunker.html"
repo_url: "https://github.com/wjlgatech/daniel-and-david/blob/main/apps/web/public/demos/homework-chunker.html"
---

## How to run
Open the link. Dump in everything you have to do, tag each as Quick/Medium/Big/Huge (that's how many
15-minute blocks it becomes), then hit Focus: one block at a time, a 15:00 timer, "done early" and
"+5 min", and a progress bar that fills as you clear blocks. You pick the order.

## Notes
Built with [Pain2Gain](https://github.com/wjlgatech/daniel-and-david/blob/main/docs/principles/pain2gain.md)
for the #1 daily pain of an eleven-year-old (homework overwhelm/avoidance). Designed around early-
adolescent psychology: **autonomy** (kid-owned, no parent lock), **competence** (small finishable
blocks + visible progress restore the feeling that *I can*), and a **calm, un-babyish** tone — no
confetti. No LLM because it's kid-facing; nothing leaves the device.
