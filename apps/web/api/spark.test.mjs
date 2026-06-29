// Tests for the Conversation Spark free-LLM proxy (api/spark.js).
//
// The critical invariant: this endpoint is PARENT-FACING and tag-only — a child's name or any
// free text must NEVER reach the LLM, even if a caller tries to smuggle it in the body. These
// tests mock the upstream NIM call (no key/network needed) and assert that guarantee, plus the
// graceful no-key / wrong-method behavior. Run via scripts/check-spark.sh.
import handler from "./spark.js";

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log("  ✅ " + m); } else { fail++; console.log("  ❌ " + m); } };
const post = (obj) => new Request("http://x/api/spark", {
  method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(obj),
});

// 1. No key → 500, and it must NOT have called upstream.
delete process.env.NIM_API_KEY;
let calledWithoutKey = false;
globalThis.fetch = async () => { calledWithoutKey = true; return new Response("{}"); };
let res = await handler(post({ age: "11" }));
ok(res.status === 500, "missing NIM_API_KEY → 500");
ok(!calledWithoutKey, "no upstream call when key is missing");

// 2. CORS preflight + method guard.
ok((await handler(new Request("http://x", { method: "OPTIONS" }))).status === 204, "OPTIONS → 204 (CORS preflight)");
ok((await handler(new Request("http://x", { method: "GET" }))).status === 405, "GET → 405");

// 3. With a key + mocked NIM: try to smuggle a child name + free text + bad inputs.
process.env.NIM_API_KEY = "test-key-xyz";
let captured = null;
globalThis.fetch = async (url, opts) => {
  captured = { url, body: JSON.parse(opts.body), auth: opts.headers.Authorization };
  return new Response(JSON.stringify({ choices: [{ message: {
    content: '["What made you smile today?","Tell me about a game you love.","If animals could talk, who first?"]'
  } }] }), { status: 200 });
};
res = await handler(post({
  age: "11<script>", moment: "evil-moment", interests: ["animals", "games", "x".repeat(50), "a", "b", "c"],
  child_name: "Daniel Smith", note: "my kid Daniel is sad about the XYZ incident at school",
}));
const out = await res.json();
const sent = captured.body.messages[0].content;

ok(res.status === 200 && Array.isArray(out.questions) && out.questions.length === 3, "returns exactly 3 questions");
ok(!/daniel/i.test(sent) && !/smith/i.test(sent), "🔒 child name NEVER forwarded to the LLM");
ok(!/xyz/i.test(sent) && !/\bsad\b/i.test(sent) && !/incident/i.test(sent), "🔒 free-text note NEVER forwarded");
ok(!/[<>]/.test(sent), "age sanitized — no angle brackets reach the prompt");
ok(/dinner/.test(sent), "invalid moment falls back to 'dinner'");
ok(/animals/.test(sent) && /games/.test(sent), "valid interest tags are included");
ok(captured.auth === "Bearer test-key-xyz", "key sent as Bearer auth (server-side only)");
ok(captured.url.endsWith("/chat/completions"), "calls the OpenAI-compatible chat endpoint");

// 4. Upstream failure → 502 (never a crash).
globalThis.fetch = async () => { throw new Error("network down"); };
ok((await handler(post({ age: "6" }))).status === 502, "upstream failure → 502 (graceful)");

console.log(`\n  ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
