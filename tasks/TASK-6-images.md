# Task 6: Image Optimization Pipeline

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

An `ImageOptimized` Astro component that wraps Astro's built-in `<Image />` component. It generates responsive srcsets in WEBP format, provides blur-up placeholder loading, and prevents cumulative layout shift. After building the component, apply it to every image instance across all pages built in Task 4.

## Steps

1. Create `src/components/ImageOptimized.astro`
2. Implement responsive srcset generation using Astro's Image component
3. Implement blur-up placeholder (tiny base64 inline image that transitions to full resolution)
4. Replace all `<img>` tags and Astro `<Image />` calls across all pages with `<ImageOptimized />`
5. Verify all images render correctly and have proper width/height attributes
6. STOP and report.

## Packages to Install

None. Astro's built-in `astro:assets` image handling is already available. No additional image packages.

## ImageOptimized Component

### Props

```typescript
interface Props {
  src: ImageMetadata | string;  // Astro image import or path
  alt: string;                   // Required. Descriptive alt text.
  widths?: number[];             // Responsive widths for srcset. Default: [400, 800, 1200, 1600]
  aspectRatio?: string;          // e.g., "4/5", "3/2". Default: undefined (natural ratio)
  class?: string;                // Additional CSS classes
  loading?: 'lazy' | 'eager';   // Default: 'lazy'
  quality?: number;              // WEBP quality 1-100. Default: 80
  sizes?: string;                // Custom sizes attribute. See defaults below.
}
```

### Output Requirements

For each image, the component produces:

- **Format:** WEBP (Astro's image service handles conversion)
- **Srcset:** Multiple widths from the `widths` prop, each as a WEBP variant
- **Sizes attribute:** If not provided via prop, use this default based on typical layout context:
  ```
  (max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw
  ```
- **Width and height:** Always set explicit `width` and `height` attributes to prevent CLS (Cumulative Layout Shift). Derive from the source image's intrinsic dimensions.
- **Border-radius:** Apply `border-radius: 4px` via inline style or class (consistent with brand rules).
- **Object-fit:** `object-fit: cover` when an `aspectRatio` is provided.

### Blur-Up Placeholder

Generate a tiny (20px wide) base64-encoded version of each image at build time. Display this inline as the initial state, then transition to the full image on load.

Implementation approach:

1. Use Astro's `getImage()` function to generate a 20px-wide thumbnail at quality 10
2. Encode as base64 data URI
3. Set as `background-image` on a wrapper `<div>` with `background-size: cover`
4. The `<img>` element loads on top with `opacity: 0` initially
5. On the `load` event, transition to `opacity: 1` over 400ms
6. Use `filter: blur(20px)` on the placeholder wrapper, transitioning to `blur(0)` when the full image loads
7. Respect `prefers-reduced-motion`: skip the opacity/blur transition, show the image immediately

### CSS for Blur-Up

```css
.image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  background-size: cover;
  background-position: center;
}

.image-wrapper img {
  display: block;
  width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity 400ms ease-out;
}

.image-wrapper img.loaded {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .image-wrapper img {
    opacity: 1;
    transition: none;
  }
}
```

The blur effect on the placeholder can be achieved with a CSS `backdrop-filter` or by applying `filter: blur(20px); transform: scale(1.1)` to the background wrapper (scale prevents blur edge artifacts).

### JavaScript for Load Detection

Use a small inline `<script>` or Astro's built-in mechanisms. No React island needed. A simple `onload` handler that adds the `loaded` class:

```html
<img onload="this.classList.add('loaded')" ... />
```

## Applying to Pages

Replace every image across all pages built in Task 4. Use the correct props for each context:

### Hero Images (Home page)

```astro
<ImageOptimized
  src={heroImage}
  alt="[descriptive alt text]"
  loading="eager"
  widths={[800, 1200, 1600, 2400]}
  sizes="100vw"
/>
```

- `loading="eager"` because hero images are above the fold
- Full viewport width srcset
- No aspect ratio constraint (hero fills its container via CSS)

### Portfolio Grid Images

```astro
<ImageOptimized
  src={image}
  alt="[descriptive alt text]"
  loading="lazy"
  aspectRatio="4/5"
  widths={[400, 600, 800]}
  sizes="(max-width: 640px) 50vw, 33vw"
/>
```

- `loading="lazy"` because these are below the fold
- 4:5 portrait aspect ratio (per DESIGN-final.md gallery spec)
- Smaller widths since images display at 1/2 or 1/3 viewport width

### Blog Cover Images

```astro
<ImageOptimized
  src={coverImage}
  alt="[descriptive alt text]"
  loading="lazy"
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 100vw, 60vw"
/>
```

### About Page Images

```astro
<ImageOptimized
  src={aboutImage}
  alt="[descriptive alt text]"
  loading="lazy"
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 100vw, 58vw"
/>
```

- 58vw because images take 7 of 12 columns on desktop (per text/image split layout)

### Services Page Images (Session Type Cards)

```astro
<ImageOptimized
  src={sessionImage}
  alt="[descriptive alt text]"
  loading="lazy"
  aspectRatio="4/5"
  widths={[400, 600, 800]}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

## Alt Text Rules

Every image must have descriptive alt text. Follow these rules:

- Describe what's shown in the photo, not that it's a photo. ("Family of four laughing on a porch" not "Image of a family")
- Keep it under 125 characters.
- Do not start with "Image of..." or "Photo of..." or "Picture of..."
- For decorative images that convey no information, use `alt=""` (empty string, not omitted).
- For placeholder images that don't exist yet, use descriptive alt text for what the image will eventually show (e.g., "Newborn session in natural light").

## What NOT to Do

- Do not set up Cloudflare R2 or any external image hosting. Images are local/Keystatic for now.
- Do not modify page layouts, section structure, or content beyond swapping image tags.
- Do not add new pages or components (beyond ImageOptimized itself).
- Do not modify the Astro config's image service settings.
- Do not install sharp, squoosh, or any image processing package. Use Astro's built-in image service.
- Do not create a separate build script or CLI tool for image processing.
- Do not add `<link rel="preload">` for images here. That happens in Task 7.
