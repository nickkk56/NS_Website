# NS_Website

Personal portfolio website for **Nikita Skrebnyov — Architect & BIM Specialist**. It showcases professional experience, selected architectural/BIM work, and a (still-in-development) toolkit page.

## Project Type

A **static, multi-page website**. There is no build step, no framework, and no package manager (`package.json` / `node_modules` are absent). It is plain HTML + CSS + vanilla JavaScript, hand-structured and opened directly in a browser.

## Project Structure

```
NS_Website/
├── index.html        # Home — hero, CTA cards, Core Skills, Education, footer
├── work.html         # Work — project grid, image modal, Experience timeline
├── NStoolkit.html    # NS.Toolkit — placeholder ("Currently in Development")
├── css/
│   └── style.css     # Single shared stylesheet (design system + all components)
├── js/
│   └── main.js       # Shared behavior: cursor, scroll-reveal, delayed nav, modal
├── assets/
│   ├── 1.webp        # CTA card background — "Selected Works"
│   ├── 2.webp        # CTA card background — "NS.Toolkit"
│   ├── p1/ … p6/     # One folder per project; each holds 00–04.webp (cover + gallery)
└── .idea/            # WebStorm project config (not needed to run)
```

- **Pages:** three top-level `.html` files, each self-contained (`<head>` links the shared `css/style.css` and `js/main.js`).
- **Assets:** every project has its image gallery in `assets/p<#>/`. `00.webp` is always the card thumbnail; `01–04.webp` are the modal/zoomable images.
- **Shared files:** exactly one CSS file, one JS file — all behavior is shared and guarded per page (see "Key Features").

## Running / Viewing

There is no build, lint, or test toolchain. To view the site:

1. Open `index.html` in a browser, **or**
2. Serve the folder so relative links/refresh work cleanly:
   ```bash
   # any static server from this directory, e.g.:
   python -m http.server 8000
   # then open http://localhost:8000
   ```

To add a new project, duplicate an existing `assets/p*` folder and a `<div class="work-card">` block in `work.html` (see "Development Conventions").

## Pages & Content

| File | Nav label | Purpose |
|------|-----------|---------|
| `index.html` | **Home** | Hero intro ("Architect. BIM Specialist. Tool Developer."), two CTA cards (Work / Toolkit), **Core Skills** grid (Architecture, Computation, BIM, Visualization), **Education** (BSc. Architecture, Bahcesehir University). |
| `work.html` | **Work** | **Selected Works** grid (6 project cards) that open an image modal with prev/next navigation, plus a **Professional Experience** timeline (DBHorizon, NTT MIMARLIK, various internships). |
| `NStoolkit.html` | **NS.Toolkit** | Hero only — currently just "[Currently in Development]". |

## Key Features (where they live)

All interactive behavior is in `js/main.js`, all styling in `css/style.css`. Features are written to be **safe when a page doesn't include them** (guarded by `if (element)`), so one shared script serves all three pages:

- **Custom cursor** (`.cursor-outline`) — a ring that follows the mouse on `fine`-pointer devices only; disabled on touch (`pointer: coarse`) and reduced-motion.
- **Scroll-reveal** — `IntersectionObserver` adds `.active` to any `.reveal` element at 15% visibility.
- **Delayed navigation** — `.btn` / `.cta-card` clicks wait 200ms (with an `is-pressed` state) before following the `href`, so hover animations can play.
- **Project modal** (only on `work.html`) — reads `data-*` attributes from each `.work-card` (title, category, description, stack, comma-separated image list); supports prev/next image cycling, Escape-to-close, backdrop-click-to-close, and a **keyboard focus trap** for accessibility.
- **Glassmorphism header** — fixed, semi-transparent, `backdrop-filter: blur`.

## Design System (CSS Variables)

Defined in `:root` at the top of `css/style.css`. Use these — do not hard-code raw values.

| Variable | Value | Meaning |
|----------|-------|---------|
| `--bg-color` | `#0a0a0a` | Page background (near-black) |
| `--surface-color` | `#161616` | Cards, header surface |
| `--text-main` | `#f5f5f5` | Primary text |
| `--text-secondary` | `#a0a0a0` | Secondary text / body copy |
| `--accent-color` | `#E8792F` | Orange accent (links, labels, dots, buttons) |
| `--accent-soft` | `rgba(232,121,47,0.1)` | Soft accent fill |
| `--container-width` | `1200px` | Max content width |
| `--section-padding` | `100px 0` | Vertical section spacing (60px on mobile) |
| `--border-radius` | `8px` | Shared corner radius |
| `--transition-fast` / `--transition-smooth` | `0.2s ease` / `0.5s cubic-bezier(...)` | Motion durations |

Aesthetic: **dark, minimal, architectural**. Font is **Inter** (Google Fonts), loaded in each page `<head>`. Headings are **uppercase** with tight letter-spacing; body text is light-weight. The stylesheet is organized into numbered section blocks (1. Variables → … → 8. Accessibility).

## Development Conventions

- **No build step.** Edits are live — save and refresh the browser.
- **Shared, guarded JS.** Every feature references elements that may not exist on a given page; keep new features guarded the same way (e.g., `const el = document.getElementById(...); if (el) { ... }`) so the single `main.js` keeps working across all pages.
- **CSS via variables.** Reference design tokens from `:root` rather than literal hex/px values. Add new component styles to `css/style.css`, following the existing section structure and comments.
- **Adding a project card** (`work.html`):
  1. Create `assets/pN/` with `00.webp` (thumbnail) + `01–04.webp` (gallery).
  2. Copy an existing `<div class="work-card" tabindex="0" role="button" ...>` and set its `data-title`, `data-category`, `data-description`, `data-stack`, and `data-images` (comma-separated, in order) to the new folder's files.
  3. Ensure the thumbnail `<img src>` points at `00.webp`.
- **Accessibility matters here.** Preserve `:focus-visible` styling, `role`/`aria-*` on the modal, keyboard handling (Enter/Space to open, Esc/Tab inside modal), and the `prefers-reduced-motion` block.
- **Responsive breakpoints:** mobile is `max-width: 768px`; touch handling uses `pointer: coarse/fine` media queries. Follow these when adding UI.

## Known Placeholders / TODO

- **Email in footer** (`index.html`) is still `mailto:your-email@example.com` — replace with the real address.
- **LinkedIn** links in every footer point to `#` — fill in the profile URL.
- **`NStoolkit.html`** is a stub ("Currently in Development"); the real toolkit content is not yet built.
- Phone/WhatsApp (`+90 544 196 0605`) is consistent across pages — keep it in sync if it changes.

## Quick Reference (file → responsibility)

| Need to change… | Edit |
|-----------------|------|
| Colors / spacing / fonts | `css/style.css` (`:root` block & typography) |
| Navigation / hero / skills | the relevant `.html` page (`index.html` for Home) |
| A project's images or blurb | its `assets/p<#>/` folder + that card's `data-*` in `work.html` |
| Job history | `work.html` (Experience timeline section) |
| Cursor / modal / animation behavior | `js/main.js` |
| Contact links | footer in each `.html` page |
