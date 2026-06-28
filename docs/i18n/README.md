# Languages / 多语言 / Idiomas / 다국어 / 多言語

The **[landing page](https://wjlgatech.github.io/daniel-and-david/)** and its application form are
available in five languages — switch with the **🌐 selector** at the top right:

**English · 中文 · Español · 한국어 · 日本語**

Your choice is remembered on your device, and the page auto-selects your browser's language on
first visit.

> **English is the source of truth.** The other languages are **AI-assisted translations** — good
> enough to understand and apply in your language, but **corrections from native speakers are very
> welcome** (open an issue or PR). The child-safety, legal, and faith wording especially benefits
> from a human review.

---

## How translations stay in sync (the automatic part)

When the English copy changes, the other language tags **must** change with it — this is
**enforced**, not left to memory:

- Every translatable string on the landing page is marked `data-i18n="key"`, and each non-English
  language has that key in the `I18N` dictionary (in `apps/web/public/index.html`).
- **`scripts/check-i18n.sh`** (run in CI, in `./scripts/check.sh`, and in `./scripts/setup.sh`)
  **fails the build** if *any* key is missing in *any* language, or flags stale keys no longer on
  the page. So the moment someone adds or edits an English string, the build stays red until all
  five language tags are updated.

That guarantee — *no English change ships without all languages in step* — is the dependable,
zero-cost version of "auto-update across all language tags."

### To add or fix a translation
1. Edit the `I18N` dictionary in `apps/web/public/index.html` (find the string's `key`).
2. Run `bash scripts/check-i18n.sh` — it tells you exactly which keys/languages are missing.
3. Open a small PR. CI re-checks sync.

### To add a new language
Add an `<option>` to the `<select id="lang">`, add a matching block to `I18N`, and run the check.

---

## Optional: fully-automatic re-translation (opt-in, already wired)

The check above keeps languages **in sync by gating**. If you also want the machine to **draft the
missing translations for you** whenever English changes, that's wired and ready — just **off until
you add a key**:

- **`scripts/i18n-translate.py`** — finds keys present on the page but missing from a language,
  asks an OpenAI-compatible LLM to translate *only those* (never overwriting existing/human-edited
  translations, never touching English), and writes them back into `index.html`.
  - `python3 scripts/i18n-translate.py --list` — show what's missing (no network).
  - `python3 scripts/i18n-translate.py --translate` — fill it (needs the key; no-ops without).
- **`.github/workflows/i18n-translate.yml`** — runs the above automatically when
  `apps/web/public/index.html` changes on `main` (and on manual dispatch), then **opens a review
  PR** with the drafted translations.

**To turn it on:** add a repo **secret `I18N_LLM_KEY`** (an OpenAI-compatible key — e.g. the free
[NVIDIA NIM](https://build.nvidia.com) tier). Optional repo **variables**: `I18N_LLM_BASE_URL`
(default `https://integrate.api.nvidia.com/v1`) and `I18N_LLM_MODEL`. Without the secret it stays
inert and harmless.

> Whatever drafts a translation — a person or a model — the rule holds: **English is canonical, the
> machine drafts are always reviewed in a PR, and `check-i18n.sh` must be green before merge.**
