# Research — kids/family app UX + offline PWA

*Synthesis behind the [Builder Loop app](../../apps/web/public/app.html) + demos. Reuse before re-researching kid UX / PWA.*

## Key findings
- **Kid UX** — **one thing per screen** (Duolingo/Khan Kids); bite-sized (3–5 min → +50% completion); **exaggerated instant reward**; big labeled tap targets (≥48px, prefer 56px for ages 6); per-step **color coding** for pre-readers; warm second-person present-tense microcopy; a friendly static mascot cuts cognitive load.
- **Ethics (the line)** — **celebrate showing up, never punish absence** (Finch > Duolingo streak-guilt). Avoid the documented kids'-app dark patterns: emotional manipulation, reward-disguised-as-ad, notification guilt. No push, no ads, no IAP.
- **Wizard/flow** — show **nested progress** but never both levels at once: step-dots within a cycle on the action screen, the journey ring only on the dashboard. NN/g: self-contained steps, explicit Back, **auto-save & resume**, reuse prior inputs.
- **PWA (static host)** — installable needs **manifest** (name/start_url/display/512-icon) + a **cache-first service worker** (app shell) + icons; `beforeinstallprompt` on Android/Chrome, an "Add to Home Screen" hint on iOS; bump SW cache version per deploy. **localStorage** for text (<5–10MB); **IndexedDB** only for binary (photos).
- **Child privacy by design** — on-device only; **no third-party `<script src>`** (each is a fingerprinting call); no `fetch` of user data; parent-sets-up / kid-uses split; export/print your own data; **LLM-optional**, and any LLM use is **parent-facing**. COPPA-clean = no operator-side collection.

## Sources
NN/g (wizards); MDN (PWA install, CycleTracker SW); web.dev (offline data); Duolingo / Khan Kids / **Finch** / Habitica patterns; arXiv 2512.17819 (deceptive designs in children's apps); WCAG 2.5.5; Lexend/dyslexia; FTC COPPA 2025.
