# NS Website — Agent Instructions

Static portfolio website. No build step, no package manager, no framework.

## Structure
- `index.html` — Home page
- `work.html` — Projects grid + modal + work experience timeline
- `NStoolkit.html` — Revit plugin landing page (has inline `<style>` block in `<head>`)
- `css/style.css` — Shared design system (CSS variables, reset, components)
- `js/main.js` — Custom cursor, scroll reveal, modal, delayed link clicks
- `assets/p1/`…`assets/p6/` — Per-project image folders (00.webp is the cover)
- `assets/1.webp`, `assets/2.webp` — CTA card background images on home

## Previewing
No build required. Serve the directory with any static server:
```bash
python3 -m http.server 8080
```

## work.html — adding a project
Each project card is a `<div class="work-card">` with these data attributes:
- `data-title` — Project name shown in modal
- `data-category` — Location label (accent color)
- `data-description` — Long description shown in modal
- `data-images` — Comma-separated image paths for modal carousel
- `data-stack` — Responsibilities line shown in modal footer

Card markup pattern:
```html
<div class="work-card" tabindex="0" role="button"
     data-title="..." data-category="..." data-description="..."
     data-images="assets/pN/00.webp,assets/pN/01.webp,..."
     data-stack="...">
    <div class="card-img-wrapper">
        <img src="assets/pN/00.webp" alt="...">
    </div>
    <div class="card-info">
        <span class="card-category">...</span>
        <h3>...</h3>
    </div>
</div>
```

## Conventions
- All pages share the same header nav — update `class="active"` on the current page's link
- All pages include `css/style.css` and `js/main.js`
- Google Fonts (Inter) loaded via `<link>` in each page's `<head>`
- Modal logic in `js/main.js` is guarded — pages without a modal don't break
- Custom cursor is hidden on touch devices via `@media (pointer: coarse)`
- Use `.reveal` class for scroll-triggered fade-in animations
