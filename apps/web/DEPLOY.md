# Deploying the demo apps' optional LLM backend

The demos (e.g. [Conversation Spark](public/demos/conversation-spark.html)) work **fully offline,
no key, no deploy** — that's the default. This guide is only for switching on the optional
**✨ "fresh ideas (AI)"** enhancement, which is **parent-facing** and powered by a free LLM.

> **Why a server at all?** A static page can't safely hold an API key (it'd be visible to everyone).
> So the key lives in a tiny serverless function ([`api/spark.js`](api/spark.js)) that the page
> calls. The function only ever receives the **age + interest tags** the parent tapped — never a
> child's name or any data (it sanitizes input to tags by design).

## Fastest path — Vercel (matches `api/spark.js` as written)

1. **Get a free LLM key.** Create one at **[build.nvidia.com](https://build.nvidia.com)** (NVIDIA
   NIM — free tier, OpenAI-compatible). Any OpenAI-compatible key works; see the repo's
   `free-llm` notes.
2. **Deploy `apps/web/`.** Import the repo at [vercel.com](https://vercel.com) and set
   **Root Directory = `apps/web`** (or run `vercel` from inside `apps/web`). `public/` is served as
   the static site; `api/spark.js` auto-deploys as an edge function at `/api/spark`.
3. **Set the env var** in the Vercel project: `NIM_API_KEY=<your key>`
   *(optional: `NIM_BASE_URL`, `NIM_MODEL` — defaults are NVIDIA NIM + Llama-3.1-70B).*
4. **Wire the page to it.** Your endpoint is `https://<project>.vercel.app/api/spark`. Test it:
   ```bash
   curl -s -X POST https://<project>.vercel.app/api/spark \
     -H 'content-type: application/json' \
     -d '{"age":"11","moment":"dinner","interests":["animals","games"]}'
   # → {"questions":["…","…","…"]}
   ```
   Then set it in [`public/demos/conversation-spark.html`](public/demos/conversation-spark.html):
   ```js
   const SPARK = { endpoint: "https://<project>.vercel.app/api/spark" };
   ```
   Commit + push. The ✨ button now generates fresh openers. (Until then it gracefully tells the
   user the built-in questions already work.)

## Alternatives
- **Netlify / Cloudflare** — same logic; their edge handlers take `(request, context)` instead of
  Vercel's `(request)`. Copy the body of `api/spark.js` into a `netlify/edge-functions/spark.js`
  (or a Worker) with that signature and set `NIM_API_KEY`.
- **fly.io** — wrap the same fetch-to-NIM logic in a tiny Node/Express server (`POST /api/spark`),
  `fly secrets set NIM_API_KEY=…`, `fly deploy`.

## Safety (don't regress)
- The function is **parent-facing only** — it must never receive or relay a child's name, free text,
  or any PII. Keep the tag-only sanitization.
- The kid-facing demo core must keep working with **no LLM** (the offline question bank). The LLM is
  an *enhancement*, never a dependency. See [docs/safety](../../docs/safety/) and
  [docs/pain-analysis.md](../../docs/pain-analysis.md).
