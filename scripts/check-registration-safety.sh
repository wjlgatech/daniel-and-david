#!/usr/bin/env bash
# Registration-safety check — guards the founding-cohort application form.
#
# Children are involved, so the signup must stay ADULTS-ONLY and privacy-safe. This turns that
# promise into an eval: if the landing page has an application form, it MUST keep the honeypot,
# the consent checkbox, the adults-only notice, and a privacy link — and MUST NOT collect a
# child's name. See docs/safety/ and docs/founding-families.md.
#
# Self-disables if there is no application form yet.
# Usage: ./scripts/check-registration-safety.sh
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

PAGE="apps/web/public/index.html"
PRIVACY="apps/web/public/privacy.html"
fail=0

echo ""
echo "🛡️  Registration-safety check (adults-only, privacy-safe signup)"
echo "----------------------------------------------------------------"

if [ ! -f "$PAGE" ]; then
  echo "  ⚠️  $PAGE not found — skipping."; echo ""; exit 0
fi

# Only enforce when an application form actually exists.
if ! grep -q 'id="apply-form"' "$PAGE"; then
  echo "  ✅ No application form present — nothing to guard yet."; echo ""; exit 0
fi

need() { # need "<grep pattern>" "<human description>"
  if grep -qi "$1" "$PAGE"; then echo "  ✅ $2"; else echo "  ❌ MISSING: $2"; fail=1; fi
}

need 'name="_gotcha"'                 "honeypot field (spam trap)"
need 'name="consent"'                 "consent checkbox"
need 'required'                       "a required field (consent/name must be required)"
need 'guardians'                      "adults-only notice (parents/guardians/educators)"
need '18'                             "age affirmation (18+)"
need 'privacy.html'                   "link to the privacy notice"

# Must NOT collect a child's identity.
if grep -qiE 'name="(child_name|child_first|kid_name|child_fullname)"' "$PAGE"; then
  echo "  ❌ FORBIDDEN: a child-name field is present — never collect a child's identity."
  fail=1
else
  echo "  ✅ No child-identity field (no child name collected)."
fi

# The privacy notice the form links to must exist.
if [ -f "$PRIVACY" ]; then echo "  ✅ Privacy notice page exists ($PRIVACY)."; else echo "  ❌ MISSING: $PRIVACY (form links to it)."; fail=1; fi

echo "----------------------------------------------------------------"
if [ "$fail" -ne 0 ]; then
  echo "::error::The signup form is missing a child-safety guardrail. See docs/safety/ + docs/founding-families.md."
  echo ""
  exit 1
fi
echo "🎉 Signup is adults-only and privacy-safe."
echo ""
exit 0
