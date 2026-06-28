#!/usr/bin/env bash
# Agentic App Card check — keeps the apps gallery and the card standard coherent.
#
# Verifies: the registry is valid JSON; every card .md has the 6 required frontmatter fields with
# values from the allowed vocab; every card has a matching registry entry and vice-versa (no drift);
# name/app_type/host/status agree between the .md and the registry; the gallery page exists and reads
# the registry. Self-disables if there are no cards yet. See docs/agentic-app-card.md.
# Usage: ./scripts/check-cards.sh
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

DIR="apps/web/public/cards"
REG="$DIR/registry.json"
GALLERY="apps/web/public/apps.html"
echo ""
echo "🃏 Agentic App Card check"
echo "-------------------------"

if [ ! -d "$DIR" ]; then
  echo "  ⚠️  $DIR not found — skipping (no app cards yet)."; echo ""; exit 0
fi

python3 - "$DIR" "$REG" "$GALLERY" <<'PY'
import json, os, re, sys
card_dir, reg_path, gallery = sys.argv[1], sys.argv[2], sys.argv[3]
fail = 0
def err(m):
    global fail; print("  ❌ " + m); fail = 1
def ok(m): print("  ✅ " + m)

REQUIRED = ["name", "slug", "app_type", "pain_solved", "host", "status", "safety"]
APP_TYPES = {"agent", "tool", "demo", "pipeline"}
HOSTS = {"static", "space", "proxy", "cli", "concept"}
STATUS = {"live", "wip", "concept"}

def parse_frontmatter(text):
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.S)
    if not m: return None
    fm = {}
    for line in m.group(1).splitlines():
        line = line.split(" #")[0].rstrip() if not line.strip().startswith("#") else ""
        if not line.strip() or ":" not in line: continue
        k, _, v = line.partition(":")
        fm[k.strip()] = v.strip().strip('"').strip("'")
    return fm

# --- cards ---
cards = {}
for fn in sorted(os.listdir(card_dir)):
    if not fn.endswith(".md") or fn.startswith("_"): continue
    slug = fn[:-3]
    fm = parse_frontmatter(open(os.path.join(card_dir, fn), encoding="utf-8").read())
    if fm is None:
        err(f"{fn}: no YAML frontmatter block"); continue
    miss = [k for k in REQUIRED if not fm.get(k)]
    if miss:
        err(f"{fn}: missing required field(s): {', '.join(miss)}"); continue
    if fm["slug"] != slug:
        err(f"{fn}: slug '{fm['slug']}' must equal filename '{slug}'")
    if fm["app_type"] not in APP_TYPES:
        err(f"{fn}: app_type '{fm['app_type']}' not in {sorted(APP_TYPES)}")
    if fm["host"] not in HOSTS:
        err(f"{fn}: host '{fm['host']}' not in {sorted(HOSTS)}")
    if fm["status"] not in STATUS:
        err(f"{fn}: status '{fm['status']}' not in {sorted(STATUS)}")
    # honesty: a 'live' app must point somewhere; a 'concept' must not pretend it runs
    if fm["status"] == "live" and not fm.get("demo_url"):
        err(f"{fn}: status 'live' but no demo_url — can't claim live without a runnable link")
    if fm["status"] == "concept" and fm.get("demo_url"):
        err(f"{fn}: status 'concept' but has a demo_url — that's not a concept")
    cards[slug] = fm
if cards: ok(f"{len(cards)} card(s) have all required fields + valid vocab")

# --- registry ---
try:
    reg = json.load(open(reg_path, encoding="utf-8"))
    entries = {a["slug"]: a for a in reg.get("apps", [])}
    ok("registry.json is valid JSON")
except Exception as e:
    err(f"registry.json invalid: {e}"); entries = {}

# --- drift: cards <-> registry ---
for slug in cards:
    if slug not in entries:
        err(f"card '{slug}.md' has no entry in registry.json")
for slug in entries:
    if slug not in cards:
        err(f"registry.json lists '{slug}' but cards/{slug}.md is missing")
for slug in set(cards) & set(entries):
    for f in ("name", "app_type", "host", "status"):
        if str(cards[slug].get(f, "")) != str(entries[slug].get(f, "")):
            err(f"'{slug}': {f} differs between card ('{cards[slug].get(f)}') and registry ('{entries[slug].get(f)}')")
if cards and not fail:
    ok("cards and registry.json are in sync (no drift)")

# --- gallery wiring ---
if not os.path.exists(gallery):
    err(f"{gallery} not found")
else:
    g = open(gallery, encoding="utf-8").read()
    if "registry.json" in g: ok("apps.html reads the registry")
    else: err("apps.html does not reference registry.json")
    if "<script src" in g.replace("data:image", ""):
        if re.search(r'<script[^>]+src=', g): err("apps.html loads an external script")
    else: ok("apps.html has no external <script src>")

sys.exit(1 if fail else 0)
PY
rc=$?

echo "-------------------------"
if [ "$rc" -ne 0 ]; then echo "::error::App Card check failed."; echo ""; exit 1; fi
echo "🎉 App cards, registry, and gallery are coherent."
echo ""
exit 0
