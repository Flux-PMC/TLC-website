# TLC Photography — Design System

## 1. Visual Theme & Atmosphere

Quiet southern elegance. The brand operates two visual temperatures that shift with the time of day: a cool lavender-and-sage palette (stable 9 AM to 5 PM) and a warm golden-hour palette (stable 6 PM to 8 AM), with 1-hour twilight transitions between them. Think fine stationery printed on textured paper, not a Pinterest craft board. Photography dominates every layout. Design exists to frame the images, never to compete with them. Generous whitespace, unhurried compositions, botanical accents used sparingly.

The overall density is low. Pages breathe. Sections are separated by 96px of vertical space. Text is sparse and precise. The feeling should land somewhere between a Japanese photobook and the masthead of a high-end magazine.

## 2. Color Palette & Roles

The system uses two complete palettes. Static materials (print, social, favicon) always use Palette A.

### Palette A: Lavender & Sage (daytime, default)

```css
--color-text-primary: #3A3338;        /* Warm Charcoal — headings, body text */
--color-bg-primary: #FAF7F4;          /* Warm Cream — page background */
--color-accent: #9B8EC4;              /* Lavender — primary accent, links, active states */
--color-surface: #EDE7DF;             /* Linen — card backgrounds, section fills */
--color-accent-light: #DDD4EE;        /* Soft Lavender — hover states, subtle highlights */
--color-neutral: #A89B91;             /* Soft Taupe — secondary text, captions, metadata */
--color-botanical-1: #C2CBB2;         /* Mid Sage — botanical elements, dividers */
--color-botanical-2: #D6DCCA;         /* Light Sage — subtle backgrounds, badges */
```

### Palette B: Golden Hour (evening)

```css
--color-text-primary: #2F2623;        /* Deep Walnut — headings, body text */
--color-bg-primary: #FBF6F0;          /* Warm Ivory — page background */
--color-accent: #C08B76;              /* Dusty Rose — primary accent, links, active states */
--color-surface: #EBD9CF;             /* Blush — card backgrounds, section fills */
--color-accent-warm: #C9A45C;         /* Golden Honey — secondary accent, highlights */
--color-neutral: #8E7568;             /* Clay — secondary text, captions, metadata */
--color-botanical-1: #A3AB8E;         /* Olive Sage — botanical elements, dividers */
--color-botanical-2: #DDD0B8;         /* Wheat — subtle backgrounds, badges */
```

### Dark Mode (optional, for hero sections or dark footer)

```css
/* Lavender dark */
--color-bg-dark-a: #1A171B;           /* Deep Charcoal background */
--color-surface-dark-a: #252228;      /* Lifted surface */

/* Golden dark */
--color-bg-dark-b: #1C1714;           /* Deep Walnut background */
--color-surface-dark-b: #2A231E;      /* Lifted surface */

/* Accent colors unchanged in dark mode */
```

### Twilight Transition Waypoints (All Tokens)

Colors transition over 1 hour. Evening: 5:00 PM to 6:00 PM. Morning (reverse): 8:00 AM to 9:00 AM. Five hand-picked stops at 15-minute intervals. Do NOT use linear RGB interpolation between start and end values. Use these exact waypoints and interpolate smoothly between adjacent stops only.

```
Evening transition (Lavender → Golden Hour):

| Token              | 5:00 PM | 5:15 PM | 5:30 PM | 5:45 PM | 6:00 PM |
|--------------------|---------|---------|---------|---------|---------|
| --color-bg-primary | #FAF7F4 | #FAF7F2 | #FBF7F1 | #FBF6F0 | #FBF6F0 |
| --color-text-primary| #3A3338 | #372F32 | #332B2C | #312827 | #2F2623 |
| --color-accent     | #9B8EC4 | #B28EAC | #C08B76 | #C69862 | #C9A45C |
| --color-surface    | #EDE7DF | #ECE2D9 | #EBDDD3 | #EBDAD0 | #EBD9CF |
| --color-neutral    | #A89B91 | #A09183 | #978676 | #907B6E | #8E7568 |
| --color-botanical-1| #C2CBB2 | #B8C3A5 | #ADBA99 | #A6B292 | #A3AB8E |
| --color-botanical-2| #D6DCCA | #D8D9C4 | #DAD5BD | #DCD2BA | #DDD0B8 |

Morning transition (8:00 AM → 9:00 AM):
Same table in reverse. 8:00 AM = 6:00 PM column, 8:15 AM = 5:45 PM, etc.
```

All palette tokens transition in parallel using the waypoints above.

## 3. Typography Rules

### Palette A fonts (daytime)

```css
--font-heading: 'Cormorant Garamond', Georgia, serif;      /* Regular weight */
--font-subheading: 'Cormorant Garamond', Georgia, serif;   /* Light Italic */
--font-body: 'Raleway', 'Helvetica Neue', sans-serif;      /* Light 300 */
--font-ui: 'Raleway', 'Helvetica Neue', sans-serif;        /* Regular 400 */
```

### Palette B fonts (evening)

```css
--font-heading: 'Fraunces', Georgia, serif;                 /* Regular weight */
--font-subheading: 'Fraunces', Georgia, serif;              /* Light Italic */
--font-body: 'Outfit', 'Helvetica Neue', sans-serif;       /* Light 300 */
--font-ui: 'Outfit', 'Helvetica Neue', sans-serif;         /* Regular 400 */
```

### Type scale (shared, constant during transitions)

```css
--text-hero: 48px;          /* Landing page headline */
--text-h1: 36px;            /* Page titles */
--text-h2: 28px;            /* Section headers */
--text-h3: 22px;            /* Subsection headers */
--text-subheading: 18px;    /* Taglines, pull quotes — Light Italic */
--text-body: 16px;          /* Paragraph text — Light 300 */
--text-small: 14px;         /* Captions, metadata */
--text-button: 14px;        /* CTAs, navigation — Regular 400, uppercase, tracked */
```

Font swap at exactly 6:00 PM / 9:00 AM (when color transition completes): 600ms fade to transparent, swap font-family on :root, 600ms fade back (1.2s total). Both families preloaded. No font-size-adjust.

## 4. Component Stylings

### Buttons

```css
/* Primary */
button-primary {
  background: var(--color-accent);
  color: var(--color-bg-primary);
  font: var(--font-ui) var(--text-button) uppercase;
  letter-spacing: 1.5px;
  padding: 12px 32px;
  border-radius: 4px;
  border: none;
  transition: opacity 0.2s;
}
button-primary:hover { opacity: 0.85; }

/* Secondary / outline */
button-secondary {
  background: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  /* same padding, radius, font as primary */
}
button-secondary:hover { background: var(--color-accent-light); }
```

### Cards

```css
card {
  background: var(--color-bg-primary);
  border: 0.5px solid var(--color-surface);
  border-radius: 8px;
  padding: 24px;
  /* no box-shadow — depth comes from border and bg contrast */
}
card-surface {
  background: var(--color-surface);
  border: none;
  border-radius: 8px;
  padding: 24px;
}
```

### Form inputs

```css
input, textarea {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-surface);
  border-radius: 4px;
  padding: 12px 16px;
  font: var(--font-body) var(--text-body);
  color: var(--color-text-primary);
}
input:focus {
  border-color: var(--color-accent);
  outline: 2px solid var(--color-accent-light);
  outline-offset: 1px;
}
```

### Navigation

```css
nav {
  font: var(--font-ui) var(--text-button) uppercase;
  letter-spacing: 1.5px;
  color: var(--color-text-primary);
}
nav a:hover { color: var(--color-accent); }
nav a.active { color: var(--color-accent); border-bottom: 1.5px solid var(--color-accent); }
```

### Image galleries

```css
gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
gallery-grid img {
  border-radius: 4px;
  object-fit: cover;
  aspect-ratio: 4/5;   /* portrait default; 3/2 for landscape sets */
}
```

## 5. Layout Principles

```css
--max-width: 1200px;
--grid-columns: 12;
--grid-gutter: 24px;

--margin-desktop: 48px;
--margin-tablet: 32px;
--margin-mobile: 16px;

/* Spacing scale (8px base) */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 96px;    /* between major sections */
--space-5xl: 128px;   /* hero padding */
```

Common patterns:
- Text/image split: 5 columns text, 7 columns image. Alternates left/right.
- Gallery: 3-column grid spanning 10 of 12 columns, centered.
- Hero: full-bleed image, 80vh min-height, centered text overlay max-width 600px.
- Content sections separated by 96px vertical space. Subsections by 48px.

## 6. Depth & Elevation

No box-shadows. No drop-shadows. Depth is communicated through:

- Background color layering: page bg → surface color → card bg
- Thin borders (0.5px) in surface color create subtle separation
- Photography provides all visual depth and dimensionality
- Focus rings use 2px solid accent-light, 1px offset

The brand aesthetic is flat and material-honest. Surfaces reference paper and linen, not glass or metal.

## 7. Do's and Don'ts

### Do
- Let photographs be the largest visual element on every page
- Use generous whitespace between sections (96px minimum)
- Keep text sparse and intentional
- Use botanical sage/green only as small accents, never as large fills
- Maintain warm undertones in all neutral colors
- Use Lucide icons (1.5px outlined, round caps, 24px grid)

### Don't
- Use gradients, glows, glassmorphism, or neon effects
- Mix icon sets or use filled icons
- Apply lavender or accent colors to large background areas (accent is for small touches)
- Use playful, casual, or trendy design patterns
- Put more than 3 gallery columns on any screen width
- Use pure black (#000000) or pure white (#FFFFFF) anywhere
- Center-align body text (left-align always, center only for hero headlines)
- Crop photographs to circles or unusual shapes (rectangles with 4px radius only)

## 8. Responsive Behavior

```
Desktop:  1200px max-width, 48px side margins, 12-col grid, 24px gutters
Tablet:   768–1199px, 32px margins, collapse to 8 columns, gallery stays 3-col
Mobile:   < 768px, 16px margins, single column, gallery drops to 2-col
          Text/image splits stack vertically (image first)
          Hero min-height drops to 60vh
          Nav collapses to hamburger menu
          Touch targets minimum 44px
```

Type scale stays constant across breakpoints. The spacing scale compresses on mobile: section spacing drops from 96px to 64px, subsection from 48px to 32px.

## 9. Agent Prompt Guide

When generating new screens for TLC Photography, use these prompts as baseline instructions:

**General page:** "Create a page using TLC Photography's Lavender & Sage palette. Full-bleed hero image at top (80vh), centered headline in Cormorant Garamond at 48px. Sections separated by 96px. Photography dominates. Text is sparse. Use Lucide outlined icons at 1.5px stroke weight. Background is #FAF7F4, text is #3A3338, accent is #9B8EC4."

**Gallery page:** "Build a photography gallery using a 3-column grid with 8px gaps. Images crop to 4:5 portrait aspect ratio. Minimal navigation. No sidebar. The page should feel like a curated exhibit, not a photo dump."

**Contact/booking:** "Design a contact form on a linen (#EDE7DF) surface card. Inputs with 1px borders in surface color, lavender focus ring. Primary CTA button in lavender with cream text, uppercase Raleway at 14px with 1.5px letter spacing. Keep the form short: name, email, session type, message."

**Social media template:** "Always use Lavender & Sage palette for social. Instagram posts at 1080x1350 (4:5). Horizontal wordmark watermark at bottom center, 40-60% opacity. Text overlay templates use cream, linen, charcoal, or lavender backgrounds only."

---

### Logo System

Seven logo concepts generated via Gemini. Final selection and vectorization pending. Concepts:

1. Botanical Wordmark (Lavender & Sage) — vine/sprig weaving through the L with lavender buds and sage leaves, "PHOTOGRAPHY" in small caps sans-serif below. Primary candidate for Lavender & Sage palette.
2. Pure Stacked Wordmark — clean typography only, "TLC" large with lavender divider line, "PHOTOGRAPHY" below. No botanical element.
3. Vine Wrapping the L — honeysuckle vine growing upward from the L's vertical stroke, "Photography" in mixed-case sans-serif below.
4. Full Botanical Frame — dense honeysuckle illustration framing the text, sage monochrome on cream. Suited for banner/header treatments, not primary mark.
5. Botanical Banner — wider format of #4, text centered in a clearing within full botanical illustration. Best as a decorative header, not a scalable logo.
6. Slab Serif Wordmark — heavier slab serif in charcoal/gray gradient. Does not match brand typography (Cormorant Garamond / Fraunces).
7. Clean Serif Wordmark — high-contrast serif closest to Cormorant Garamond, "PHOTOGRAPHY" in small caps below. Clean, no botanical. Strong favicon/monogram candidate.

Vectorization pipeline: Adobe Illustrator Image Trace, StarVector, or OmniSVG (see logo-prompts-for-gemini.md).
Export formats: SVG, PNG (transparent, 500/1000/2000/4000px), PDF (CMYK), EPS, ICO (16/32/48), WEBP.

### Brand voice (for copy generation)

Warm, not bubbly. Southern, not folksy. Confident, not salesy. Poetic, not precious.

Use: light, story, moment, legacy, heirloom, golden, quiet, real, roots, together, home, porch, natural, timeless.

Avoid: slay, obsessed, epic, stunning, inspo, vibe check, hubby/wifey, bridezilla, mama bear, limited spots, dream wedding, capture your magic.
