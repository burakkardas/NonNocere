# Non Nocere

**Forging the missing link in surgery education.**

Non Nocere is an immersive surgical VR training experience that lets learners
practise procedures safely — without putting patients at risk. This repository
holds the marketing / educational web companion: a curated presentation, a
cinematic intro video, and an interactive knowledge quiz.

> *Primum non nocere* — "First, do no harm."

---

## Live experience

The site is a static, no-build, vanilla-stack web app. Open
[`index.html`](index.html) to launch the home menu:

- **01 — Presentation** ([`presentation.html`](presentation.html)) — slide-based
  visual narrative driven by [`content/presentations/`](content/presentations/).
- **02 — Video** ([`video.html`](video.html)) — cinematic intro served from
  [`content/videos/`](content/videos/).
- **03 — Quiz** ([`quiz.html`](quiz.html)) — interactive multiple-choice test
  generated from [`content/quiz.json`](content/quiz.json).

A floating Meta Quest 3 model ([`assets/models/Model.glb`](assets/models/Model.glb))
anchors the hero. Languages can be switched between **EN / TR / DE** from the
header pill.

---

## Running locally

There is no bundler — any static file server works. Pick one:

```bash
# Python
python3 -m http.server 5173

# Node
npx serve .
```

Then open <http://localhost:5173>.

`file://` will *not* work because the 3D model and JSON content are fetched
over HTTP.

---

## Project structure

```
.
├── index.html              # Home / menu
├── presentation.html       # Slide deck viewer
├── video.html              # Video player
├── quiz.html               # Quiz UI
│
├── css/styles.css          # Global styles
├── js/app.js               # All interactive logic (i18n, 3D, quiz, slides)
├── vendor/three/           # Bundled three.js (no CDN at runtime)
│
├── assets/
│   ├── favicon.png
│   ├── Logo.png
│   └── models/
│       ├── Model.glb       # Hero 3D model
│       └── meta-quest-3/   # Source model + textures (not served)
│
├── content/
│   ├── quiz.json
│   ├── presentations/      # Slide images + manifest.json
│   └── videos/             # MP4 + WebM fallback + manifest.json
│
└── scripts/
    └── scan-content.sh     # Regenerates content manifests
```

### Refreshing content manifests

When you drop new slides into `content/presentations/` or a new video into
`content/videos/`, regenerate the manifests:

```bash
./scripts/scan-content.sh
```

---

## Tech notes

- Pure HTML / CSS / vanilla JS — no framework, no build step.
- 3D rendering via [three.js](https://threejs.org/) (r160), vendored under
  `vendor/three/` so the page works inside embedded Chromium webviews that
  block cross-origin ES module imports.
- Typography: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk).
- Tested on recent Chrome, Safari and Firefox.

---

## License

All rights reserved © Non Nocere. The 3D Meta Quest 3 model under
`assets/models/meta-quest-3/` retains its original author's license — see the
source folder for details.
