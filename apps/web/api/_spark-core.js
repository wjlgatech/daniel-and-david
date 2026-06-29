// Conversation Spark — free-LLM core (host-agnostic, parent-facing only).
//
// One body, many hosts: Vercel (api/spark.js) and Netlify (netlify/edge-functions/spark.js) both
// import handleSpark() from here, so the safety logic lives in exactly one place. Generates 3 warm
// opener questions from the PARENT's age + interest tags. The key stays on the server (never in the
// static page). Sanitizes input to TAGS ONLY — it cannot receive or relay a child's name or free
// text. See apps/web/DEPLOY.md. Guarded by apps/web/api/spark.test.mjs (scripts/check-spark.sh).

const MOMENTS = ["dinner", "car", "bedtime", "feelings"];
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};
// Read an env var on Vercel (process.env), Netlify/Deno (Deno.env), or Netlify globalThis.Netlify.
const env = (k) => {
  try { if (typeof process !== "undefined" && process.env && process.env[k]) return process.env[k]; } catch (e) {}
  try { if (typeof Deno !== "undefined") return Deno.env.get(k); } catch (e) {}
  try { if (typeof Netlify !== "undefined" && Netlify.env) return Netlify.env.get(k); } catch (e) {}
  return undefined;
};

export async function handleSpark(req) {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "POST only" }), { status: 405, headers: CORS });

  let body = {};
  try { body = await req.json(); } catch (e) {}
  // Sanitize: TAGS ONLY. This endpoint cannot accept a child's name or free text by design.
  const age = String(body.age || "any").slice(0, 8).replace(/[^a-z0-9]/gi, "");
  const moment = MOMENTS.includes(body.moment) ? body.moment : "dinner";
  const interests = Array.isArray(body.interests)
    ? body.interests.slice(0, 4).map((s) => String(s).slice(0, 24).replace(/[^a-z0-9 /-]/gi, "")).filter(Boolean)
    : [];

  const key = env("NIM_API_KEY");
  if (!key) return new Response(JSON.stringify({ error: "NIM_API_KEY not set" }), { status: 500, headers: CORS });
  const base = (env("NIM_BASE_URL") || "https://integrate.api.nvidia.com/v1").replace(/\/$/, "");
  const model = env("NIM_MODEL") || "meta/llama-3.1-70b-instruct";

  const prompt =
    `You help a PARENT start a warm conversation with their child. Generate exactly 3 short, ` +
    `open-ended, non-threatening opener QUESTIONS a parent could ask their child (age band: ${age}) ` +
    `at "${moment}".` + (interests.length ? ` Gently weave in their interests: ${interests.join(", ")}.` : "") +
    ` Tone: warm, curious, feeling-friendly (Gottman emotion-coaching style). No advice, no yes/no ` +
    `questions, nothing that pressures or evaluates the child. Return ONLY a JSON array of 3 strings.`;

  try {
    const r = await fetch(base + "/chat/completions", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({ model, temperature: 0.8, messages: [{ role: "user", content: prompt }] }),
    });
    const j = await r.json();
    let text = (j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || "[]";
    let questions = [];
    try {
      const m = text.match(/\[[\s\S]*\]/);
      questions = JSON.parse(m ? m[0] : text);
    } catch (e) {
      questions = text.split(/\n+/).map((s) => s.replace(/^\s*[\d.\-*"]+\s*/, "").replace(/"\s*$/, "").trim()).filter(Boolean);
    }
    questions = questions.filter((q) => typeof q === "string" && q.length > 5).slice(0, 3);
    return new Response(JSON.stringify({ questions }), { headers: CORS });
  } catch (e) {
    return new Response(JSON.stringify({ error: "upstream" }), { status: 502, headers: CORS });
  }
}
