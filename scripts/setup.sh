#!/usr/bin/env bash
# One-command setup for new contributors, founding families, and the boys.
# Safe to run repeatedly. Sets up the local tools, runs the guardrails, and tells you what's next.
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

echo ""
echo "🌱 Welcome to Daniel & David — setting you up"
echo "============================================="

# 1. Make the helper scripts runnable.
chmod +x scripts/*.sh 2>/dev/null && echo "✅ Scripts are executable."

# 2. Detect Claude Code (optional but recommended) and point at the toolkit.
if command -v claude >/dev/null 2>&1; then
  echo "✅ Claude Code found. This repo ships ready-to-use commands & plugins:"
  echo "     • /goal-10x   — drive any objective to green (.claude/commands/goal-10x.md)"
  echo "     • /check      — run every guardrail (.claude/commands/check.md)"
  echo "     • the critical-thinking plugin (5W1H) — install with:"
  echo "         /plugin marketplace add wjlgatech/daniel-and-david"
  echo "         /plugin install critical-thinking@daniel-and-david"
else
  echo "ℹ️  Claude Code not found (optional). Install it to use /goal-10x and the toolkit:"
  echo "     https://claude.ai/code   →   then reopen this folder."
fi

# 3. Run the guardrails so newcomers see green and know the bar.
echo ""
echo "🔎 Running the guardrails (the same checks CI runs)…"
ok=0
run() { if bash "scripts/$1" >/dev/null 2>&1; then echo "  ✅ $2"; else echo "  ⚠️  $2 — run: bash scripts/$1"; ok=1; fi; }
run check-links.sh               "Docs: all links resolve"
run validate-toolkit.sh          "Agent toolkit valid"
run check-status-truth.sh        "Status claims are true"
run check-registration-safety.sh "Signup is adults-only & private"
run check-webapp.sh              "Builder Loop app is installable & on-device"
run check-i18n.sh                "Language tags (中文 / ES / 한국어 / 日本語) in sync"

echo ""
echo "👉 Next:"
echo "   • Families: open the app → apps/web/public/app.html (or the live site)"
echo "   • Builders: read AGENTS.md, then run ./scripts/check.sh before any PR"
echo "   • Founding cohort: see docs/founding-families.md"
echo ""
if [ "$ok" -eq 0 ]; then echo "🎉 All green. Build something good. Make it pay. Use it to bless."; else echo "👆 A couple of friendly fixes above, then you're set."; fi
echo ""
