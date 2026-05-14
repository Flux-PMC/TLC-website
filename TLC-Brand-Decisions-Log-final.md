# TLC Photography — Brand Decisions Log

Reference document for all locked creative and technical decisions.
Updated: May 7, 2026


## Two Palettes, One Brand

The site runs two visual identities that shift with the time of day. The concept is called "Two Kinds of Light." The content, layout, and structure stay identical. Only colors and typography change.

### Lavender & Sage (Daytime: 9:00 AM – 5:00 PM stable)

Evokes cool morning shade, open-air porches, natural light filtering through live oaks.

| Role            | Color         | Hex       |
|-----------------|---------------|-----------|
| Primary text    | Warm Charcoal | `#3A3338` |
| Background      | Warm Cream    | `#FAF7F4` |
| Accent          | Lavender      | `#9B8EC4` |
| Surface/linen   | Linen         | `#EDE7DF` |
| Accent light    | Soft Lavender | `#DDD4EE` |
| Neutral         | Soft Taupe    | `#A89B91` |
| Botanical 1     | Mid Sage      | `#C2CBB2` |
| Botanical 2     | Light Sage    | `#D6DCCA` |

Typography:
- Headings: Cormorant Garamond Regular
- Subheadings: Cormorant Garamond Light Italic
- Body: Raleway Light (paragraphs), Raleway Regular (UI/buttons)

### Golden Hour (Evening: 6:00 PM – 8:00 AM stable)

Evokes late afternoon warmth, amber backlight, October sun, golden skin tones.

| Role            | Color         | Hex       |
|-----------------|---------------|-----------|
| Primary text    | Deep Walnut   | `#2F2623` |
| Background      | Warm Ivory    | `#FBF6F0` |
| Accent          | Dusty Rose    | `#C08B76` |
| Surface/linen   | Blush         | `#EBD9CF` |
| Accent warm     | Golden Honey  | `#C9A45C` |
| Neutral         | Clay          | `#8E7568` |
| Botanical 1     | Olive Sage    | `#A3AB8E` |
| Botanical 2     | Wheat         | `#DDD0B8` |

Typography:
- Headings: Fraunces Regular
- Subheadings: Fraunces Light Italic
- Body: Outfit Light (paragraphs), Outfit Regular (UI/buttons)


## Color Transition: Twilight Waypoints

Method: Hand-designed intermediate color stops, not direct RGB interpolation.

Direct interpolation between lavender (#9B8EC4) and golden honey (#C9A45C) produces muddy brown at the midpoint. Instead, we define 5 waypoint palettes and interpolate between adjacent pairs.

### Transition windows: 1 hour each

Evening: 5:00 PM → 6:00 PM (Lavender → Golden Hour)
Morning: 8:00 AM → 9:00 AM (Golden Hour → Lavender)

Five waypoints at 15-minute intervals:

| Time (evening) | Time (morning) | Phase              | Accent color direction        |
|----------------|----------------|--------------------|-------------------------------|
| 5:00 PM        | 9:00 AM        | Full Lavender      | `#9B8EC4` (pure lavender)     |
| 5:15 PM        | 8:45 AM        | Waypoint 1         | `#B28EAC` (dusty mauve)       |
| 5:30 PM        | 8:30 AM        | Waypoint 2 (mid)   | `#C08B76` (warm rose)         |
| 5:45 PM        | 8:15 AM        | Waypoint 3         | `#C69862` (amber-rose)        |
| 6:00 PM        | 8:00 AM        | Full Golden Hour   | `#C9A45C` (golden honey)      |

All palette colors (background, surface, text, botanical, neutral) transition in parallel using the same waypoint approach. Each intermediate state was hand-picked to avoid muddy or desaturated zones.

### Implementation

CSS custom properties define all palette colors. A JS function runs on page load and every 60 seconds:

```javascript
function getTransitionProgress() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const totalMin = h * 60 + m;

  // Evening transition: 5:00 PM (1020) → 6:00 PM (1080)
  if (totalMin >= 1020 && totalMin <= 1080) {
    return (totalMin - 1020) / 60; // 0.0 → 1.0
  }
  // Morning transition: 8:00 AM (480) → 9:00 AM (540)
  if (totalMin >= 480 && totalMin <= 540) {
    return 1 - (totalMin - 480) / 60; // 1.0 → 0.0
  }
  // Stable periods
  if (totalMin > 540 && totalMin < 1020) return 0; // daytime = lavender
  return 1; // nighttime = golden hour
}
```

Interpolation happens between the nearest two waypoints. The function updates CSS variables on `:root` each tick.


## Font Transition: Clean Swap at 6:00 PM / 9:00 AM

Fonts do not interpolate. They swap at the moment the color transition completes.

### Why not font-size-adjust

We measured the font metrics. The body pair (Raleway ↔ Outfit) is close enough to swap cleanly. The heading pair (Cormorant Garamond ↔ Fraunces) has a 25% x-height difference, but normalizing it with `font-size-adjust` would distort each font's natural proportions during its stable hours. Each font was chosen for its character at full size. Flattening them to match defeats the purpose.

### Font metrics (measured from TTF files)

**Heading pair:**

| Metric            | Cormorant Garamond | Fraunces  | Difference |
|-------------------|--------------------|-----------|------------|
| x-height ratio    | 0.386              | 0.482     | 24.9%      |
| Cap height ratio  | 0.625              | 0.700     | 12.0%      |
| Avg width ratio   | 0.535              | 0.575     | 7.5%       |

**Body pair:**

| Metric            | Raleway   | Outfit    | Difference |
|-------------------|-----------|-----------|------------|
| x-height ratio    | 0.519     | 0.475     | 8.5%       |
| Cap height ratio  | 0.710     | 0.694     | 2.3%       |
| Avg width ratio   | 0.584     | 0.572     | 2.1%       |

### Swap implementation

1. Both font families are preloaded on page load (all weights). No FOIT risk.
2. At the swap moment (when color transition reaches 100%):
   - All text containers get `opacity: 0` with a 600ms CSS transition
   - After 600ms, JS swaps `font-family` on `:root`
   - Browser reflows while text is invisible
   - `opacity: 1` fades back in over 600ms
   - Total transition: ~1.2 seconds
3. Headings and body swap simultaneously during the same fade.
4. No `font-size-adjust` is applied. Each font renders at natural proportions.

The body text reflow will be minimal (2% width difference). Heading reflow is larger but headings are short, so layout shift is negligible.


## Type Scale

Shared across both palettes. Sizes stay constant during transitions.

| Level      | Size   | Weight        | Use                    |
|------------|--------|---------------|------------------------|
| Hero       | 48px   | Regular       | Landing page headline  |
| H1         | 36px   | Regular       | Page titles            |
| H2         | 28px   | Regular       | Section headers        |
| H3         | 22px   | Regular       | Subsection headers     |
| Subheading | 18px   | Light Italic  | Taglines, pull quotes  |
| Body       | 16px   | Light         | Paragraph text         |
| Small      | 14px   | Regular       | Captions, metadata     |
| Button     | 14px   | Regular (caps)| CTAs, navigation       |


## Files Produced

| File | Contents |
|------|----------|
| `TLC-wedsite-v1.pdf` | 6-page style guide for Lavender & Sage palette + typography |
| `TLC-Two-Kinds-of-Light.pdf` | 7-page pitch deck comparing both directions with 4 landing page mockups |
| `TLC-Color-Palette-Final.png` | Standalone color palette board |
| `TLC-Brand-Decisions-Log.md` | This file |
| `logo-prompts-for-gemini.md` | 6 contextual prompts for logo generation + vectorization pipeline |
| `../ComfyUI-Full-Build.md` | Complete ComfyUI toolkit setup instructions (25 node packs, models, verification) |
| `TLC-Brand-Style-Guide.pdf` | 12-page comprehensive brand style guide (this is the handoff document) |
| `DESIGN.md` | Claude Design 9-section handoff file |
| `TLC-Design-Philosophy.md` | "Pressed Light" aesthetic manifesto |
| `TLC-Claude-Project-Brief.md` | Consolidated brief for Claude projects (content generation) |
| `gemini-brand-vibe-brief.md` | Brand essence brief for Gemini logo prompts |


## Tagline

"Tender love lights the way."

Locked May 2, 2026. Written by JP.


## Bio

TLC Photography is a boutique portrait studio serving central, northeast Louisiana, and beyond. The photographer behind it came from California, chose the South, and never looked back. She photographs families, couples, newborns, and graduating seniors, always chasing the moment after the pose, when the guard drops and something real surfaces. Her fiancé runs the business so she can stay behind the camera. Every image is crafted to last a lifetime and be passed to the next.

Locked May 2, 2026.


## Brand Voice

Four attributes define TLC's tone across all copy:

1. Warm, not bubbly. Speaks like a close friend who takes beautiful photos. Genuine care without exclamation points. ("We'd love to hear your story." not "OMG we can't WAIT to meet you!!!")
2. Southern, not folksy. Rooted in place without leaning on drawl or stereotype. The South as poetry, not parody. ("golden hour on the back porch" not "y'all come on down now!")
3. Confident, not salesy. Lets the work speak. States what TLC does without manufacturing urgency. ("Let's make something beautiful." not "Book NOW before spots fill up!")
4. Poetic, not precious. Can use beautiful language when it serves the moment. Never overwrites. ("The kind of light that makes everything slow down." not "We capture the ethereal luminescence of your journey.")

Use freely: light, story, moment, legacy, heirloom, golden, quiet, real, roots, together, home, porch, natural, timeless

Avoid: slay, obsessed, epic, stunning, inspo, vibe check, hubby/wifey, bridezilla, mama bear, limited spots, dream wedding, capture your magic


## Spacing and Layout System

Base unit: 8px. All spacing values are multiples of this base.

| Token | Value | Use |
|-------|-------|-----|
| xs    | 4px   | Tight gaps (icon-to-label) |
| sm    | 8px   | Inline spacing, small gaps |
| md    | 16px  | Default padding, form gaps |
| lg    | 24px  | Card padding, grid gutters |
| xl    | 32px  | Section padding (mobile) |
| 2xl   | 48px  | Subsection vertical spacing |
| 3xl   | 64px  | Section padding (desktop) |
| 4xl   | 96px  | Major section vertical spacing |
| 5xl   | 128px | Hero section top/bottom padding |

Page layout grid:
- Max content width: 1200px centered
- Columns: 12-column grid, 24px gutters
- Side margins: Desktop 48px, Tablet 32px, Mobile 16px
- Major section spacing: 96px vertical
- Subsection spacing: 48px vertical

Common layout patterns:
- Gallery grid: 3 columns, 8px gap, spans 10 of 12 grid columns. Images crop to 4:5 portrait or 3:2 landscape.
- Text + image split: 5/7 column ratio, alternates left/right by section. Text vertically centered.
- Hero section: Full-bleed image, 80vh min-height. Text overlay centered, max-width 600px.


## Icon Style

- Source: Lucide (lucide.dev), MIT license, 1500+ icons
- Style: Outlined (stroke only), no filled icons
- Stroke weight: 1.5px
- Corners: Rounded (2px radius)
- Line caps and joins: Round
- Grid size: 24x24px with 2px inset padding
- Color: Inherits current text color (shifts with palette)

Sizing by context:
- Inline with text: 16px
- Buttons and nav: 20px
- Feature blocks: 24px

Never mix icon sets. Lucide only.


## Print Collateral Defaults

All static print materials use the Lavender & Sage palette exclusively. Golden Hour is reserved for the website experience.

Reasons: Higher contrast for small text readability. Cooler palette photographs better under varied indoor lighting (bridal shows, vendor events). Lavender accent is more distinctive as a brand marker at first glance.

Applies to: business cards, price sheets, flyers, packaging, thank-you cards, gift certificates, album inserts.


## Dark Mode Variants

Optional. Not part of the initial website build. Documented here for future use (dark hero sections, dark footer, or system-preference toggle).

### Lavender & Sage — Dark

| Role            | Color         | Hex       |
|-----------------|---------------|-----------|
| Background      | Deep Charcoal | `#1A171B` |
| Surface         | Lifted Dark   | `#252228` |
| Accent          | Lavender      | `#9B8EC4` |
| Accent light    | Soft Lavender | `#DDD4EE` |
| Heading text    | Light Cream   | `#EDE7DF` |
| Body text       | Soft Taupe    | `#A89B91` |
| Botanical       | Mid Sage      | `#C2CBB2` |
| Neutral         | Warm Gray     | `#6B5F55` |

### Golden Hour — Dark

| Role            | Color         | Hex       |
|-----------------|---------------|-----------|
| Background      | Deep Walnut   | `#1C1714` |
| Surface         | Lifted Walnut | `#2A231E` |
| Accent          | Dusty Rose    | `#C08B76` |
| Accent warm     | Golden Honey  | `#C9A45C` |
| Heading text    | Warm Blush    | `#EBD9CF` |
| Body text       | Clay          | `#8E7568` |
| Botanical       | Olive Sage    | `#A3AB8E` |
| Neutral         | Warm Brown    | `#6B5A4E` |

Dark mode derivation rule: background color comes from the light palette's primary text color, shifted warmer and darker. Accent colors stay identical. Botanical colors stay unchanged (they read well on dark backgrounds naturally).


## Favicon and Browser Tab

- Design: TLC monogram from logo system
- Sizes: 16, 32, 48, 180, 192, 512px
- Format: .ico (multi-resolution) + individual .png files
- Background: Transparent (except apple-touch-icon)
- Color: Charcoal #3A3338 (Lavender & Sage palette, no time switching)
- apple-touch-icon: 180x180, monogram on lavender (#9B8EC4) background
- theme-color meta tag: Updates with palette transition (#FAF7F4 day, #FBF6F0 night)
- manifest background_color: #FAF7F4
- og:image: 1200x630 brand card (Lavender & Sage palette)


## Social Media Templates

Social media always uses Lavender & Sage. Golden Hour is exclusive to the website.

### Template sizes

| Platform         | Size          | Aspect | Notes |
|------------------|---------------|--------|-------|
| Instagram post   | 1080 x 1350px | 4:5    | Photo fills frame, wordmark bottom center at 40-60% opacity |
| Instagram story  | 1080 x 1920px | 9:16   | Full-bleed photo, wordmark near bottom above swipe zone |
| Facebook cover   | 820 x 312px   | ~2.6:1 | Landscape photo, monogram lower-right, minimal |
| Facebook post    | 1200 x 630px  | ~1.9:1 | Same watermark rules as Instagram |

### Text overlay templates (non-photo posts)

Four approved color combos for quote cards, announcements, session teasers:
1. Cream background (#FAF7F4) + charcoal text (#3A3338)
2. Linen background (#EDE7DF) + charcoal text (#3A3338)
3. Charcoal background (#3A3338) + cream text (#FAF7F4)
4. Lavender background (#9B8EC4) + cream text (#FAF7F4)

### Watermark rules

- Use horizontal wordmark at 40-60% opacity
- Position: bottom-center, 5% margin from edge
- White wordmark on dark image areas, charcoal on light areas
- Never full opacity, never large enough to distract
- Canva templates should include wordmark as a locked layer


## Logo System

Seven logo concepts generated via Gemini (May 2026). Final selection and vectorization pending.

### Concepts

1. Botanical Wordmark (Lavender & Sage) — vine/sprig weaving through the L with lavender buds and sage leaves, "PHOTOGRAPHY" in small caps sans-serif below. Primary candidate for Lavender & Sage palette.
2. Pure Stacked Wordmark — clean typography only, "TLC" large with lavender divider line, "PHOTOGRAPHY" below. No botanical element.
3. Vine Wrapping the L — honeysuckle vine growing upward from the L's vertical stroke, "Photography" in mixed-case sans-serif below.
4. Full Botanical Frame — dense honeysuckle illustration framing the text, sage monochrome on cream. Suited for banner/header treatments, not primary mark.
5. Botanical Banner — wider format of #4, text centered in a clearing within full botanical illustration. Best as a decorative header, not a scalable logo.
6. Slab Serif Wordmark — heavier slab serif in charcoal/gray gradient. Does not match brand typography (Cormorant Garamond / Fraunces).
7. Clean Serif Wordmark — high-contrast serif closest to Cormorant Garamond, "PHOTOGRAPHY" in small caps below. Clean, no botanical. Strong favicon/monogram candidate.

### Vectorization pipeline

Adobe Illustrator Image Trace, StarVector, or OmniSVG (see logo-prompts-for-gemini.md).

### Export formats

SVG, PNG (transparent, 500/1000/2000/4000px), PDF (CMYK), EPS, ICO (16/32/48), WEBP.


## Tech Stack

Locked May 2026. All choices are final.

| Layer | Tool | Notes |
|-------|------|-------|
| Framework | Astro | Static site generator, island architecture. Only interactive components hydrate as React. |
| CMS | Keystatic | Git-based, visual editor. Non-technical user (the photographer) can update content without touching code. |
| Hosting | Cloudflare Pages | Free tier, unlimited bandwidth, auto-deploy from GitHub, preview URLs per branch. |
| Styling | Tailwind CSS | Extended with CSS custom properties so colors shift automatically with the palette system. |
| Components | shadcn/ui | Radix-based, copied as source code (not npm dependency), fully customizable CSS. |
| Animation | Motion (formerly Framer Motion) | ~15KB. Scroll-triggered reveals, hover effects, crossfades. |
| Icons | Lucide | See Icon Style section above. |
| Images | Astro Image component | WEBP/AVIF output, responsive srcsets, lazy loading. |
| Form backend | Cloudflare Workers | Serverless function for contact form submission. Free tier (100K requests/day). |
| Scheduling | Calendly | External service. Styled button link on the site, NOT an embedded widget. |
| Client galleries | Pixieset | External. Direct links sent to clients after sessions. Not on the main site. |
| Domain | tlc-photography.com | Registered on Cloudflare. |
| Email | admin@tlc-photography.com | Cloudflare email routing. |
| Analytics | Umami (planned) | Self-hosted, privacy-first. Separate home server project, not part of initial site build. |


## Component Architecture

Locked May 7, 2026.

The site uses Astro's island architecture. Most of the site is static HTML with zero JavaScript. Only components that require client-side interactivity hydrate as React islands.

### Static Astro Components (~22)

These render at build time. No JS shipped to the browser.

| Component | Page(s) | Purpose |
|-----------|---------|---------|
| Header | All | Site navigation, logo placeholder, nav links |
| Footer | All | Contact info, social links, copyright |
| Hero | Home | Full-bleed image, headline overlay |
| PageLayout | All | Wrapper with max-width, margins, spacing |
| SectionWrapper | All | Consistent 96px vertical spacing between sections |
| BlogCard | Blog | Post preview card (thumbnail, title, excerpt, date) |
| BlogPost | Blog/[slug] | Individual post template |
| AboutSection | About | Text/image split sections for the story |
| ServiceSection | Services | Section wrapper for service category |
| PriceRange | Services | "Starting at $X" display |
| CalendlyButton | Services, Contact | Styled button linking to Calendly with description text |
| TestimonialWrapper | Home | Container for the testimonial carousel island |
| PortfolioWrapper | Portfolio | Container for the portfolio grid island |
| ContactWrapper | Contact | Container for the contact form island |
| SEOHead | All | Meta tags, OG tags, structured data |
| ImageOptimized | All | Wrapper around Astro's Image component |
| SageAccent | Various | Small botanical divider/accent element |
| BreadcrumbNav | Blog | Simple breadcrumb for blog posts |
| SkipLink | All | Accessibility skip-to-content link |
| MetaDescription | All | Per-page meta description handler |
| SchemaMarkup | All | LocalBusiness structured data for both service areas |
| SocialLinks | Footer | Icon links to social profiles |

### shadcn/ui React Islands (5 component types, 7 total)

These are Radix-based components from shadcn/ui, copied into the project as source files and restyled to match TLC's design tokens.

| Component | Page(s) | Purpose | Theming notes |
|-----------|---------|---------|---------------|
| Sheet | All (mobile) | Mobile navigation drawer. Hamburger trigger. | Linen (#EDE7DF) background, no overlay shadow, 8px radius on the sheet panel. |
| Dialog | Portfolio | Image lightbox. Click thumbnail to see full image. | Cream (#FAF7F4) background, thin 0.5px border in surface color, 8px radius. No default shadcn shadow. |
| Accordion | Contact | FAQ section. Multiple items, single expand. | Linen surface cards, lavender accent on the open indicator, 8px radius. No borders between items, use spacing instead. |
| Input + Label | Contact | Form fields (name, email, phone). | 1px border in surface color (#EDE7DF), 4px radius, Raleway/Outfit body font, lavender focus ring (2px solid accent-light, 1px offset). |
| Textarea + Label | Contact | Message field. | Same styling as Input. |
| Button | Contact, Services | Form submit, "Book a Consultation" CTAs. | Primary: lavender bg, cream text, uppercase, 1.5px letter-spacing, 4px radius, no shadow. Hover: opacity 0.85. Secondary/outline: transparent bg, lavender border, lavender text. |

### Custom React Islands (7)

These are custom components built with React and the Motion animation library. They handle interactivity that shadcn doesn't cover.

| Component | Page | Purpose |
|-----------|------|---------|
| PaletteManager | All (base layout) | Reads system clock, calculates transition progress, updates CSS custom properties on :root every 60 seconds. Handles font swap at transition boundaries. |
| PortfolioGrid | Portfolio | Masonry layout with Motion stagger animations. IntersectionObserver triggers entrance. |
| TestimonialCarousel | Home | Crossfade/slide between testimonial quotes. Auto-advance with dot navigation. |
| SessionTypeCards | Home or Services | Hover reveals dark gradient caption overlay. Image scales 1.03. |
| ServiceCards | Services | Hover expands description below price. Accent line draws across bottom. One card at a time. |
| ContactForm | Contact | Client-side validation (all fields required, email/phone format). Submit to Cloudflare Worker. Success/error states. Greyed submit until valid. |
| ChatButton | All (floating) | Floating lavender button in bottom-right corner. Opens iframe overlay to JP's external Vercel/Supabase chatbot. |


## Animation and Interaction Patterns

Locked May 7, 2026. All four effects were demoed as interactive HTML and approved by JP.

Animation library: Motion (formerly Framer Motion), ~15KB gzipped.

### Effect 1: Portfolio Staggered Entrance

Where: Portfolio page, gallery grid.
Trigger: IntersectionObserver, fires once when grid scrolls into viewport.
Behavior: Each image fades in (opacity 0 to 1) and rises from 30px below (translateY). 120ms stagger between consecutive items. 600ms duration per item. ease-out timing function.
Mobile: Same behavior, fewer columns (2-col grid).

### Effect 2: Testimonial Crossfade

Where: Home page, testimonials section.
Behavior: One quote visible at a time. Current quote slides left (translateX -20px) and fades out. Next quote slides in from the right (translateX 20px to 0) and fades in. 500ms transition duration. Auto-advances every 6 seconds. Dot indicators below for manual navigation (clicking a dot jumps to that quote).
Reset: Auto-advance timer resets when user clicks a dot.

### Effect 3: Session Type Card Hover Reveal

Where: Home page (or Services, TBD during page builds).
Behavior: On hover, a dark gradient overlay (rgba charcoal, 85% at bottom to transparent at top) slides up from the bottom of the image card. Caption text appears inside the gradient: session type name (Cormorant Garamond/Fraunces, 20px, cream) and one-line description (Raleway/Outfit, 12px, cream at 80% opacity). The image behind the overlay scales to 1.03. 350ms ease-out on all transitions.
Mobile: Tap toggles the overlay on/off (CSS class toggle via ontouchstart).

### Effect 4: Services Card Expand

Where: Services page, service listing cards.
Behavior: On hover, a short description (font-body, 12px, light 300) expands below the price line. Uses max-height animation from 0 to content height, 400ms ease-out, with opacity fading in 0 to 1 with 100ms delay. A 2px lavender accent line draws across the bottom of the card (scaleX 0 to 1, transform-origin left, 350ms ease-out). Image section opacity drops from 1.0 to 0.88. No zoom, no scale.
Constraint: Only ONE card expands at a time. If the user hovers a different card, the previous one collapses. This is not a "hover all three" effect.
Mobile: Tap toggles. Same one-at-a-time rule applies.

### Rejected Effects

These were proposed and explicitly rejected by JP:

| Effect | Reason |
|--------|--------|
| Ken Burns (slow pan/zoom on hero images) | "Cheesy" |
| Slow zoom on hover (Services cards) | "Cheesy. Very ASPCA in the arms of an angel." Overused on websites. |
| Bounce/overshoot easing | Not appropriate for the brand's quiet aesthetic |
| Spring physics | Same reason |
| Parallax scrolling | Not appropriate |

### General Animation Rules

All scroll-triggered animations use IntersectionObserver and fire once (do not replay on scroll back).
All hover effects reverse cleanly on mouse-out (same duration, ease-in for exit).
Maximum animation duration: 500ms for any single effect.
Respect `prefers-reduced-motion`: when set, disable all animations entirely (no fallback to slower motion, just static).
No decorative motion. Every animation must serve a purpose: revealing content, indicating interactivity, or transitioning between states.


## Page-Level Decisions

### Home

Full-bleed hero image, 80vh min-height, centered headline overlay (max-width 600px). Brand introduction section. Featured portfolio images. Testimonial carousel. Session type preview cards with hover reveals.

### Portfolio

Curated exhibit of 15-25 images. This is NOT a full archive or photo dump. It's the photographer's best work, selected to sell the business. Full client galleries live on Pixieset and are sent directly to clients. The portfolio page is for prospects.

Layout: Masonry-style grid, 3 columns desktop, 2 columns mobile, 8px gaps. Staggered portrait/landscape mix for visual interest. Scroll-triggered stagger entrance animation. Click any image to open lightbox (shadcn Dialog).

No category filter tabs or pills. The portfolio is one curated set, not sortable by session type.

### Services

Session type cards with descriptions. Starting-at price ranges (not fixed rates). "Book a Consultation" button linking to Calendly (styled shadcn Button, not an embed). One card expands at a time on hover to show details.

Session types: Families, Couples, Newborns, Seniors, Maternity, Engagements.

### About

The photographer's story. California-to-Louisiana journey. The "Two Kinds of Light" philosophy. Text/image split layouts (5 columns text, 7 columns image, alternating sides).

### Blog

Post listing page with BlogCard components. Individual post template. Content managed through Keystatic. Used for SEO, session spotlights, behind-the-scenes content.

### Contact

Contact form: name, email, phone, message. All four fields required. Submit button greyed/disabled until all fields pass validation (email format, phone format, name not empty, message not empty). Backend: Cloudflare Worker handles submission, sends notification email, returns success/error.

Below the form: Calendly styled button link with a short description explaining what booking a consultation means (for people unfamiliar with online scheduling).

FAQ section: shadcn Accordion component. Common questions about sessions, pricing, what to wear, turnaround time.

Chatbot: Floating lavender button (bottom-right corner) opens an iframe overlay connecting to JP's external Vercel/Supabase chatbot. The chatbot is a separate project. The site just provides the button and iframe container. Both the FAQ and chatbot serve the same purpose (answering questions), the FAQ for people who prefer reading, the chatbot for people who prefer asking.


## Calendly Integration

Changed from original plan. Originally spec'd as an embedded Calendly widget on the Contact page. Changed to a styled button link (shadcn Button) that opens Calendly in a new tab.

Reason: Calendly embeds add weight and complexity. A simple link with clear descriptive text ("Schedule a free consultation to discuss your session") accomplishes the same goal with zero dependencies.

The Calendly button appears on:
- Services page (after each session type description)
- Contact page (below the contact form)


## Chatbot Integration

JP built a lightweight chatbot on Vercel/Supabase. It's loaded with a couple pages of business-specific information (services, pricing, what to expect, FAQ answers) and can answer client questions conversationally.

Integration on the TLC site: A floating button (lavender accent color, bottom-right corner) that opens an iframe overlay. The iframe points to the chatbot's URL on Vercel. The chatbot is completely decoupled from the Astro site. No shared auth, no shared data, no build dependency.

The button and iframe container are a custom React island (ChatButton component). The iframe loads lazily (only when the button is clicked).


## Decisions Still Needed

- [ ] Logo / wordmark final selection from 7 Gemini concepts
- [ ] Logo vectorization (blocked on selection)
- [ ] Logo clear-space and usage rules (blocked on vectorization)
- [ ] shadcn/ui component theming spec (restyling the 7 components to match TLC design tokens)
- [ ] Which page gets the SessionTypeCards (Home vs. Services vs. both)
