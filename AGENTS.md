# AGENTS.md

Project instructions for AI coding agents working in this repository.

## Project
Static multi-page marketing site for **Integrated Engineering Solutions (IES)**, a Siliguri-based MEPF consulting firm. Mirrors branding of `iesslg.in` (gold/white/charcoal theme).

- Path: `C:\Users\rajesh\Desktop\Projects\IESProject\ies-website`
- Not a git repo.

## Structure
- `index.html` — Home (hero + glass stats, lead magnet, about, services, industries, value props, projects, gallery strip, CTA)
- `about.html`, `services.html`, `projects.html`, `gallery.html`, `contact.html` — inner pages, each: `page-header`, content sections, `cta`
- `assets/css/style.css` — single stylesheet (~2690 lines) for all pages
- `assets/js/main.js` — single script, all pages
- `assets/images/*` — all real images (no placeholders)
- `IES Brochure 07 2026 (1).pdf` — reference brochure (read-only)

## Design Tokens (style.css:7-18)
- `--primary: #f7c02d` (gold), `--primary-dark: #dba814`, `--primary-soft: #fdf3d1`
- `--heading: #393939`, `--text: #5a5a5a`, `--muted: #848484`
- `--light-bg: #f7f7f7`, `--border: #e6e6e6`, footer `#252525`
- Font `'Inter'`.

## Conventions
- Do NOT add comments unless asked. Never use emojis.
- Keep colors in `:root` tokens. Use real file paths for images. No lorem/placeholder.

## Verification
- After editing CSS: brace count balanced (PowerShell count of `{` vs `}`; known-good 390/390).
- After editing JS: `node --check assets/js/main.js`.
- Headless render check: `msedge.exe --headless --dump-dom --virtual-time-budget=9000 "file:///C:/Users/rajesh/Desktop/Projects/IESProject/ies-website/index.html"` (the agent model cannot read screenshots — use the DOM dump).

## Key Behaviours
- `main.js` is all guarded by existence checks (no errors when elements absent on inner pages).
- Filter buttons select `.project-card, .gallery-item`, toggling `display` by `data-filter`/`data-category`.
- Scroll reveal: `.reveal` / `.el-stagger` get `.in-view` via IntersectionObserver (threshold 0.12); `cardIn` animation uses `backwards` fill-mode (so hover works).
- Animated counters: `.count[data-count]`; respects `prefers-reduced-motion`.
- `#back-to-top` present on all 6 pages; shows after scrollY > 400.
- `prefers-reduced-motion` block disables ken-burns, hero floats, reveals.

## Current Known Issues
1. **Testimonials section was removed** from `index.html` on request. Dead CSS/JS remains:
   - `.testimonials*` rules in style.css (~lines 1656-1824)
   - testimonial slider JS in main.js (~lines 134-202)
   - reduced-motion refs
   → Remove dead code if section stays removed. If re-added later, note the old slider was buggy.
2. Do not assume the testimonials slider is live — it was removed.

## Status / Open Actions
- Clean up dead testimonials CSS/JS.
- Browser QA on real hardware.
- Optional: init a git repo (none currently).