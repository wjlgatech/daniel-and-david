# Daniel & David — the Hub

> **First time here?** Don't start with the hub — start with the **[Builder Loop](../builder-loop/)**
> (the four-week family loop) and the **[safety rules](../safety/)**. The hub is the *later*
> stage; we [prove the loop before we scale the hub](../vision/theory-of-change.md).

> 🧪 **Play the demos.** Real apps built from a [Pain2Gain](../principles/pain2gain.md) analysis of
> [family pains](../pain-analysis.md) — e.g. [Conversation Spark](https://wjlgatech.github.io/daniel-and-david/demos/conversation-spark.html)
> (get your kid talking tonight). On-device, no signup, no child data.

This started as a father's curriculum for two boys. It's growing into a **hub**: a living
place that gets better the more people (and agents) show up. Three hubs in one.

> *"Two are better than one, because they have a good reward for their toil... A threefold
> cord is not quickly broken."* — Ecclesiastes 4:9–12

---

## 1. 📚 A living learning hub

Open curriculum that improves every time a real child uses it.

- Age tracks: [David (6) "Six Detective Words"](../curriculum/critical-thinking/david-age-6.md),
  [Daniel (11) applied critical thinking](../curriculum/critical-thinking/daniel-age-11.md), plus
  the [builder tracks](../curriculum/).
- Tied to **real ventures**, not worksheets ([venture #1](../../ventures/kc-matchday-basecamp/)).
- Visual backbone: the [infographics](../assets/) you can reuse and improve.

**How to contribute:** add a lesson or quest, fix an explanation a kid found confusing,
translate a page, or improve a drawing. See [CONTRIBUTING.md](../../CONTRIBUTING.md).

## 2. 🧰 A tools hub (for AI agents)

Every capability we teach a human, we also teach our AIs — in the open, installable.

- **Skills · workflows · hooks** in [`.claude/`](../../.claude/) — see the
  [agent-toolkit overview](../../.claude/README.md) (the five ways to extend an AI teammate).
- **Plugins** in [`tools/`](../../tools/), listed in the repo
  [`marketplace.json`](../../.claude-plugin/marketplace.json).
- First capability: [critical-thinking (5W1H)](../../tools/critical-thinking-plugin/) — built as
  a skill, workflow, hook, *and* plugin, so it doubles as a worked example.

**How to contribute:** add a new skill/workflow/hook/plugin (validated by
`scripts/validate-toolkit.sh` in CI). Keep it small, readable, documented.

## 3. 🤝 A collaboration hub (AI + people → startups)

The endgame: a place where a parent, a kid, an AI director, a designer, and an agent swarm can
**exchange ideas, match into teams, and launch ventures that solve foundational problems.**

> *"Iron sharpens iron, and one man sharpens another."* — Proverbs 27:17

### How matching works (lightweight, on GitHub)

1. **Bring an idea or a problem.** Open a [Discussion](https://github.com/wjlgatech/daniel-and-david/discussions)
   (category *Ideas*) or an issue with the **💡 Idea / 🤝 Collaboration** template. Describe the
   real problem and who it serves.
2. **Interrogate it together.** Anyone (human *or* the `critical-thinking` agent) runs the
   [5W1H test](../curriculum/critical-thinking/) on it in the thread. Weak ideas get sharpened or
   retired honestly; strong ones rise.
3. **Match.** People say "I'll take the design," "I can build the backend," "I know this market,"
   "I'm a parent who'd test it with my kid." Roles assemble in the thread.
4. **Spin up a venture.** A matched team starts a `ventures/<name>/` folder (a README + a SPEC,
   like [venture #1](../../ventures/kc-matchday-basecamp/)) and builds in the open.

### The rules of the hub

Everything here passes the [four-question test](../principles/values.md#the-test-for-any-decision):
**Is it true? Is it legal and is my word kept? Does it genuinely serve someone? Would I be proud
to explain it?** We build things that bless people, honestly, or we don't build them.

And kids are first-class here. A six-year-old's drawing and an AI director's architecture are
both real contributions. That's the point.

---

## Why open it up?

Distributed, networked collaboration outbuilds closed teams for work like this — *"given enough
eyeballs, all bugs are shallow"* (Raymond, *The Cathedral and the Bazaar*) and commons-based peer
production (Benkler, *The Wealth of Networks*, 2006). And every newcomer gains a thousand guides
just ahead of them — Vygotsky's Zone of Proximal Development, at hub scale.

**Come build with us.** → [Read the story](../marketing/the-daniel-and-david-story.md) ·
[Start contributing](../../CONTRIBUTING.md) ·
[Open a Discussion](https://github.com/wjlgatech/daniel-and-david/discussions)
