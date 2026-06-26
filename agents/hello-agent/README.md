# hello-agent — your first AI teammate

The smallest possible **agent**, written in plain Python so you can read every line.

## What's an agent?

An agent is a loop:

```
   LOOK at a goal  →  THINK of a step  →  ACT (use a tool)  →  CHECK  →  repeat
```

Real agents (like the ones that will build [venture #1's app](../../ventures/kc-matchday-basecamp/))
use an AI model to do the thinking and real tools (write files, call APIs, run tests) to act.
This one keeps the *shape* but uses simple math so nothing is hidden from you.

It teaches **margin** — the heartbeat of every business.

## Run it

```bash
python3 agent.py                 # uses venture #1's $29 kit ($7 cost) by default
python3 agent.py --price 49 --cost 14
python3 agent.py --price 99 --cost 5     # try the high-margin Group Hype Reel
```

No installs needed — just Python 3.

## Your quest (Daniel)

This is [Quest 2.2](../../docs/curriculum/daniel-age-11/README.md). Read the code in
`agent.py`, then **change it** to do something *you* want — maybe it also tells you how many
sales you'd need to make $1,000. You must be able to explain every line you change. That's the
rule of [agentic engineering](../../docs/principles/agentic-engineering.md): **you are the
editor.**

## Where this leads

Once you're comfortable here, the next step is an agent that uses a real AI model and real
tools to help build a real product. Same loop — just bigger thinking and bigger tools.
