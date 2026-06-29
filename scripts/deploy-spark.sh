#!/usr/bin/env bash
# One-command deploy of the free-LLM proxy to Vercel, then wire the endpoint into the demos.
#
# PREREQS (yours — they need your accounts/keys, so this script can't do them for you):
#   1. A free NVIDIA NIM key from https://build.nvidia.com  (NIM_API_KEY)
#   2. The Vercel CLI + a one-time login:  npm i -g vercel  &&  vercel login
#
# Then run from the repo root:
#   NIM_API_KEY=nvapi-xxxx ./scripts/deploy-spark.sh
#
# It deploys apps/web/ (static site + api/spark.js edge fn), sets the key, smoke-tests the
# endpoint, and runs set-spark-endpoint.sh so the ✨ button goes live. Verify locally first with
# scripts/check-spark.sh. See apps/web/DEPLOY.md.
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

command -v vercel >/dev/null 2>&1 || { echo "❌ Vercel CLI not found. Run: npm i -g vercel && vercel login"; exit 1; }
: "${NIM_API_KEY:?Set NIM_API_KEY (free key from https://build.nvidia.com). e.g. NIM_API_KEY=nvapi-... $0}"

echo "✨ Verifying the proxy before deploy…"
bash scripts/check-spark.sh || { echo "❌ Proxy tests failed — fix before deploying."; exit 1; }

echo "🚀 Deploying apps/web to Vercel (production)…"
( cd apps/web && \
  printf '%s' "$NIM_API_KEY" | vercel env add NIM_API_KEY production 2>/dev/null || true; \
  vercel deploy --prod --yes )

echo ""
echo "Next: copy the deployment URL above and run —"
echo "  ./scripts/set-spark-endpoint.sh https://<your-project>.vercel.app/api/spark"
echo "Smoke-test it:"
echo "  curl -s -X POST https://<your-project>.vercel.app/api/spark -H 'content-type: application/json' \\"
echo "    -d '{\"age\":\"11\",\"moment\":\"dinner\",\"interests\":[\"animals\"]}'"
