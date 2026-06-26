# Agents

Our AI teammates. In an [AI-native company](../docs/principles/ai-native-company.md), agents
do the heavy lifting — searching, drafting, building, testing — while humans direct and edit.

This folder holds small, **readable** agents you can learn from and grow.

| Agent | What it teaches | Stack |
|---|---|---|
| [`hello-agent/`](hello-agent/) | The agent loop (look → think → act → check) + business margin | plain Python 3, no installs |

## The rule for every agent here

Whatever an agent does, **a human owns the result.** Read its output, verify it, take
responsibility. An agent is a brilliant intern that is sometimes confidently wrong. See
[agentic-engineering](../docs/principles/agentic-engineering.md).

## Adding an agent

Keep it small and readable — someone learning should be able to follow every line. Include a
`README.md` that explains the loop it runs and how to run it. If it calls an AI model, never
hardcode keys; read them from the environment (and document which env vars in the README).
