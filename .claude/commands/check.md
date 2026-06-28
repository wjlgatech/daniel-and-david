---
name: check
description: Run all of Daniel & David's guardrails (the friendly pre-PR check + the 5 evals) and report what's green or needs fixing.
---

# /check — run every guardrail

Run the repo's full verification harness and report results plainly. If anything fails, read the
failure, fix the named file, and re-run — never fake a green.

```bash
./scripts/check.sh                          # secrets · changelog · status-truth · registration · webapp
bash scripts/check-links.sh                 # all relative doc links resolve
bash scripts/validate-toolkit.sh            # skills/workflows/hooks/plugins parse
bash scripts/check-status-truth.sh          # no overclaiming venture status ("Is it true?")
bash scripts/check-registration-safety.sh   # signup stays adults-only & privacy-safe
bash scripts/check-webapp.sh                # the Builder Loop PWA stays installable & on-device
```

Summarize: which guards are ✅, which ❌ (with the one-line reason), and the single next fix.
These are the same checks CI runs, so green here ≈ green PR.
