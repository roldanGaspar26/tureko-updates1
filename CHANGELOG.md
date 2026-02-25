# Tureko — UI Redesign Changelog

> **Date:** February 26, 2026  
> **Scope:** Frontend UI redesign — visual styling, layout, and micro-interactions only  
> **Impact:** No backend, routing, form logic, or database changes  

---

## Summary

Complete visual overhaul of all four pages (Home, Services, Quote, Careers) with a modern, premium aesthetic. The redesign introduces a dark-themed hero, glassmorphism navbar, bento grid layouts, animated gradient orbs, a scrolling trust marquee, and refined typography — all while preserving existing EJS content, Express routes, and form functionality.

---

## Files Modified

### 1. `public/css/style.css` — **Full Rewrite**

The entire stylesheet was rewritten to implement the new design system. Key changes:

#### Design Tokens (`:root` variables)
- **Colors:** Rich green palette (`--green-deep: #0a3d1f`, `--green: #10b981`, `--lime: #84cc16`), dark background (`--dark-bg: #060f08`), and light accents
- **Typography:** Added `--font-heading: 'Plus Jakarta Sans'` (weight 800) alongside existing Inter and Playfair Display
- **Glass effects:** `--glass-bg`, `--glass-border`, `--glass-blur` for glassmorphism components
- **Radii:** `--radius-pill: 100px` for pill-shaped buttons/badges
- **Shadows:** Multi-layered shadows and green glow effects

#### Navbar (`.navbar`)
- Sticky floating pill design with `backdrop-filter: blur(20px)`
- Dark glassmorphism background (`rgba(6,15,8,0.85)`)
- Green-glowing "Get Started" CTA button
- Active link pill indicator
- Mobile hamburger toggle support

#### Hero Section (`.hero`)
- Full-viewport dark gradient background
- **Animated gradient orbs** (`.hero-orb-1`, `-2`, `-3`) — 3 floating blurred circles with `orbFloat` keyframe animation
- Gradient text headline (`linear-gradient` with `-webkit-background-clip: text`)
- Glassmorphism stat card with animated number counters
- Scroll indicator with pulse animation
- Semi-transparent "Request a Quote" outline button for dark background

#### Trust Marquee (`.trust-strip`) — **NEW**
- Green gradient bar below hero
- Infinite horizontal scroll animation (`marquee` keyframe, 30s loop)
- Lists key service areas (Sustainability Strategy, Carbon Assessment, ESG Advisory, etc.)
- Fade-out edges using pseudo-element gradients

#### About Section — **Bento Grid Layout** (`.about-bento`) — **RESTRUCTURED**
- **Previous:** Two-column text + 2×2 pillar cards
- **New:** 4-column bento grid with large dark feature card spanning 2 columns and 4 smaller pillar cards
- Dark main card with radial gradient orb and top gradient accent bar
- Pillar cards with bottom gradient bar reveal on hover (`scaleX(0)` → `scaleX(1)`)
- Icon containers with green-to-white color transition on hover

#### Values Section (`.values`)
- Dark background with mesh grid overlay
- 3-column card grid with glassmorphism effect
- Large gradient numbers (`01`–`06`) with reduced opacity
- Green gradient top-border reveal on hover

#### Services Overview (`.services-overview-grid`)
- 5-column card grid with letter badges (`A`–`E`)
- Green gradient fill sweep on hover
- Lift + glow shadow effect

#### Services Page Sub-Nav (`.services-nav-bar`) — **REDESIGNED**
- **Previous:** Dark flat bar, `top: 0`, hidden behind navbar
- **New:** Light background, pill-shaped tab buttons with borders
- `top: 76px` to sit below main navbar
- Active tab: green gradient fill with glow shadow
- Hover: subtle lift and green tint
- Hidden scrollbar for mobile overflow

#### Climate Commitment (`.climate`)
- Full-width green gradient background with mesh overlay
- Light text on dark background

#### CTA Section (`.cta-inner`)
- Gradient border card effect
- Centered layout with dual action buttons

#### Forms (Quote & Careers)
- Green gradient accent bar on card top
- Pill-shaped radio buttons
- Numbered process steps with green gradient circles
- Custom file upload UI
- Loading state on submit

#### Footer
- Dark background, 4-column grid
- Green accent color on links
- Subtle border separators

#### Responsive Breakpoints
- **1200px:** Services grid → 3 columns, bento grid → 2 columns
- **1024px:** Hero → single column, stat card hidden, bento → 2 columns
- **768px:** Full-width navbar (no pill), bento → 1 column, stacked layouts
- **480px:** Single column everything, reduced padding/font sizes

---

### 2. `views/partials/header.ejs` — **Minor Modification**

```diff
- <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
+ <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
```

- Added `Plus Jakarta Sans` (weights 500–800) to the Google Fonts import

---

### 3. `views/home.ejs` — **Layout Restructured**

All original content is preserved. Structural changes only:

- **Hero:** Added 3 `<div class="hero-orb">` elements inside `.hero-bg` for animated background orbs
- **Hero buttons:** Added `hero-outline` class to "Request a Quote" button for light styling on dark background
- **Trust Marquee:** Added new `<section class="trust-strip">` between hero and about section — displays service keywords in scrolling loop
- **About Section:** Replaced `.about-grid` → `.about-bento` layout:
  - `.about-text` → `.bento-main` (dark featured card)
  - `.about-pillars` / `.pillar` → `.bento-card` (smaller cards with icons)
  - Added centered `.about-header` above the bento grid
- **Stat numbers:** Added `data-target` attributes to `.stat-num` spans (e.g. `data-target="45+"`) to enable JS counter animation

---

### 4. `public/js/main.js` — **Enhancements Added**

Two new features added at the top of the `DOMContentLoaded` handler (before existing code):

#### Custom Cursor Dot
```javascript
// Creates a small dot element that follows the mouse cursor
const dot = document.createElement('div');
dot.className = 'cursor-dot';
document.body.appendChild(dot);
document.addEventListener('mousemove', e => { /* position update */ });
```

#### Animated Stat Counter
```javascript
// Uses IntersectionObserver to trigger count-up animation when stat numbers enter viewport
// Reads target value from data-target attribute
// Uses requestAnimationFrame with ease-out cubic easing over 1800ms
function animateCounter(el) { /* ... */ }
```

---

## Files NOT Modified

| File | Status |
|------|--------|
| `server.js` | ❌ Unchanged — Express routes, middleware, error handling |
| `config/firebase.js` | ❌ Unchanged — Firebase Admin SDK initialization |
| `routes/*.js` | ❌ Unchanged — All route handlers |
| `views/services.ejs` | ❌ Unchanged — Content and structure |
| `views/quote.ejs` | ❌ Unchanged — Form fields and logic |
| `views/careers.ejs` | ❌ Unchanged — Form fields and logic |
| `views/partials/footer.ejs` | ❌ Unchanged — Footer content |
| `package.json` | ❌ Unchanged — No new dependencies |
| `.env` | ❌ Unchanged — Environment variables |

---

## New CSS Classes Reference

| Class | Element | Purpose |
|-------|---------|---------|
| `.hero-orb`, `.hero-orb-1/2/3` | `div` | Animated floating gradient spheres in hero |
| `.hero-outline` | `a` | Light outline button variant for dark backgrounds |
| `.trust-strip`, `.trust-track` | `section`, `div` | Scrolling marquee bar |
| `.trust-dot` | `span` | Diamond separator in marquee |
| `.about-header` | `div` | Centered heading above bento grid |
| `.about-bento` | `div` | Bento grid container |
| `.bento-main` | `div` | Large dark featured card (spans 2 cols) |
| `.bento-card` | `div` | Small pillar card in bento grid |
| `.bento-icon` | `div` | Icon container in bento card |
| `.cursor-dot` | `div` (JS-created) | Custom mouse cursor dot |

---

## CSS Animations Reference

| Animation | Duration | Purpose |
|-----------|----------|---------|
| `orbFloat` | 12s infinite | Floating movement for hero background orbs |
| `marquee` | 30s linear infinite | Horizontal scroll for trust strip |
| `scrollPulse` | 1.8s infinite | Hero scroll indicator pulse |
| `introFade` | 1.4s | Intro overlay fade-out |
| `spin` | 0.7s linear infinite | Button loading spinner |

---

## Testing Checklist

- [x] Home page — all sections render correctly
- [x] Services page — sub-nav clickable below main navbar
- [x] Quote page — form and process steps styled
- [x] Careers page — form and positions styled
- [x] Responsive 1200px breakpoint
- [x] Responsive 1024px breakpoint
- [x] Responsive 768px breakpoint
- [x] Mobile navigation toggle
- [x] Stat counter animation triggers on scroll
- [x] Trust marquee scrolling animation
- [x] Hero gradient orbs floating animation
