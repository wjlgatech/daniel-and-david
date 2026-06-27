# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
this project aims for [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Initial repository scaffold: an AI-native venture studio + learning academy for raising
  the next generation of wealth creators (Daniel, 11, and David, 6).
- Mission and milestone ladder ($1M → $10M → $100M → $1B → $10B) in `docs/vision/`.
- Operating principles: AI-native company, agentic engineering, and values in `docs/principles/`.
- Two age-appropriate curriculum tracks in `docs/curriculum/`.
- **Venture #1 — KC Matchday Basecamp**: full 16-day launch spec, unit economics, compliance
  gates, partner/marketing systems, and a buildable web-app PRD in `ventures/kc-matchday-basecamp/`.
- Academy landing page (`apps/web/`) — a dependency-free page a child can open in a browser.
- `hello-agent/` — a tiny, readable starter agent as a first "AI teammate."
- Open-source contributor on-ramp: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`,
  issue/PR templates, CODEOWNERS, and a CI workflow, designed for ~100 contributions/day.
- Four kid-friendly, Anthropic-styled SVG infographics in `docs/assets/` embedded in the
  README — the milestone "Climb," the builder's loop, the AI-teammate agent loop, and the
  4-question values test — so a 6- and 11-year-old can grasp each section visually.
- Per-doc infographics (same style) embedded in the source docs: `mission-value-chain.svg`
  (SEE → BUILD → SERVE → EARN → BLESS) in `docs/vision/mission.md`; `ladder.svg` +
  `milestones-games.svg` (each rung's skill and the question it answers) in
  `docs/vision/milestones.md`; `values-non-negotiables.svg` (the 7 non-negotiables) +
  the 4-question test in `docs/principles/values.md`.

### Investigated / Rejected
- **Single-app repo (just the KC web app).** Rejected: the goal is a *durable studio* that
  hosts many ventures over years, plus a teaching layer — a monorepo serves both.
- **Operating venture #1 as stadium-adjacent street vending.** Rejected in the spec itself:
  legally risky (clean-zone / brand-protection / permit exposure). The chosen model is
  venue-partnered, brand-safe local commerce with explicit go/no-go gates.
