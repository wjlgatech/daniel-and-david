# Privacy by Design

The safest data is the data you never collect. This project's default is **minimal collection,
minimal retention, minimal exposure** — especially for anything that could identify a child.

## Defaults

- **Collect as little as possible.** If a feature doesn't strictly need a piece of personal
  data, it doesn't ask for it.
- **No child personal data in the repo.** No real full names of minors beyond Daniel and David
  (the family's own choice), no faces tied to identity, no addresses, no schools, no schedules.
  Use first names, aliases, or project names.
- **Public by default means reviewed.** Anything a child produces is reviewed before it becomes
  public — see [community-moderation](community-moderation.md).
- **No secrets, ever.** No credentials, tokens, card data, or `.env` files in the repo. Venture
  payments go through Stripe and **never store cards** — see the
  [venture guardrails](../../ventures/kc-matchday-basecamp/SPEC.md).

## What we do collect (and why)

| Data | Why it's needed | How it's protected |
|---|---|---|
| A child's first name / alias | To attribute their work kindly | Alias preferred; no full identity |
| A parent's consent record | To confirm participation is approved | Held by a maintainer, not public — see [parent-consent](parent-consent.md) |
| Public contributions (text, drawings, code) | They *are* the open work | Reviewed before publishing |

## AI and data

No AI teammate may **collect, retain, or expose** a child's personal data by default. An agent
that processes a contribution works on the *content*, not the child's identity. See
[ai-use-boundaries](ai-use-boundaries.md).

## The Founding Families application (adults only)

The [founding-cohort application](../founding-families.md) is the one place we collect contact
data — and it is **for parents, guardians, and educators (18+) only.** It collects an adult's
first name/alias, email, city/region, the children's **age range** (a range only — never names or
birthdates), and one short answer. **No child personal data, ever.** It carries a honeypot, a
required consent checkbox, and links to a plain-language
[privacy notice](../../apps/web/public/privacy.html). The form posts through a single swappable
endpoint (provider chosen at go-live), and `scripts/check-registration-safety.sh` fails the build
if any of those guardrails go missing. Accepted families appear in
[`FOUNDERS.md`](../../FOUNDERS.md) **by alias, with consent.**

## Right to remove

A parent or guardian can ask to remove a child's contribution at any time, for any reason, with
no questions asked. Follow [`SECURITY.md`](../../SECURITY.md) to reach a maintainer.
