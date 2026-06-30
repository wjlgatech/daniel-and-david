# Builder Loop Coach (`apps/web-agent`)

A voice-first **conversational** second door into the [Builder Loop](../../docs/builder-loop/):
a CopilotKit agent that *guides* a family through the 5-cycle SOP by talking, extracts their
inputs through dialogue, and **does real work** via actions — instead of a step wizard.

> **Status: 🟡 spec in design / PR2 skeleton.** Not deployed. See [`SPEC.md`](SPEC.md) for the
> full design, the privacy model, and the build plan. This ships **alongside** the existing
> static PWA (`apps/web/public/app.html`), which is unchanged.

## Run it locally

```bash
cd apps/web-agent
cp .env.example .env.local      # set ONE of GROQ_API_KEY / GEMINI_API_KEY / OPENAI_API_KEY
npm install
npm run dev                     # http://localhost:3000/coach
```

A free **Groq** key (console.groq.com) is the easiest start — it satisfies both constraints the
coach needs (see below).

## How it works

- **`app/api/copilotkit/route.ts`** — the agent's brain. Backed by the free-LLM **survival chain**
  (`lib/llm.ts`): it tries each configured provider and **fails over at stream-init** on a 429/413.
- **`lib/sop/builder-loop.ts`** — the Builder Loop SOP *as data* (5 cycles, fields, exit criteria,
  and the system instructions). This is the "predefined procedure" the agent holds as a goal.
- **`components/Coach.tsx`** — **the real work.** `useCopilotAction` lets the model write SOP fields
  as it extracts them from conversation (`recordCycleField`) and advance only when a cycle is
  complete (`advanceCycle`); `useCopilotReadable` keeps it aware of live state. A side panel shows
  the captured fields filling in.
- **`lib/store.ts`** — on-device persistence seam (localStorage). Family data never leaves the device.
- **`lib/voice/`** — reusable mic: speak instead of typing (adapted from the agentic-portfolio build).

## The model must be tool-capable AND stream clean content

Learned from the [agentic-portfolio](https://github.com/wjlgatech/agentic-portfolio) reference
build — the coach "does real work" only if the model can:
1. emit **structured `tool_calls`** (so CopilotKit actions fire), and
2. stream plain **`content`**, not `reasoning_content` (reasoning models return 200 → blank UI).

CopilotKit versions are **pinned** (`@copilotkit/* 1.61.2`) — a `^range` can silently pull a
different protocol.

> ⚠️ **Provider note (CopilotKit 1.61):** the runtime drives the model through `@ai-sdk/openai`,
> which uses the **Responses API (`/responses`)**. **Gemini's OpenAI-compat endpoint 404s on
> `/responses`**, so Gemini does *not* work as the chat brain here. `/api/copilotkit` pre-flights
> each provider against `/responses` and skips ones that fail — so a Gemini key is harmlessly
> bypassed in favor of **OpenAI** (verified working) or **Groq**. Use Groq (free) or OpenAI.

## Privacy & safety (read before deploying)

This PR uses a **cloud** model and **cloud** speech, so it is **adults-only** and gated by
`COACH_ADULT_TOKEN`. The target end-state (SPEC §4–5) is an **on-device** brain (WebLLM) and
**on-device** voice (Whisper) so nothing leaves the device — the default for a kid+parent surface.
The rules in [`docs/safety/ai-use-boundaries.md`](../../docs/safety/ai-use-boundaries.md) bind this app.
