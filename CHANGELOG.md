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

- **Critical-thinking (5W1H) capability — for humans *and* agents.** Recreated the classic
  5W1H critical-thinking poster in the repo's Anthropic style (`docs/assets/critical-thinking.svg`,
  all 48 questions) and built a matching toolkit around it:
  - *Human curriculum* in `docs/curriculum/critical-thinking/` — David (6) "Six Detective Words"
    and Daniel (11) applied 5W1H (decisions, media/AI literacy, venture #1).
  - *Agent toolkit* in `.claude/`: a `critical-thinking` **skill**, a `critical-thinking-review`
    **dynamic workflow** (six agents fan out, one per question-word, then synthesize a verdict),
    and a high-stakes-edit **hook** (`hooks/critical-thinking-nudge.sh`).
  - *Installable plugin* in `tools/critical-thinking-plugin/` (command + skill + hook), listed
    in a new repo `.claude-plugin/marketplace.json`.
  - `.claude/README.md` documents the five ways to extend an AI teammate (skill / command / hook
    / workflow / plugin) as a teaching artifact.
- **CI now validates the agent toolkit.** New `scripts/validate-toolkit.sh` (run locally too) and
  a `toolkit-validate` CI job check that every plugin/marketplace/hooks JSON parses, every
  `.claude/workflows/*.js` passes `node --check`, every `SKILL.md`/command has valid frontmatter,
  hook scripts pass `bash -n`, and plugin `hooks.json` references resolve — so a malformed
  toolkit artifact can't merge.
- **CI now checks Markdown links.** New `scripts/check-links.sh` walks every tracked `.md`,
  resolves all relative links and image embeds, and fails on any dead target (skips external
  URLs and `#` anchors) — so a renamed file or moved infographic can't silently break the docs.

- **Storytelling + hub repositioning.** Added a long-form, kid-simple-but-expert-deep article
  (`docs/marketing/the-daniel-and-david-story.md`) with one infographic per section and every main
  claim cited to a seminal study *or* scripture; ready-to-post LinkedIn posts
  (`docs/marketing/linkedin-posts.md`); a Hub guide (`docs/community/hub.md`) framing the project as
  three hubs (living learning · agent tools · AI+people collaboration-matching) with a lightweight
  on-GitHub matching flow; an **💡 Idea / 🤝 Collaboration** issue template; and a README "What
  this is becoming: a hub" section.

### Investigated / Rejected
- **Single-app repo (just the KC web app).** Rejected: the goal is a *durable studio* that
  hosts many ventures over years, plus a teaching layer — a monorepo serves both.
- **Operating venture #1 as stadium-adjacent street vending.** Rejected in the spec itself:
  legally risky (clean-zone / brand-protection / permit exposure). The chosen model is
  venue-partnered, brand-safe local commerce with explicit go/no-go gates.
