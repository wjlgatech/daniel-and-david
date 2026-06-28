#!/usr/bin/env python3
"""Auto-fill MISSING landing-page translations from the English source (opt-in).

English is the ground truth (the in-HTML default). This script finds keys that exist in the page
(data-i18n / data-i18n-ph) but are MISSING from a language's I18N block, asks an OpenAI-compatible
LLM to translate just those, and writes them into apps/web/public/index.html. It NEVER overwrites
an existing translation (human corrections win) and NEVER touches English.

Modes:
  --list        Show what's missing per language (no network, no writes). Good for CI/testing.
  --translate   Fill the missing keys via the LLM and write them back.

LLM config (env), OpenAI-compatible (e.g. NVIDIA NIM free tier — see docs/i18n/README.md):
  I18N_LLM_BASE_URL   default https://integrate.api.nvidia.com/v1
  I18N_LLM_KEY        required for --translate (a repo secret); if unset, the script no-ops.
  I18N_LLM_MODEL      default meta/llama-3.1-70b-instruct
"""
import sys, os, re, json, html.parser, urllib.request

PAGE = os.path.join(os.path.dirname(__file__), "..", "apps", "web", "public", "index.html")
LANG_NAMES = {"zh": "Simplified Chinese", "es": "Spanish", "ko": "Korean", "ja": "Japanese"}


class Extractor(html.parser.HTMLParser):
    """Capture inner HTML for [data-i18n] elements and placeholders for [data-i18n-ph]."""
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.src, self.ph, self.stack = {}, {}, []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "data-i18n-ph" in a and a.get("placeholder") is not None:
            self.ph[a["data-i18n-ph"]] = a["placeholder"]
        if self.stack:
            self.stack[-1][2].append(self.get_starttag_text())
        self.stack.append([tag, a.get("data-i18n"), []])

    def handle_startendtag(self, tag, attrs):
        if self.stack:
            self.stack[-1][2].append(self.get_starttag_text())

    def handle_data(self, d):
        if self.stack:
            self.stack[-1][2].append(d)

    def handle_entityref(self, n):
        if self.stack: self.stack[-1][2].append("&%s;" % n)

    def handle_charref(self, n):
        if self.stack: self.stack[-1][2].append("&#%s;" % n)

    def handle_endtag(self, tag):
        if not self.stack:
            return
        t, key, buf = self.stack.pop()
        inner = "".join(buf).strip()
        if key is not None:
            self.src[key] = inner
        if self.stack:
            self.stack[-1][2].append(inner)
            self.stack[-1][2].append("</%s>" % tag)


def load():
    html_text = open(PAGE, encoding="utf-8").read()
    ex = Extractor(); ex.feed(html_text)
    src = dict(ex.src)
    for k, v in ex.ph.items():
        src[k] = v  # placeholders are plain text
    # languages from the selector, minus English
    sel = re.search(r'<select id="lang".*?</select>', html_text, re.S)
    langs = [c for c in re.findall(r'<option value="([a-z]{2})"', sel.group(0)) if c != "en"]
    # existing keys per language block
    body = re.search(r"const I18N\s*=\s*\{(.*)\n    \};", html_text, re.S).group(1)
    marks = [(m.group(1), m.start()) for m in re.finditer(r"\n      ([a-z]{2}):\s*\{", body)]
    have = {}
    for i, (lang, start) in enumerate(marks):
        end = marks[i + 1][1] if i + 1 < len(marks) else len(body)
        have[lang] = set(re.findall(r'"([A-Za-z0-9_.]+)"\s*:', body[start:end]))
    return html_text, src, langs, have


def llm_translate(text, lang_name):
    base = os.environ.get("I18N_LLM_BASE_URL", "https://integrate.api.nvidia.com/v1").rstrip("/")
    key = os.environ["I18N_LLM_KEY"]
    model = os.environ.get("I18N_LLM_MODEL", "meta/llama-3.1-70b-instruct")
    prompt = (
        f"Translate the following snippet from English to {lang_name}. It may contain HTML tags, "
        f"attributes, and URLs — keep ALL of them exactly as-is and translate ONLY the human-readable "
        f"text. Keep it natural and warm. Return ONLY the translation, no quotes or notes.\n\n{text}"
    )
    payload = json.dumps({"model": model, "temperature": 0.2,
                          "messages": [{"role": "user", "content": prompt}]}).encode()
    req = urllib.request.Request(base + "/chat/completions", data=payload,
                                 headers={"Authorization": "Bearer " + key,
                                          "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read())["choices"][0]["message"]["content"].strip()


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "--list"
    html_text, src, langs, have = load()
    missing = {l: sorted(set(src) - have.get(l, set())) for l in langs}
    total = sum(len(v) for v in missing.values())

    if mode == "--list" or total == 0:
        for l in langs:
            print(f"  {l}: {len(missing[l])} missing" + (": " + ", ".join(missing[l]) if missing[l] else " — in sync ✅"))
        print(f"\nTotal missing: {total}")
        return 0

    if not os.environ.get("I18N_LLM_KEY"):
        print("I18N_LLM_KEY not set — nothing to do. (Add the secret to enable auto-translation.)")
        print(f"({total} keys would be translated.)")
        return 0

    for l in langs:
        if not missing[l]:
            continue
        lines = []
        for k in missing[l]:
            try:
                t = llm_translate(src[k], LANG_NAMES.get(l, l)).replace("\\", "\\\\").replace('"', '\\"')
            except Exception as e:
                print(f"  ! {l}/{k}: {e}"); continue
            lines.append(f'        "{k}": "{t}",')
            print(f"  ✓ {l}/{k}")
        if lines:
            block = "\n".join(lines) + "\n"
            html_text = re.sub(r"(\n      %s:\s*\{\n)" % l, r"\1" + block, html_text, count=1)
    open(PAGE, "w", encoding="utf-8").write(html_text)
    print(f"\nWrote {total} translation(s). Run scripts/check-i18n.sh to verify, then review the diff.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
