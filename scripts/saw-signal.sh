#!/usr/bin/env bash
# SAW series signal — did the articles produce a decision?
#
# The article series (docs/saw/SERIES.md) was written before any build, to find out four things. This reads the
# hand-kept ledger docs/saw/signal.json and prints, for each, pass / fail / not measured, and the verdict.
# It exits 1 only when the ledger is malformed, or when the due date has passed with a number still missing
# (a missing result on the date is a result, and it should be loud). Before the date, "not measured" is honest.
#
# Usage: ./scripts/saw-signal.sh
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

python3 - <<'PYEOF'
import datetime, json, sys
try:
    s = json.load(open("docs/saw/signal.json", encoding="utf-8"))
    due = datetime.date.fromisoformat(s["due"])
except Exception as e:  # malformed ledger
    print(f"  ❌ docs/saw/signal.json could not be read: {e}"); sys.exit(1)

today = datetime.date.today()
asked, militant = s.get("strangers_asked"), s.get("strangers_heard_militant")
checks = [
    ("The name: 20+ strangers asked, under half hear 'militant'",
     None if asked is None or militant is None else (asked >= 20 and militant * 2 < asked),
     f"{militant} of {asked}"),
    ("Readers: 10+ mission results posted",
     None if s.get("reader_mission_numbers") is None else s["reader_mission_numbers"] >= 10,
     s.get("reader_mission_numbers")),
    ("Safeguarding: 1+ outside reviewer of the guest rules",
     None if s.get("outside_reviewers_of_guest_rules") is None else s["outside_reviewers_of_guest_rules"] >= 1,
     s.get("outside_reviewers_of_guest_rules")),
    ("The family: 4+ weekly drills run",
     None if s.get("family_drills_run") is None else s["family_drills_run"] >= 4,
     s.get("family_drills_run")),
]
print("")
print(f"📇 SAW series signal (due {due}, today {today})")
print("---------------------------------------------")
for name, ok, value in checks:
    mark = "➖ not measured" if ok is None else ("✅ pass" if ok else "❌ fail")
    print(f"  {mark} — {name}" + ("" if ok is None else f" ({value})"))
unmeasured = sum(1 for _, ok, _ in checks if ok is None)
passed = sum(1 for _, ok, _ in checks if ok)
print("---------------------------------------------")
if unmeasured and today > due:
    print(f"::error::{unmeasured} number(s) still missing after {due}. A missing result on the date is a result: say so in part 5.")
    sys.exit(1)
if unmeasured:
    print(f"  {passed}/4 passing, {unmeasured} not measured yet. No build until all four pass.")
elif passed == 4:
    print("  4/4. The series earned a build: design the first SAW page behind the same honesty gates.")
else:
    print(f"  {passed}/4. Fix the failing one first; the build waits.")
print("")
PYEOF
