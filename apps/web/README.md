# apps/web — The Academy Landing Page

The home page for the Daniel &amp; David academy. Deliberately **dependency-free**: a single
HTML file with inline CSS, so a 6-year-old (or anyone) can open it instantly — no install, no
build, no Node.

## Run it

```bash
open public/index.html        # macOS
xdg-open public/index.html    # Linux
start public/index.html       # Windows
```

That's it. Edit `public/index.html`, refresh the browser, see your change live. It's the
perfect [first build quest](../../docs/curriculum/daniel-age-11/README.md) for Daniel.

## Why no framework (yet)

Per [agentic-engineering](../../docs/principles/agentic-engineering.md): start with the
simplest thing that works. A static page teaches HTML/CSS and lets a kid see instant results.
When the academy genuinely needs a build step (interactivity, many pages), we'll add one —
and document *why* in `CHANGELOG.md`. Not before.

## Good contributions here

- Improve the design (clarity, accessibility, mobile polish).
- Fix copy or add a section linking to new docs/ventures.
- Add a simple, framework-free interactive element (e.g., a milestone progress bar).

Keep it loadable by double-click. If a change needs a build step, discuss it in an issue first.
