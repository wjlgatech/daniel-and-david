# packages

Shared code that more than one venture or app uses lives here — utilities, types, UI
components, design tokens.

It's **empty on purpose.** Per [agentic-engineering](../docs/principles/agentic-engineering.md),
we don't build shared abstractions before we have two real things that need them. The moment
a second venture wants the same code as venture #1 (say, a QR-code helper or a money/margin
utility), we lift it here — and document why in `CHANGELOG.md`.

> Rule of thumb: copy once, extract on the third use. Premature sharing creates coupling that
> slows everyone down.
