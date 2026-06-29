// Conversation Spark — free-LLM proxy, Vercel edge entry point.
// All logic lives in _spark-core.js (shared with the Netlify edge function). See apps/web/DEPLOY.md.
import { handleSpark } from "./_spark-core.js";

export const config = { runtime: "edge" };
export default handleSpark;
