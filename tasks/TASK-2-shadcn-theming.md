# Task 2: shadcn/ui Component Theming

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

Installing and restyling 7 shadcn/ui component types to match TLC's design tokens. No page content. Just themed components ready for later use.

## Steps

1. Downgrade Tailwind to v3 — run `npm install tailwindcss@^3` before anything else. Task 1 installed Tailwind v4 which is incompatible with `@astrojs/tailwind` and the config approach used throughout this build. This must be v3.
2. Add `@astrojs/tailwind` back to the integrations array in `astro.config.mjs` — Task 1 had to omit it due to the v4 conflict. Now that v3 is installed it must be registered. Import it and add it to the integrations array alongside the existing react, keystatic, and cloudflare integrations.
3. Initialize shadcn/ui using the CLI (copy-to-source approach, NOT npm package dependency)
3. Add these 7 component types: Sheet, Dialog, Accordion, Button, Input, Textarea, Label
4. Restyle each component per the specs below — replace all default shadcn colors, shadows, and borders with TLC design tokens
5. Create a temporary test page at `/test-components` that renders every themed component so you can visually verify
6. Confirm all components render correctly with TLC tokens
7. STOP and report.

## Packages to Install

Run `npm install tailwindcss@^3` first (see Step 1). Then install whatever the shadcn/ui CLI requires (typically `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/*` primitives). Follow the shadcn init process. Do NOT install anything beyond what shadcn needs.

## Component Styling Specs

Every spec below replaces shadcn defaults. Strip out all default shadcn shadows, borders, and color values. Use only TLC design tokens.

### Button

Primary variant:
- Background: `var(--color-accent)`
- Text color: `var(--color-bg-primary)`
- Font: `var(--font-ui)`, 14px, uppercase
- Letter-spacing: 1.5px
- Padding: 12px top/bottom, 32px left/right
- Border-radius: 4px
- Border: none
- Shadow: none
- Hover: opacity 0.85
- Transition: opacity 0.2s ease

Secondary/outline variant:
- Background: transparent
- Text color: `var(--color-accent)`
- Border: 1px solid `var(--color-accent)`
- Same padding, radius, font as primary
- Hover: background `var(--color-accent-light)`

Disabled state:
- Opacity 0.5
- cursor: not-allowed

### Input

- Background: `var(--color-bg-primary)`
- Border: 1px solid `var(--color-surface)`
- Border-radius: 4px
- Padding: 12px top/bottom, 16px left/right
- Font: `var(--font-body)`, 16px
- Text color: `var(--color-text-primary)`
- Placeholder color: `var(--color-neutral)`
- Focus: border-color `var(--color-accent)`, outline 2px solid `var(--color-accent-light)`, outline-offset 1px
- Shadow: none
- Height: minimum 44px (touch target)

### Label

- Font: `var(--font-ui)`, 14px
- Color: `var(--color-text-primary)`
- Margin-bottom: 4px
- Display: block

### Textarea

- Same as Input styling
- Min-height: 120px
- Resize: vertical only

### Sheet (Mobile Nav Drawer)

- Panel background: `var(--color-surface)`
- No overlay shadow
- Border-radius: 8px on the visible panel edge
- Close button: `var(--color-text-primary)`, 44px touch target
- Overlay: semi-transparent, `rgba(58, 51, 56, 0.4)` (derived from text-primary)

### Dialog (Portfolio Lightbox)

- Content background: `var(--color-bg-primary)`
- Border: 0.5px solid `var(--color-surface)`
- Border-radius: 8px
- Shadow: none (remove shadcn default shadow entirely)
- Overlay: `rgba(58, 51, 56, 0.6)` (derived from text-primary)
- Close button: `var(--color-text-primary)`, 44px touch target

### Accordion (FAQ)

- Item wrapper: background `var(--color-surface)`, border-radius 8px, padding 24px
- No borders between items. Use 8px vertical spacing (gap) between items instead.
- Trigger text: font `var(--font-heading)`, 18px, color `var(--color-text-primary)`
- Open/close indicator (chevron): color `var(--color-accent)`
- Content text: font `var(--font-body)`, 16px, color `var(--color-text-primary)`, line-height 1.6
- Animation: smooth height transition, 300ms ease-out

## Test Page

Create `/src/pages/test-components.astro` that renders:
- 2 Buttons (primary + secondary)
- 1 Input with Label
- 1 Textarea with Label
- 1 Sheet (with a trigger button)
- 1 Dialog (with a trigger button)
- 1 Accordion with 3 items

Use a linen (`var(--color-surface)`) background section and a cream (`var(--color-bg-primary)`) background section so you can see how components look on both surfaces.

This page is temporary. It will be removed later. Its only purpose is verification.

## What NOT to Do

- Do not build pages or page content
- Do not modify BaseLayout beyond what's needed for the test page
- Do not install Motion or any animation library
- Do not change any CSS custom property values on `:root`
- Do not add colors outside the brand palette
- Do not implement the palette transition system
- Do not build the Header, Footer, or any page-specific components
- Do not create new component types beyond the 7 listed above
