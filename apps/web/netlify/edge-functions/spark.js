// Conversation Spark — free-LLM proxy, Netlify edge entry point (runs on Deno).
// Shares the exact body with the Vercel handler via ../../api/_spark-core.js — one safety logic,
// many hosts. Reads NIM_API_KEY from the Netlify env. Routed to /api/spark in netlify.toml.
// See apps/web/DEPLOY.md.
import { handleSpark } from "../../api/_spark-core.js";

export default (request) => handleSpark(request);
