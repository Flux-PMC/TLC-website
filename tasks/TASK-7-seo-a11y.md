# Task 7: SEO, Accessibility, and Performance Pass

---

## Rules (Apply to This Task and Every Task)

Read these before doing anything. They are non-negotiable.

### Process

- Do ONLY what this task file describes. Nothing else.
- When done, STOP. List every file you created or changed. Report errors. Wait.
- Do NOT start the next task. Do NOT open other task files.
- If you hit an error you cannot fix in 3 attempts, stop and report. Do not hack around it.
- If a decision is not in this file, CLAUDE.md, DESIGN-final.md, or TLC-Brand-Decisions-Log.md, do not make it yourself. Stop and say what you need.

### Code

- All colors use CSS custom properties (`var(--color-*)`). Never hardcode hex values outside `:root`. Never use Tailwind default color classes (`bg-gray-100`, `text-slate-900`, etc.).
- No `#000000` (pure black) or `#FFFFFF` (pure white) anywhere.
- No box-shadows, drop-shadows, gradients, or glow effects.
- No Google Fonts CDN. Fonts are self-hosted via Fontsource packages.
- Respect `prefers-reduced-motion` for all animations.
- No analytics, tracking scripts, or third-party monitoring.

### Packages

- Only install packages explicitly listed in this task file.
- No "nice to have" additions. No dev tools not specified.
- Do not upgrade or change versions of existing packages.

### Files

- No README.md, CONTRIBUTING.md, or documentation files.
- No test files or testing infrastructure unless this task says to.
- No CI/CD configs, GitHub Actions, or deployment workflows.
- No real names in any file. Photographer = TLC, fiance = JP.

### Style

- Body text left-aligned always. Center only for hero headlines.
- Images: rectangles with 4px border-radius. No circles, ovals, unusual crops.
- Lucide icons: 1.5px outlined, round caps, 24px grid. No filled icons. One icon set only.
- Accent colors for small touches, never large background fills.

### Responsive (Apply to Every Component You Build)

- Mobile-first: base styles for mobile, breakpoints going up.
- Breakpoints: sm:640px, md:768px, lg:1024px, xl:1280px.
- Mobile (< 768px): single column, 16px margins, 2-col gallery, 60vh hero, hamburger nav, 44px min touch targets.
- Tablet (768-1199px): 32px margins, 8-col grid, 3-col gallery.
- Desktop (1200px+): 48px margins, 12-col grid, 3-col gallery, max-width 1200px.
- Section spacing: 96px desktop, 64px mobile. Subsection: 48px desktop, 32px mobile.
- Text/image splits stack vertically on mobile (image first).

### Modularity

- One component per file.
- Components accept props. No hardcoded content.
- Astro components use `<slot />` for composability.
- No cross-component internal dependencies.
- Every React island must work if extracted to a different page.

### Safety (Unattended Operation)

- NEVER run destructive commands: `rm -rf`, `rm -r`, `find ... -delete`.
- NEVER run any `git` commands.
- NEVER modify or read `.env` files or environment variables.
- NEVER create, modify, or delete files outside the project directory.
- NEVER install global npm packages.
- NEVER run `npx` commands that scaffold new projects.
- If `npm run dev` fails 3 times, stop and report.
- If a package install fails twice, stop and report.
- NEVER modify CLAUDE.md or any task file.

---

## What You Are Building

The final pass across the entire site: SEO meta tags, structured data, sitemap generation, accessibility fixes, and performance optimizations. No new features. No layout changes. This task polishes what already exists.

## Steps

1. Install `@astrojs/sitemap` and configure it
2. Create or update the `SEOHead` Astro component with per-page meta tags
3. Add JSON-LD structured data (LocalBusiness schema)
4. Add Open Graph and Twitter Card meta tags to every page
5. Audit and fix accessibility issues across all pages
6. Run through the performance checklist and fix issues
7. Verify `npm run dev` still starts with zero errors
8. STOP and report.

## Packages to Install

```
@astrojs/sitemap
```

No other packages. Do not install astro-seo, @astrojs/partytown, or any analytics packages.

## SEO: Meta Tags

### SEOHead Component

Create or update `src/components/SEOHead.astro`. This component is included in BaseLayout's `<head>` and accepts per-page props.

```typescript
interface Props {
  title: string;           // Page title. Appended with " | TLC Photography"
  description: string;     // Meta description. 150-160 characters.
  image?: string;          // OG image URL. Falls back to default brand card.
  url: string;             // Canonical URL for this page.
  type?: string;           // OG type. Default: "website". Blog posts use "article".
  publishedDate?: string;  // For blog posts only. ISO date string.
}
```

### Per-Page Meta

| Page | Title | Description |
|------|-------|-------------|
| Home | `TLC Photography \| Boutique Portrait Photography in Louisiana` | `Boutique portrait photography serving central and northeast Louisiana. Families, couples, newborns, seniors, maternity, and engagements.` |
| Portfolio | `Portfolio \| TLC Photography` | `View our curated portrait gallery. Families, couples, newborns, and seniors photographed in natural light across Louisiana.` |
| Services | `Services & Pricing \| TLC Photography` | `Portrait session types and starting prices. Families, couples, newborns, seniors, maternity, and engagement photography in Louisiana.` |
| About | `About \| TLC Photography` | `The story behind TLC Photography. From California to Louisiana, chasing the moment after the pose.` |
| Blog | `Blog \| TLC Photography` | `Behind the scenes, session spotlights, and stories from TLC Photography in Louisiana.` |
| Blog Post | `{post.title} \| TLC Photography` | `{post.excerpt}` (from Keystatic) |
| Contact | `Contact \| TLC Photography` | `Book a consultation or ask a question. Serving families and couples across central and northeast Louisiana.` |

### Output Tags

For every page, render in `<head>`:

```html
<title>{title}</title>
<meta name="description" content="{description}" />
<link rel="canonical" href="{url}" />

<!-- Open Graph -->
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="{image}" />
<meta property="og:url" content="{url}" />
<meta property="og:type" content="{type}" />
<meta property="og:site_name" content="TLC Photography" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{description}" />
<meta name="twitter:image" content="{image}" />
```

For blog posts, add:

```html
<meta property="article:published_time" content="{publishedDate}" />
```

### Default OG Image

Use a 1200x630 brand card as the fallback OG image. Create a placeholder file at `public/og-default.jpg` (or reference an existing brand image). The actual branded OG image will be designed later when the logo is finalized.

## SEO: Sitemap

### Configuration

Add `@astrojs/sitemap` to the Astro config's integrations array. Set the site URL:

```javascript
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tlc-photography.com',
  integrations: [
    // ... existing integrations
    sitemap(),
  ],
});
```

The sitemap generates automatically at build time. It includes all static pages and dynamic blog routes.

## SEO: Structured Data (JSON-LD)

### LocalBusiness Schema

Create `src/components/SchemaMarkup.astro`. Include it in BaseLayout. Render a `<script type="application/ld+json">` block.

```json
{
  "@context": "https://schema.org",
  "@type": "PhotographyBusiness",
  "name": "TLC Photography",
  "description": "Boutique portrait photography serving central and northeast Louisiana. Families, couples, newborns, seniors, maternity, and engagements.",
  "url": "https://tlc-photography.com",
  "telephone": "",
  "email": "admin@tlc-photography.com",
  "priceRange": "$$",
  "image": "https://tlc-photography.com/og-default.jpg",
  "areaServed": [
    {
      "@type": "City",
      "name": "Alexandria",
      "containedInPlace": {
        "@type": "State",
        "name": "Louisiana"
      }
    },
    {
      "@type": "City",
      "name": "Pineville",
      "containedInPlace": {
        "@type": "State",
        "name": "Louisiana"
      }
    },
    {
      "@type": "City",
      "name": "Monroe",
      "containedInPlace": {
        "@type": "State",
        "name": "Louisiana"
      }
    },
    {
      "@type": "City",
      "name": "West Monroe",
      "containedInPlace": {
        "@type": "State",
        "name": "Louisiana"
      }
    }
  ],
  "knowsAbout": [
    "Family Photography",
    "Couples Photography",
    "Newborn Photography",
    "Senior Photography",
    "Maternity Photography",
    "Engagement Photography"
  ],
  "sameAs": [
    "https://www.instagram.com/tlc__photography__/",
    "https://www.facebook.com/profile.php?id=100095143013689"
  ]
}
```

Leave `telephone` empty and `sameAs` as an empty array. These get populated when social profiles and a phone number are set up.

### Blog Post Schema

For individual blog posts (`/blog/[slug]`), add a BlogPosting schema:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{post.title}",
  "description": "{post.excerpt}",
  "datePublished": "{post.date}",
  "image": "{post.coverImage}",
  "author": {
    "@type": "Organization",
    "name": "TLC Photography"
  },
  "publisher": {
    "@type": "Organization",
    "name": "TLC Photography",
    "url": "https://tlc-photography.com"
  }
}
```

## Accessibility Checklist

Go through every page and fix any issues found. Here is the complete checklist:

### Images

- [ ] Every `<img>` has an `alt` attribute (already handled by ImageOptimized from Task 6)
- [ ] Alt text describes the image content, not "image of..." or "photo of..."
- [ ] Decorative images use `alt=""`
- [ ] No `title` attributes used as a substitute for `alt`

### Color Contrast

- [ ] All body text meets 4.5:1 contrast ratio against its background (check both palettes)
- [ ] All small/caption text (14px) meets 4.5:1 contrast ratio
- [ ] All large text (18px+ or 14px+ bold) meets 3:1 contrast ratio
- [ ] Interactive elements (links, buttons) meet 3:1 contrast against adjacent non-text
- [ ] Verify these specific pairs:
  - `#3A3338` on `#FAF7F4` (Palette A text on bg)
  - `#2F2623` on `#FBF6F0` (Palette B text on bg)
  - `#3A3338` on `#EDE7DF` (Palette A text on surface)
  - `#2F2623` on `#EBD9CF` (Palette B text on surface)
  - `#A89B91` on `#FAF7F4` (Palette A neutral/caption on bg)
  - `#8E7568` on `#FBF6F0` (Palette B neutral/caption on bg)
  - Button text on accent background (both palettes)

### Keyboard Navigation

- [ ] All interactive elements are reachable via Tab key in a logical order
- [ ] Focus rings are visible: 2px solid `var(--color-accent-light)`, 1px offset
- [ ] No focus traps (modals and sheets must allow Escape to close)
- [ ] Sheet (mobile nav) returns focus to the hamburger button on close
- [ ] Dialog (lightbox) returns focus to the trigger image on close
- [ ] Accordion items are keyboard-operable (Enter/Space to toggle)
- [ ] Carousel dot navigation is keyboard-accessible

### Skip Link

- [ ] `SkipLink` component exists (created in Task 4) and is the first focusable element
- [ ] Targets `<main>` with `id="main-content"`
- [ ] Visually hidden until focused, then positioned at top of viewport
- [ ] Styling: `var(--color-bg-primary)` background, `var(--color-accent)` text, 4px padding

### ARIA

- [ ] Hamburger menu button has `aria-label="Open navigation menu"`
- [ ] Sheet close button has `aria-label="Close navigation menu"`
- [ ] Dialog close button has `aria-label="Close image"`
- [ ] ChatButton has `aria-label="Open chat"`
- [ ] Social icon links in footer have `aria-label` with the platform name (e.g., `aria-label="Instagram"`)
- [ ] Form inputs are associated with `<label>` elements via `htmlFor`/`id` pairing
- [ ] Form error messages use `aria-live="polite"` for screen reader announcement
- [ ] Accordion uses proper `aria-expanded` state (handled by shadcn/Radix)

### Heading Hierarchy

- [ ] Each page has exactly one `<h1>`
- [ ] Headings follow sequential order: h1 → h2 → h3, no skips
- [ ] Home page: h1 is the hero headline
- [ ] Other pages: h1 is the page title
- [ ] No headings used purely for visual styling

### Touch Targets

- [ ] All buttons, links, and interactive elements are 44px minimum on mobile
- [ ] Navigation links in mobile Sheet have 44px minimum height
- [ ] Form inputs are 44px minimum height (already specified in Task 2)
- [ ] Carousel dots have adequate touch area (pad with transparent hit area if dots are small)

### Forms

- [ ] All required fields are marked (either with asterisk or "required" attribute)
- [ ] Error messages appear near the field that failed
- [ ] Success/error states are announced to screen readers
- [ ] Honeypot field is `aria-hidden="true"` and `tabindex="-1"` (not reachable by keyboard)

## Performance Checklist

### Images

- [ ] All images use the `ImageOptimized` component from Task 6
- [ ] Hero images use `loading="eager"`
- [ ] All other images use `loading="lazy"`
- [ ] All images have explicit `width` and `height` attributes (CLS prevention)

### Fonts

- [ ] All Fontsource imports use `font-display: swap` (verify in the CSS output)
- [ ] Critical fonts (Cormorant Garamond Regular, Raleway Light) are preloaded:
  ```html
  <link rel="preload" href="/fonts/cormorant-garamond-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/raleway-latin-300-normal.woff2" as="font" type="font/woff2" crossorigin />
  ```
  Determine the actual font file paths from the Fontsource package output. Only preload the two most critical files (heading regular + body light for initial render). The remaining weights and Palette B fonts load normally.

### JavaScript

- [ ] React islands hydrate independently (no bundle coupling)
- [ ] PaletteManager uses `client:only="react"` (no SSR)
- [ ] Other interactive islands use `client:visible` or `client:idle` where appropriate
- [ ] No render-blocking JS in `<head>`
- [ ] Motion library is tree-shaken (only imported in components that use it)

### CSS

- [ ] No unused Tailwind utilities shipped (Tailwind purges by default in production)
- [ ] Global CSS file is small (custom properties + base resets only)
- [ ] No duplicate style declarations

### General

- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1" />` is present (set in Task 1)
- [ ] `<html lang="en">` is set (set in Task 1)
- [ ] No `console.log` statements left in production code (except the contact form fallback logger)
- [ ] No unused imports in any component file

### Lighthouse Targets

These are goals, not hard requirements. Document the actual scores when checked.

| Category | Target |
|----------|--------|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 90+ |
| SEO | 95+ |

## What NOT to Do

- Do not add Google Analytics, Meta Pixel, Google Tag Manager, or any tracking scripts.
- Do not add a cookie banner or consent dialog.
- Do not modify visual design, colors, typography, or spacing.
- Do not add new features, pages, or components (beyond SEOHead and SchemaMarkup).
- Do not install analytics packages, performance monitoring, or error tracking.
- Do not modify the palette transition system or animation behavior.
- Do not add social media share buttons.
- Do not add a robots.txt manually (Astro + sitemap integration handles this).
- Do not remove the `/test-components` page from Task 2 (that cleanup happens separately).
