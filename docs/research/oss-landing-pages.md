# Research — OSS landing pages + honest scarcity

*Synthesis behind the [landing page](../../apps/web/public/index.html) + [the Halving](../founding-families.md). Reuse before re-researching landing/launch/waitlist.*

## Key findings
- **Above-the-fold formula** — specific-promise headline (not "unlock the power of…"); subhead = who it's for + the one differentiator; **proof anchor** (logos or one hard number) *before* features; **one verb+specific CTA** ("Install Bun…", not "Get Started"); a secondary docs/repo link. Examples: Bun (install line + benchmark), PostHog (transparency + free stat), Linear (confident minimalism).
- **Anti-patterns (AI-slop tells)** — 3D gradient blobs, "powerful/scalable/robust" with no numbers, "Book a Demo" as primary CTA, social proof with no names, scroll-jacking, buried docs.
- **Authentic scarcity** — caps that are **actually enforced** + applicants actually turned away (Superhuman screened 180k→3k; Clubhouse structural invites; On Deck fixed cohorts; Monzo golden-ticket). **Application > email** (commitment device). Ethical line: real caps vs. dark-pattern fake-urgency — *test: would you turn someone away?* For a kids/family/faith brand, rank by honesty: application + fixed public cap + named "founding" identity + transparent rationale ("small on purpose").
- **Static-site email capture** — no backend → a form provider via one swappable endpoint: **Formspree** (pure `action=`, `_gotcha` honeypot, DPA) or **Tally** (EU residency, iframe). Always: honeypot + required consent + adults-only (COPPA) + privacy link.
- **Two-layer IA** — families (no-code, plain links) vs. builders (toolkit) — don't make a parent walk through the control room.

## Sources
daily.dev (dev landing formula); Bun / PostHog / Linear (live exemplars); Waitlister case studies (Superhuman, Clubhouse, Monzo, Notion, Robinhood); On Deck / Deep Springs (cohorts); CSS-Tricks (static form providers); Tally GDPR; Formspree honeypot; FTC COPPA.
