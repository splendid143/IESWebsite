# IES Website — Handoff Document

## Project
Static multi-page marketing site for **Integrated Engineering Solutions (IES)**, a Siliguri-based MEPF consulting firm. Mirrors branding of `iesslg.in` (gold/white/charcoal theme).

**Path:** `C:\Users\rajesh\Desktop\Projects\IESProject\ies-website`
**Not a git repo.**

## File Map
| File | Purpose |
|---|---|
| `index.html` | Home: hero + glass stats, lead magnet, about, services, industries, value prop, projects, gallery strip, CTA |
| `about.html` | About, value prop, stats, expertise, approach, CTA |
| `services.html` | Page header, intro, detailed services, CTA |
| `projects.html` | Page header, filter + project cards (data-category), stats, CTA |
| `gallery.html` | Page header, filter buttons, image grid (data-category), CTA |
| `contact.html` | Page header, contact form, locations, working hours, CTA |
| `assets/css/style.css` | Single stylesheet, ~2690 lines, all pages |
| `assets/js/main.js` | Single script, 253 lines, all pages |
| `assets/images/*` | hero.jpg, logo.jpg, service/gallery/project images (no placeholders needed) |
| `IES Brochure 07 2026 (1).pdf` | Reference brochure (read-only, design/data source) |

## Design Tokens (style.css:7-18)
- `--primary: #f7c02d` (gold), `--primary-dark: #dba814`, `--primary-soft: #fdf3d1`
- `--heading: #393939`, `--text: #5a5a5a`, `--muted: #848484`
- `--light-bg: #f7f7f7`, `--border: #e6e6e6`, footer `#252525`
- Font: `'Inter'`, body `#fff` background.

## Key JS Behaviours (assets/js/main.js - all guarded by existence checks, no errors on pages where elements are absent)
- **Mobile menu toggle** (`.main-nav`, `.mobile-menu-btn`) with hamburger-to-X.
- **Filter buttons** — selects `.project-card, .gallery-item`; toggles `display` by `data-filter` vs `data-category`. Works on both projects.html and gallery.html.
- **Smooth scroll** for `a[href^="#"]` with 80px header offset; ignores `#`.
- **Animated counters** — `.count[data-count]`, eased, respects `prefers-reduced-motion` (jumps straight to target).
- **Single IntersectionObserver** for `.reveal` and `.el-stagger` (threshold 0.12) -> adds `.in-view`. Fallback for non-IO browsers: reveals all + sets counters.
- **Lead-magnet form** (`#lead-form` on index) — blocks submit if email blank, focuses input.
- **Back-to-top** (`#back-to-top`) — shows after scrollY > 400, smooth-scrolls to top. Present on all 6 pages.
- **Header scroll styles** — shadow/bg swap + scroll-up/down class tracking.
- **Testimonials slider JS** — DEAD LEGACY CODE, unused (section removed — see Open Issues). Harmless; tree-shake later.

## CSS Highlights / Recent Work
- **Scroll reveal:** `.reveal { opacity:0; translateY(28px) }` → `.in-view` reveals.
- **Stagger grids:** `.el-stagger > *` hold `opacity:0`; `.in-view > *` runs `cardIn 0.65s ease backwards` with `--i` delay (nth-child 1-8). **Intentionally `backwards`** fill-mode so hover transforms work after animation.
- **Hero:** ken-burns bg, gradient overlay, image float (`herofloat`, `herofloat2` for badges), floating badges (100+ Projects, ISO 9001), scroll-cue at `bottom:190px` (above stats strip; hidden on reduced-motion and <=480px), glass stat cards with gold top hairline.
- **Buttons:** `.btn-primary` gradient wash + `::after` shine sweep on hover.
- **Cards:** hover lift `translateY(-8px)`, gold top hairline on project cards, image zoom on hover, gold ring icons.
- **Section titles:** gold gradient underbar + offset.
- **CTAs:** radial gold glow `::before`.
- **Back-to-top:** gold circle, shows on scroll.
- **`prefers-reduced-motion` block:** disables ken-burns, hero floats, reveal, syncs counters.

## Current Open Issues / Recent Changes
1. **Testimonials section REMOVED** from `index.html` (What Our Clients Say) — requested removal. **Dead CSS/JS remain:** `.testimonials*` rules in style.css (lines ~1656-1824) and testimonial slider JS in main.js (lines ~134-202) + reduced-motion refs. **TODO: clean up dead CSS/JS** if section stays removed.
2. Legacy note: the slider was reported "still broken" and was then **removed** rather than debugged further — do not assume it's live.

## Verification Commands (run after edits)
- CSS braces balanced: PowerShell count of `{` vs `}` (last known 390/390).
- `node --check assets/js/main.js`
- Optional headless render: `msedge.exe --headless --dump-dom --virtual-time-budget=9000 "file:///.../index.html"` (the model in the last session could not read screenshots; use DOM dump instead).

## Conventions / Notes
- No comments added to files unless explicitly asked. Emojis never used.
- `#about` on index.html is a `reveal` section used only as a scroll target from the hero cue. `a[href^="#"]` includes social `href="#"` links — guarded.
- Keep colors in `:root` tokens; images referenced by real file paths; **no lorem/placeholder** — real content.

## Actions for future chats
- Remove leftover testimonial CSS/JS if it stays removed.
- Filter "What Our Clients Say" may be re-added later as a carousel (keep in mind the old implementation was buggy).
- Browser QA on real hardware.
- Push to a git repo (currently none) if desired.