# KC Matchday Basecamp — Web App

This directory will hold the web app for venture #1. It is **not built yet** — but it is
**fully specified**, which makes it an ideal contributor target.

## What to build

A mobile-first preorder / pickup / digital-delivery / rental / partner-attribution commerce
app. The complete Product Requirements Document — pages, user flows, data model, Stripe
integration, analytics, legal copy, and acceptance tests — is in
[`../SPEC.md` §6](../SPEC.md#6-website-product-requirements-document).

There is also a **one-shot build prompt** for an AI coding agent in
[`../SPEC.md` §7](../SPEC.md#7-codex--copilot-build-prompt). The fastest path:

1. Read [`../SPEC.md`](../SPEC.md) §6 and §7 end to end.
2. Feed §7's prompt to an AI coding agent (Codex, Claude, Copilot) to scaffold the app *here*.
3. **Edit and verify everything it produces** — you own the result. See the repo's
   [agentic-engineering principles](../../../docs/principles/agentic-engineering.md).
4. Make the [acceptance tests](../SPEC.md#612-acceptance-tests) pass, one flow at a time.

## Recommended stack (from the spec)

Next.js (App Router, TypeScript) · Tailwind + shadcn/ui · Supabase (Postgres, Auth, RLS) ·
Stripe Checkout + webhook · Resend email · Zod · Vitest + Playwright · Vercel-ready.

## Non-negotiable guardrails

- 🚫 No FIFA / World Cup / team / stadium / "official" / "Fan Festival" marks or imagery in
  code, copy, or seed data. Brand is generic + the independent-business disclaimer.
- 🚫 No food, alcohol, tickets, or counterfeit goods in the catalog.
- 🔒 Never put Stripe secret keys in client code. Never commit `.env`. Use `.env.example`.
- 🔒 Never store card details — Stripe handles cards; the app stores references only.
- ♿ Accessible and mobile-first. Checkout must complete on a phone in under 60 seconds.

## Build it in slices

Don't try to ship the whole thing at once. Suggested order (each is a contributable PR):

1. Landing page (`/`) + footer disclaimer + the product catalog (`/shop`), static.
2. Supabase schema + seed data (from §6.8 and the §7 seed list).
3. One checkout flow end-to-end in **mock payment mode** → confirmation page with QR + code.
4. Stripe webhook → mark paid, decrement inventory, send confirmation email.
5. Staff redemption (scan/lookup, idempotent).
6. Partner attribution + `/admin` dashboard.
7. Rentals, media bookings, i18n (EN/ES/FR).

Mark progress in the [venture README's build-status table](../README.md#build-status) as
slices land.

## Status

🟡 **Not started.** PRD complete. This is the single highest-leverage place for an engineer
to contribute to the repo. Claim it in an issue and go.
