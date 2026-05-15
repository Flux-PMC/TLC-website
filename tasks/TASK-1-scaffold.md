# Task 1: Project Scaffold & Config

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
- NEVER run `npx` commands that scaffold new projects (except the initial `npm create astro` in Task 1).
- If `npm run dev` fails 3 times, stop and report.
- If a package install fails twice, stop and report.
- NEVER modify CLAUDE.md or any task file.

---

## What You Are Building

The project skeleton. No files exist yet. You create the Astro project, install dependencies, configure Keystatic CMS, set up CSS custom properties, create empty page routes, and verify the dev server starts.

## Steps

1. Initialize the Astro project: `npm create astro@latest -- --template minimal` in a new `tlc-photography` directory
2. Install all dependencies listed below
3. Configure Astro integrations (React, Tailwind, Cloudflare adapter, Keystatic)
4. Set up Keystatic CMS with the full content schemas below
5. Define CSS custom properties for the Palette A defaults on `:root`
6. Configure Tailwind to use CSS custom properties (config below)
7. Create the BaseLayout Astro component
8. Create empty placeholder page routes (no content, just BaseLayout wrapper)
9. Verify `npm run dev` starts with zero errors
10. STOP and report.

## Dependencies to Install

```
astro
@astrojs/react
@astrojs/tailwind
@astrojs/cloudflare
@keystatic/core
@keystatic/astro
react
react-dom
tailwindcss@^3
@fontsource/cormorant-garamond (weights: 300, 400)
@fontsource/raleway (weights: 300, 400, 500)
@fontsource/fraunces (weights: 300, 400)
@fontsource/outfit (weights: 300, 400)
lucide-react
```

Do NOT install anything else. No motion, no shadcn, no astro-seo, no @astrojs/sitemap, no resend.

## Page Routes (Empty Shells)

Each page imports BaseLayout, wraps content in it, contains zero markup beyond that.

```
/              → src/pages/index.astro
/portfolio     → src/pages/portfolio.astro
/services      → src/pages/services.astro
/about         → src/pages/about.astro
/blog          → src/pages/blog/index.astro
/blog/[slug]   → src/pages/blog/[slug].astro
/contact       → src/pages/contact.astro
```

## Keystatic Schemas

### Blog posts (collection)

- title (text, required)
- slug (text, derived from title)
- date (date, required)
- excerpt (text, required)
- coverImage (image, required)
- content (document/MDX)
- published (boolean, default false)

### Portfolio images (collection)

- title (text, required)
- image (image, required)
- category (select: families, couples, seniors, newborns, maternity, engagements)
- featured (boolean, default false)
- order (number)

### Testimonials (collection)

- clientName (text, required)
- sessionType (select: families, couples, seniors, newborns, maternity, engagements)
- quote (text, multiline, required)
- date (date)
- featured (boolean, default false)

### FAQ items (collection)

- question (text, required)
- answer (text, multiline, required)
- order (number)
- published (boolean, default true)

### Site settings (singleton)

- siteTitle (text)
- tagline (text)
- phone (text)
- email (text)
- calendlyUrl (text)
- chatbotUrl (text)

## CSS Custom Properties (Palette A Defaults)

Put these on `:root` in your global CSS file. The palette transition system will update these at runtime later. You are only setting the defaults.

```css
:root {
  --color-text-primary: #3A3338;
  --color-bg-primary: #FAF7F4;
  --color-accent: #9B8EC4;
  --color-surface: #EDE7DF;
  --color-accent-light: #DDD4EE;
  --color-neutral: #A89B91;
  --color-botanical-1: #C2CBB2;
  --color-botanical-2: #D6DCCA;

  --font-heading: 'Cormorant Garamond', Georgia, serif;
  --font-subheading: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Raleway', 'Helvetica Neue', sans-serif;
  --font-ui: 'Raleway', 'Helvetica Neue', sans-serif;
}
```

## Tailwind Config

Extend Tailwind to reference the CSS custom properties. This way every Tailwind class automatically shifts when the palette transitions.

```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          text: 'var(--color-text-primary)',
          bg: 'var(--color-bg-primary)',
          accent: 'var(--color-accent)',
          surface: 'var(--color-surface)',
          'accent-light': 'var(--color-accent-light)',
          neutral: 'var(--color-neutral)',
          'botanical-1': 'var(--color-botanical-1)',
          'botanical-2': 'var(--color-botanical-2)',
        }
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        subheading: ['var(--font-subheading)'],
        body: ['var(--font-body)'],
        ui: ['var(--font-ui)'],
      },
      spacing: {
        'section': '96px',
        'subsection': '48px',
      },
      maxWidth: {
        'site': '1200px',
      },
    },
  },
  plugins: [],
}
```

## BaseLayout Requirements

Create `src/layouts/BaseLayout.astro`:

- Import all 4 font families from Fontsource (all specified weights)
- Link the global CSS file that defines the custom properties
- `<html lang="en">`
- `<meta charset="UTF-8" />`
- `<meta name="viewport" content="width=device-width, initial-scale=1" />`
- `<title>` prop with fallback "TLC Photography"
- `<body>` styled with background `var(--color-bg-primary)` and color `var(--color-text-primary)`, font-family `var(--font-body)`
- Inside body: empty `<header>` placeholder, `<main>` with centered container (max-width 1200px, auto horizontal margins, responsive side padding), `<slot />` inside main, empty `<footer>` placeholder

## What NOT to Do

Everything below is OUT OF SCOPE. Do not do any of it.

- Do not build page content or UI components. Pages are empty shells.
- Do not implement the palette transition system. Only set Palette A defaults.
- Do not implement animations, hover effects, or interaction logic.
- Do not install or configure shadcn/ui components. Confirm React integration works in Astro (a test island is fine, then delete it).
- Do not write copy, placeholder text, or lorem ipsum.
- Do not set up the contact form backend.
- Do not reference or place logos. The logo does not exist yet.
- Do not create a dark mode toggle. The site uses time-based palette shifting, not a user toggle.
- Do not use Tailwind default colors anywhere.
- Do not create components, partials, or layouts beyond BaseLayout and the empty pages.
- Do not add analytics, meta pixel, Google Tag Manager, or any tracking.
- Do not use an Astro starter template or theme. Start from `--template minimal`.
- Do not set up CI/CD, GitHub Actions, or deployment workflows.
- Do not create test files or testing infrastructure.
