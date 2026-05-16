# TLC Photography — Full Session Context
# Updated: 2026-05-15 (post-fix-commit verification)
# Read this entire file before doing anything. It supersedes CLAUDE.md for session orientation.

---

## CRITICAL SITUATION

A fix commit EXISTS but is NOT on main. Branch `claude/gallant-maxwell-5da721` contains commit `4d04442 Bug fix pass: audit fixes 1-21 (Tasks 1-4)`. **17 of 21 fixes are confirmed in that commit. 4 fixes are missing. 5 additional open issues remain unfixed.**

**Before running Task 5:**
1. Merge `claude/gallant-maxwell-5da721` → `main`
2. Apply the 9 remaining fixes listed in "REMAINING FIXES" below
3. Verify build passes
4. Commit and push to `origin/main`

Every Claude Code prompt you write must end with a git commit block. See "How to Write Prompts" below.

---

## Project Overview

**What:** Boutique photography website for TLC Photography (Louisiana portrait photographer).
**People:** Photographer = TLC. Her fiancé JP handles tech/business. No real names in code or commits.
**Repo:** `/Users/jp/Documents/business/flux/projects/tlc-photography-website/`
**App root:** `tlc-photography/` (the Astro project is inside the parent folder)
**Live target:** Cloudflare Pages. Domain: `tlc-photography.com`

---

## Tech Stack

- **Astro 6** — static site generator, island architecture
- **React 18** — islands only (interactive components). Hydration: `client:visible`, `client:load`, `client:only`
- **Tailwind v3** — utility classes only where used; design system is CSS custom properties
- **shadcn/ui** — components copied as source into `src/components/ui/`. Not an npm dep.
- **Motion (motion/react)** — formerly Framer Motion. Already installed (`motion: ^12.38.0`)
- **Cloudflare Pages + Workers** — hosting and API routes
- **Keystatic CMS** — git-based CMS (configured, not yet used for live content)
- **@fontsource** — self-hosted fonts. NO Google Fonts CDN ever.
- **mimetext** — already installed (`^3.0.28`). Used in Task 5 contact worker.

**Installed packages:** See `tlc-photography/package.json`. Do not upgrade versions.

---

## Design System (Non-Negotiable Rules)

**Colors:** Always `var(--color-*)`. Never hardcode hex. Never pure black/white.
**Fonts:** Always `var(--font-*)`. Never `font-family: 'Raleway'` etc.
**Spacing:** Always `var(--space-*)`. Never `px` for spacing (exception: 1px borders, 4px border-radius).
**Text:** Body text left-aligned always. Center ONLY for hero headlines.
**Images:** 4px border-radius. Rectangles only. No circles/ovals.
**Shadows:** No box-shadow, drop-shadow, glow, or gradients.
**Animations:** Always respect `prefers-reduced-motion`.
**Icons:** Lucide only. 1.5px stroke, 24px grid, outlined (no filled).

**Two palettes (time-based, toggled by PaletteManager island):**
- Palette A "Lavender & Sage" — 9AM–5PM (default/daytime)
- Palette B "Golden Hour" — 6PM–8AM (evening/night)
- Twilight: 5 waypoints over 15-min intervals at 5:45PM and 8:45PM
- Font swap at same times: A = Cormorant Garamond + Raleway, B = Fraunces + Outfit
- CSS custom properties in `:root` and `[data-palette="golden"]`

**All CSS tokens:** See `tlc-photography/src/styles/global.css`
**Full brand decisions:** See `tlc-photography/DESIGN-final.md` and `tlc-photography/TLC-Brand-Decisions-Log.md`

---

## What's Complete (Tasks 1–4)

- Project scaffold, Astro config, Cloudflare adapter configured
- shadcn/ui component theming applied
- Palette transition system (PaletteManager island, CSS variables, font imports)
- All pages scaffolded: home, portfolio, services, about, blog/index, blog/[slug], contact
- Header (sticky, responsive, desktop nav + MobileNav island)
- Footer (brand, nav, social icons)
- SkipLink component
- Components: SectionWrapper, SageAccent, CalendlyButton, SessionTypeCards, TestimonialCarousel, ContactForm, FAQAccordion, ChatButton, ImagePlaceholder, LightboxGallery

**But:** Content is placeholder. Images are empty. Portfolio/blog arrays are `[]`. Fix bugs below still need finishing.

---

## Git State (Verified 2026-05-15)

```
origin/main:                  41638b3  task 4 complete: header, footer, pages, react islands
local main:                   a55b4c5  Tasks 1-4: scaffold, theming, palette, pages and islands
claude/gallant-maxwell-5da721: 4d04442  Bug fix pass: audit fixes 1-21 (Tasks 1-4)  ← FIX BRANCH
```

The fix branch contains the commit but was never merged to main. Local main was never pushed to origin.

**What the next Claude Code session must do:**
```bash
cd /path/to/tlc-photography-website
git checkout main
git merge claude/gallant-maxwell-5da721
# then apply remaining fixes, build, commit, push
```

---

## CONFIRMED FIXES (in commit 4d04442 — verified by file inspection)

These are DONE. Do not re-apply them.

1. **tailwind.config.mjs** — `tailwindcss-animate` imported and added to plugins array
2. **BaseLayout.astro** — `description` prop now optional, renders conditionally; italic font imports added for Cormorant Garamond (300-italic, 400-italic) and Fraunces (300-italic, 400-italic)
3. **ServiceCards.tsx** — hardcoded colors removed, uses CSS vars
4. **ContactForm.tsx** — `color: '#B45252'` replaced with `color: 'var(--color-accent)'`
5. **CalendlyButton.astro** — rewritten with guard: renders nothing when no `calendlyUrl` prop; `role="button"` removed from `<a>`
6. **TestimonialCarousel.tsx** — hardcoded colors removed; `reducedMotion` initialized from system preference; pause on hover/focus added
7. **MobileNav.tsx** — `aria-label="Open navigation menu"` added to hamburger button; `<SheetTitle className="sr-only">Navigation Menu</SheetTitle>` added
8. **BlogCard.astro** — `width="800" height="533"` added to thumbnail img (CLS fix)
9. **Header.astro** — `width="auto"` removed from logo img (invalid HTML)
10. **PaletteManager.tsx** — `framer-motion` references removed; uses plain React + `useEffect`; applies opacity fade to `document.body`
11. **SageAccent.astro** — `aria-hidden="true"` added (was missing `="true"`)
12. **PortfolioGrid.tsx** — hardcoded colors removed; `width={600} height={750}` added to images; `reducedMotion` initialized from system preference
13. **ChatButton.tsx** — `aria-label="Open chat assistant"` added
14. **Footer.astro** — `© 2026` replaced with `© {new Date().getFullYear()}`
15. **FAQAccordion.tsx** — `framer-motion` import removed; uses shadcn accordion directly
16. **index.astro** — SessionTypeCards block removed (violates May 8 lock); `previewSessions` array removed; `SessionTypeCards` import removed; 1200px breakpoint added to `.hero-content`
17. **SkipLink.astro** — colors fixed: `background-color: var(--color-text-primary)` (charcoal), `color: var(--color-bg-primary)` (cream) — ~9.5:1 contrast
18. **contact.astro** — `.contact-form-card { padding: 32px; }` → `padding: var(--space-2xl);`

---

## REMAINING FIXES (must apply before Task 5)

These 9 items are NOT in the fix commit. Apply them all in one Claude Code session after merging the fix branch.

### REM-1 — `src/components/ContactForm.tsx` — success state text-align
```tsx
// FIND (around line 97):
style={{
  padding: 'var(--space-2xl)',
  textAlign: 'center',
}}

// CHANGE TO:
style={{
  padding: 'var(--space-2xl)',
  textAlign: 'left',
}}
```
Reason: Design rule — body text left-aligned always.

### REM-2 — `src/components/ContactForm.tsx` — aria-hidden missing value
```tsx
// FIND (honeypot input, around line 126):
aria-hidden

// CHANGE TO:
aria-hidden="true"
```
Reason: In TSX, bare `aria-hidden` without a value is invalid. Must be `aria-hidden="true"`.

### REM-3 — `src/styles/global.css` — add global focus-visible styles
At the end of global.css, add:
```css
:focus-visible {
  outline: 2px solid var(--color-accent-light);
  outline-offset: 1px;
  border-radius: 2px;
}
```
Reason: Task 7 accessibility spec requires visible focus rings. These are the global defaults.

### REM-4 — `src/components/Footer.astro` — font-size below minimum
```css
/* FIND (around line 188): */
font-size: 13px;

/* CHANGE TO: */
font-size: var(--text-small);
```
`var(--text-small)` = 14px per design system. 13px is below the minimum.

### REM-5 — `src/styles/global.css` — session-card-overlay hardcoded rgba
```css
/* FIND: */
.session-card-overlay {
  background: linear-gradient(
    to top,
    rgba(58, 51, 56, 0.85) 0%,
    transparent 100%
  );
}

/* CHANGE TO: */
.session-card-overlay {
  background: linear-gradient(
    to top,
    var(--color-overlay-dark, rgba(58, 51, 56, 0.85)) 0%,
    transparent 100%
  );
}
```
Then add `--color-overlay-dark: rgba(58, 51, 56, 0.85);` to the `:root` block in global.css.

### REM-6 — `src/components/Header.astro` — logo 404
`/public/TLC-logo.svg` does not exist. Replace the `<img>` with a text fallback:
```astro
<!-- REMOVE: -->
<img
  src="/TLC-logo.svg"
  alt="TLC Photography"
  height="40"
  style="height: 40px; width: auto;"
/>

<!-- REPLACE WITH: -->
<span class="logo-text">TLC Photography</span>
```
Add to `<style>` block:
```css
.logo-text {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 400;
  color: var(--color-text-primary);
  white-space: nowrap;
}
```
When the real SVG is ready, swap back to `<img>` with integer `width` and `height` (not `width="auto"`).

### REM-7 — `src/components/Footer.astro` — broken /legal link
```astro
<!-- FIND (around line 73): -->
<a href="/legal" class="legal-link">Legal & Privacy</a>

<!-- REPLACE with: -->
<span>© {new Date().getFullYear()} TLC Photography. All rights reserved.</span>
```
No /legal page exists. Remove the link. The year dynamic expression already exists from the confirmed fix — simplify the footer-bottom content to just the copyright line.

### REM-8 — `src/pages/services.astro` — missing section IDs for quiz deep links
Task 8 SessionQuiz links to `/services#families`, `/services#couples`, etc. Add `id` attributes to each session section wrapper. Find the `<SectionWrapper>` or wrapper div for each of the 6 session types and add the matching id:
- `id="families"` on the Families section
- `id="couples"` on the Couples section
- `id="seniors"` on the Seniors section
- `id="newborns"` on the Newborns section
- `id="maternity"` on the Maternity section
- `id="engagements"` on the Engagements section

### REM-9 — `tlc-photography/astro.config.mjs` — missing site property
```javascript
// FIND:
export default defineConfig({
  adapter: cloudflare(),

// CHANGE TO:
export default defineConfig({
  site: 'https://tlc-photography.com',
  adapter: cloudflare(),
```
Required for Task 7's sitemap integration.

---

## OPEN ISSUES (lower priority, can be done alongside or after remaining fixes)

**OPEN-1 — SkipLink prefers-reduced-motion guard missing**
`transition: top 0.2s;` in SkipLink.astro has no reduced-motion guard. Add after existing `.skip-link:focus` rule:
```css
@media (prefers-reduced-motion: reduce) {
  .skip-link { transition: none; }
}
```

**OPEN-2 — services.astro missing `settings` variable for Task 8**
When Task 8 runs, it needs `settings?.calendlyUrl`. The services.astro page doesn't import from Keystatic yet. The Task 8 prompt should use this fallback in services.astro:
```astro
const calendlyUrl = '';
```
And pass: `<SessionQuiz client:visible calendlyUrl={calendlyUrl} />`
The empty string is fine — Keystatic integration comes after Task 8.

---

## TASK 5 — ALREADY COMPLETE. DO NOT RE-RUN.

`src/pages/api/contact.ts` was committed in `a55b4c5` alongside Tasks 1-4. The full implementation exists: validation, honeypot, rate limiting, email via Cloudflare Workers binding, CORS headers, error handling. `wrangler.jsonc` also already has the email binding.

**CLAUDE.md is wrong** — it lists Task 5 as current. It's done. The next task to run is Task 6.

**One fix needed before Task 6 runs:**
`devDependencies` is completely empty. `@cloudflare/workers-types` is missing. The `import { EmailMessage } from "cloudflare:email"` relies on this for type resolution. Without it, the TypeScript build may emit errors or use `any` silently. Add as part of the remaining-fixes prompt:
```
npm install --save-dev @cloudflare/workers-types
```
Also update `tsconfig.json` to reference the types if needed — add `"types": ["@cloudflare/workers-types"]` to `compilerOptions`.

Note: the file uses `from "mimetext/browser"` not `from "mimetext"`. This is correct — Cloudflare Workers run in a Service Worker environment and the `/browser` subpath is the right export. Not a bug.

---

## TASK 6 — Image Optimization Issues to Fix Before Running

**Issue 1 — Missing git commit instruction.** Add to prompt: "After build passes: `cd tlc-photography && git add -A && git commit -m 'feat: ImageOptimized component (Task 6)'`"

**Issue 2 — base64 blur-up won't work on Cloudflare.** The spec calls for `getImage()` to produce a 20px thumbnail encoded as a base64 data URI. `getImage()` returns a URL string, not base64 data. On Cloudflare, that URL is a CDN path that cannot be inlined. Replace the entire base64 blur-up approach with this:
- Wrapper `background-color: var(--color-surface)` as the placeholder (no inline image needed)
- Keep the `load` event → `.loaded` class → `opacity` transition — that part is correct
- Remove all `getImage()` blur-thumbnail code
- The wrapper CSS becomes simply: `background-color: var(--color-surface); overflow: hidden; border-radius: 4px;`

**Issue 3 — No real images exist yet.** Most pages have empty arrays or placeholder divs:
- `portfolio.astro`: `portfolioImages = []` — nothing to replace
- `blog/index.astro` and `blog/[slug].astro`: `posts = []` — nothing to replace
- `about.astro`: uses `<div class="image-placeholder">` divs, not `<img>` tags
- `Header.astro`: text fallback after REM-6 — no img tag
- The only real `<img>` tags are in blog and session cards that might have placeholder paths

**Instruction for prompt:** "Only apply `ImageOptimized` where actual `<img>` tags with real or placeholder `src` values exist. Skip files where image arrays are empty. Do NOT modify `Header.astro`."

**Issue 4 — aspectRatio prop needs CSS.** The spec says "object-fit: cover when aspectRatio is provided" but without a matching height or `aspect-ratio` CSS, object-fit: cover does nothing. The wrapper div must get `style={aspectRatio ? \`aspect-ratio: ${aspectRatio}\` : undefined}`. Add this to the ImageOptimized component.

**Issue 5 — Public folder images won't get optimized.** Astro's image optimization only processes statically imported images (`import myImg from './photo.jpg'`). Images served from `public/` as string paths skip the optimizer — no WebP conversion, no srcset. When Keystatic images are added later, they'll likely be served from `public/` or an external URL. Document this limitation: string-path images pass through without optimization. Only imported image assets get full treatment.

**Issue 6 — `@cloudflare/workers-types`** — add it in the remaining-fixes prompt before Task 6 runs (see Task 5 note above).

---

## TASK 7 — SEO/A11y Issues to Fix Before Running

**Issue 1 — Missing git commit instruction.** Add to prompt: "After build passes: `cd tlc-photography && git add -A && git commit -m 'feat: SEO, accessibility, performance pass (Task 7)'`"

**Issue 2 — Duplicate title/meta tags.** BaseLayout already has bare `<title>` and `<meta name="description">` in the `<head>`. When SEOHead is added, these will duplicate. Fix: SEOHead renders those tags — remove the bare `<title>` and `<meta name="description">` from BaseLayout's `<head>` when adding SEOHead. Do not have both.

**Issue 3 — SEOHead `url` prop source.** The spec doesn't say where `url` comes from. Use `Astro.url.href` on each page and pass it as `canonicalUrl` prop. Each page already calls `<BaseLayout title="..." description="...">` — add `canonicalUrl={Astro.url.href}` there and thread it through to SEOHead.

**Issue 4 — Font preload paths will 404.** The spec hardcodes:
```
/fonts/cormorant-garamond-latin-400-normal.woff2
/fonts/raleway-latin-300-normal.woff2
```
Fontsource files are copied to `/_astro/` with hashed filenames at build time. These paths don't exist. **Skip the `<link rel="preload">` step entirely.** Fontsource with `font-display: swap` is sufficient. Tell Claude Code explicitly: "Do NOT add any `<link rel="preload">` tags for fonts."

**Issue 5 — JSON-LD sameAs contradiction.** The spec block shows real Instagram/Facebook URLs but the prose says "leave sameAs as an empty array." Use `"sameAs": []`. If Claude Code uses the URLs from the spec block, correct them.

**Issue 6 — DO NOT modify SkipLink.astro.** Task 7 accessibility checklist describes SkipLink styling as `var(--color-bg-primary)` background, `var(--color-accent)` text. The component was already fixed to use `var(--color-text-primary)` background (charcoal) for ~9.5:1 contrast — better than the spec. The Task 7 prompt MUST say: "Do NOT modify SkipLink.astro. It was fixed before this task with a higher-contrast color scheme and is correct as-is."

**Issue 7 — og-default.jpg can't be created programmatically.** The spec says "create a placeholder file at `public/og-default.jpg`." Claude Code cannot create a real JPEG. Instead, create a 1x1 pixel placeholder or copy an existing image and rename it. Tell Claude Code: "Create an empty placeholder at `public/og-default.jpg` — touch the file or copy any existing image there. It will be replaced with a real branded image later."

**Issue 8 — MobileNav Sheet close button missing aria-label.** The Task 7 accessibility checklist requires `aria-label="Close navigation menu"` on the Sheet close button. MobileNav.tsx currently does NOT have this on its SheetClose button (confirmed by grep). Task 7 must add it. Include in the a11y fix: find the `<SheetClose>` in MobileNav and add `aria-label="Close navigation menu"`.

**Issue 9 — LightboxGallery does not exist.** The checklist item about "Dialog close button has `aria-label='Close image'`" and "Lightbox returns focus to trigger on close" is N/A — `LightboxGallery.tsx` does not exist in the codebase. Skip those checklist items.

**Issue 10 — ContactForm uses `role="alert"` not `aria-live="polite"`.** The checklist says form errors should use `aria-live="polite"`. The current implementation uses `role="alert"` (which implies `aria-live="assertive"`). Assertive is actually more disruptive for form errors. Task 7 should change `role="alert"` to `aria-live="polite"` on the error container (or keep role="alert" and accept it — document the decision either way).

**Issue 11 — Carousel dot keyboard.** TestimonialCarousel dots ARE keyboard accessible (confirmed). Each dot is a `<button>` with `aria-selected` and `aria-label`. Checklist item is already satisfied.

**Issue 12 — Accordion keyboard.** Radix/shadcn Accordion handles Enter/Space natively. Already satisfied.

---

## TASK 8 — Session Quiz Issues to Fix Before Running

**Issue 1 — Missing git commit instruction.** Add to prompt: "After build passes: `cd tlc-photography && git add -A && git commit -m 'feat: SessionQuiz island (Task 8)'`"

**Issue 2 — `settings?.calendlyUrl` undefined.** `services.astro` has no `settings` variable. See OPEN-2 above. Before Task 8 runs, services.astro must define `const calendlyUrl = '';` and the island call must be `<SessionQuiz client:visible calendlyUrl={calendlyUrl} />`.

**Issue 3 — Section IDs must exist first.** REM-8 adds them. Run the remaining-fixes pass before Task 8. The quiz links to `/services#families` etc — those anchors must be in the DOM or the links go nowhere.

**Issue 4 — SageAccent cannot be used inside a React island.** `SageAccent` is an Astro component. The spec says to use it as a divider between two recommendations. Replace with an inline `<hr>`:
```tsx
<hr style={{ border: 'none', borderTop: '2px solid var(--color-botanical-1)', margin: 'var(--space-xl) 0' }} />
```

**Issue 5 — Button variant name mismatch.** The spec says "Use shadcn Button secondary/outline variant." The actual `button.tsx` in this project only has `primary` and `secondary` variants — there is no `outline` variant. Use `variant="secondary"` for unselected choices and `variant="primary"` for the briefly-selected state. Tell Claude Code: "The Button component has `primary` and `secondary` variants only. Use `secondary` for choices, `primary` for the selected state."

**Issue 6 — Button defaults must be overridden.** The Button component has `uppercase tracking-[1.5px] text-center` baked into its base class. Task 8 requires: `letter-spacing: normal`, `text-align: left`, `padding-left: 20px`. These CANNOT be set via variant — they must be inline styles or a `style` prop override:
```tsx
<Button
  variant={isSelected ? 'primary' : 'secondary'}
  style={{
    width: '100%',
    textAlign: 'left',
    paddingLeft: '20px',
    letterSpacing: 'normal',
    textTransform: 'none',
  }}
>
```
If `textTransform: 'none'` doesn't override the Tailwind `uppercase` class, add `!important` via a CSS class or use a wrapper. Tell Claude Code this explicitly.

**Issue 7 — Calendly link needs `target="_blank"`.** The result screen's "Book a consultation" CTA opens Calendly in a new tab per the spec. Add `target="_blank" rel="noopener noreferrer"` to the anchor element. The spec mentions "opening Calendly in a new tab" but doesn't spell out the attributes — add them.

**Issue 8 — services.astro uses SessionTypeCards AND ServiceCards.** The current services.astro imports both `SessionTypeCards` and `ServiceCards`. The SessionQuiz island is a separate addition above the session type list. Make sure the Task 8 prompt only adds the quiz — it must NOT remove or modify the existing session type display components.

---

## How to Write Claude Code Prompts (Lessons Learned the Hard Way)

Every prompt that creates or modifies files MUST:

1. **End with an explicit git commit:**
   ```
   When all steps are complete and `npm run build` exits 0 with no errors, run:
   cd tlc-photography && git add -A && git commit -m "descriptive message here"
   Then print the commit hash.
   ```

2. **Include per-fix verification after each edit:**
   ```
   After editing FILE, read FILE and confirm the string "NEW_VALUE" is present.
   If it is not present, the edit failed — apply it again before continuing.
   ```

3. **Specify exact before/after strings, not descriptions:**
   Bad: "Fix the padding to use a CSS variable"
   Good: "In src/pages/contact.astro, find `padding: 32px;` inside `.contact-form-card` and change it to `padding: var(--space-2xl);`"

4. **Keep batches under ~12 file edits.** Larger batches lose fixes silently.

5. **Build check before commit:**
   ```
   Run `cd tlc-photography && npm run build`. If it fails, fix the error before committing. Report the error if you cannot fix it in 2 attempts.
   ```

6. **Never assume a fix was applied.** After every batch, read the modified file and grep for the new value.

7. **The task file says "NEVER run any git commands"** — that safety rule is for the task files only. Your prompt (the instruction you give Claude Code) overrides this for the commit step. State clearly in your prompt: "Override the git restriction in the task file: you MUST commit after a successful build."

8. **Use XML tags for complex prompts (Claude 4):**
   ```xml
   <context>...</context>
   <task>...</task>
   <constraints>...</constraints>
   <verification>After each edit, read the file and assert the exact string is present.</verification>
   <commit>cd tlc-photography && git add -A && git commit -m "..." && echo "COMMITTED: $(git log --oneline -1)"</commit>
   ```

9. **Use a verification subprompt.** After the fix session closes, run a SEPARATE read-only Claude Code session: "Read FILE and tell me if the string 'EXPECTED_VALUE' is present. Do not edit anything." This catches silent failures before the next task runs.

---

## Prompt Template — Remaining Fixes

Use this as the basis for the next Claude Code session:

```
<context>
You are working on a TLC Photography Astro website. The repo is at:
/Users/jp/Documents/business/flux/projects/tlc-photography-website/
The Astro project root is inside: tlc-photography/

A fix commit exists on branch claude/gallant-maxwell-5da721 that has NOT been merged to main.
First, merge it. Then apply the 9 remaining fixes listed below.
</context>

<task>
Step 1: Merge the fix branch
  cd /Users/jp/Documents/business/flux/projects/tlc-photography-website
  git checkout main
  git merge claude/gallant-maxwell-5da721

Step 2: Install packages (merge added tailwindcss-animate to package.json; node_modules doesn't have it yet)
  cd tlc-photography
  npm install
  npm install --save-dev @cloudflare/workers-types

Step 3: Apply REM-1 through REM-9 (listed below)

Step 4: Run build check
  cd /Users/jp/Documents/business/flux/projects/tlc-photography-website/tlc-photography
  npm run build
  If build fails, fix the error before proceeding. Report the error if you cannot fix it in 2 attempts.

Step 5: Commit and push
  cd /Users/jp/Documents/business/flux/projects/tlc-photography-website
  git add -A
  git commit -m "fix: remaining fixes + install deps (REM-1 through REM-9)"
  git push origin main
  Print the output of: git log --oneline -3
</task>

<fixes>
REM-1: src/components/ContactForm.tsx
  Find: textAlign: 'center',
  Replace with: textAlign: 'left',
  (in the success state return block, around line 97)
  After editing: read the file and confirm 'textAlign: 'left'' is present.

REM-2: src/components/ContactForm.tsx
  Find: aria-hidden (bare, no value, on the honeypot input)
  Replace with: aria-hidden="true"
  After editing: read the file and confirm 'aria-hidden="true"' is present.

REM-3: src/styles/global.css
  At the END of the file, add:
  :focus-visible {
    outline: 2px solid var(--color-accent-light);
    outline-offset: 1px;
    border-radius: 2px;
  }
  After editing: read the file and confirm ':focus-visible' is present.

REM-4: src/components/Footer.astro
  Find: font-size: 13px;
  Replace with: font-size: var(--text-small);
  After editing: confirm 'var(--text-small)' replaces '13px'.

REM-5: src/styles/global.css
  Find the .session-card-overlay rule. Change rgba(58, 51, 56, 0.85) to var(--color-overlay-dark, rgba(58, 51, 56, 0.85)).
  Also add to the :root block: --color-overlay-dark: rgba(58, 51, 56, 0.85);
  After editing: confirm 'var(--color-overlay-dark' is present.

REM-6: src/components/Header.astro
  Remove the <img src="/TLC-logo.svg" ...> element entirely.
  Replace with: <span class="logo-text">TLC Photography</span>
  Add to <style> block: .logo-text { font-family: var(--font-heading); font-size: 18px; font-weight: 400; color: var(--color-text-primary); white-space: nowrap; }
  After editing: confirm '<img' is gone and 'logo-text' exists.

REM-7: src/components/Footer.astro
  Find: <a href="/legal" class="legal-link">Legal & Privacy</a>
  Remove it. The footer-bottom div should contain only the copyright span that FIX 16 already added.
  After editing: confirm '/legal' is not present.

REM-8: src/pages/services.astro
  Find each session type section wrapper (SectionWrapper or div) for Families, Couples, Seniors, Newborns, Maternity, Engagements.
  Add id="families", id="couples", id="seniors", id="newborns", id="maternity", id="engagements" to the respective wrapper element.
  After editing: confirm all 6 ids are present.

REM-9: tlc-photography/astro.config.mjs
  Find: export default defineConfig({
  Add site as first property: site: 'https://tlc-photography.com',
  After editing: confirm 'site: ' is present.
</fixes>

<constraints>
- OVERRIDE: The task files say "NEVER run git commands." Your instructions override this. You MUST run git merge, git commit, and git push as instructed above.
- All colors must use var(--color-*). Never hardcode hex values.
- Never hardcode pixel values for spacing. Use var(--space-*).
- Body text left-aligned always.
- Override the git restriction in the task file: you MUST commit and push after a successful build.
- Do not modify any other files beyond what is listed above.
- Do not add new features. These are fixes only.
</constraints>
```

---

## Verification Subprompt — Run After Every Fix Session

After the fix session closes and you see the commit hash, open a SEPARATE Claude Code session with this prompt. Do not combine it with fix work.

```
Read these files and report the exact current value for each check. Do NOT edit anything.

1. src/components/ContactForm.tsx — find the line with 'textAlign' in the success state return block. Report what it says.
2. src/components/ContactForm.tsx — find the honeypot input. Report the exact aria-hidden attribute value.
3. src/styles/global.css — does ':focus-visible' appear? Yes or no.
4. src/components/Footer.astro — find the footer-bottom font-size. Report the exact value.
5. src/styles/global.css — find '.session-card-overlay'. Report the background value.
6. src/components/Header.astro — does '<img' appear anywhere? Report yes or no.
7. src/components/Footer.astro — does '/legal' appear anywhere? Report yes or no.
8. src/pages/services.astro — list all id= attributes found in the file.
9. tlc-photography/astro.config.mjs — does 'site:' appear? Report yes or no and the value if yes.
10. package.json devDependencies — report all keys.
11. Run: git log --oneline -5 and report the output.
```

If any check fails, run the fix prompt again for just those items before proceeding to the next task.

---

## Reference Files (Read When Relevant)

| File | What's In It |
|------|-------------|
| `tlc-photography/DESIGN-final.md` | Color values, typography scale, spacing tokens, component CSS specs |
| `tlc-photography/TLC-Brand-Decisions-Log.md` | Every locked design decision, component architecture, animation specs, May 8 locks |
| `tlc-photography/SESSION-CONTEXT.md` | People, location, business context, pending items |
| `tlc-photography/tasks/TASK-5-contact-worker.md` | Contact API route spec |
| `tlc-photography/tasks/TASK-6-images.md` | ImageOptimized component spec |
| `tlc-photography/tasks/TASK-7-seo-a11y.md` | SEO, accessibility, performance checklist |
| `tlc-photography/tasks/TASK-8-session-quiz.md` | SessionQuiz island spec |

---

## Remaining Task Order

1. **FIRST — Remaining fixes prompt:** Merge `claude/gallant-maxwell-5da721` → main, apply REM-1 through REM-9, add `@cloudflare/workers-types` to devDependencies, build, commit, push.
2. **Task 5 — SKIP. Already complete.** `contact.ts` was shipped in `a55b4c5`. Do not re-run.
3. **Task 6 — Image optimization.** No base64 blur-up (use `background-color: var(--color-surface)`). Skip empty-image pages. Skip Header. Only touch files with real `<img>` tags. Commit required.
4. **Task 7 — SEO/A11y.** Skip font preloads. Use empty sameAs. Remove bare title/meta from BaseLayout when adding SEOHead. Do NOT modify SkipLink. Add MobileNav close button aria-label. Placeholder og-default.jpg. Commit required.
5. **Task 8 — Session quiz.** Use `const calendlyUrl = ''` in services.astro. Use `<hr>` not SageAccent. Button variant is `secondary`/`primary` (no `outline`). Override Button text-align and letter-spacing with inline styles. Confirm REM-8 section IDs exist first. Commit required.

After Task 8: Keystatic CMS wiring, real content (images, copy, blog posts), logo finalization, deploy to Cloudflare Pages.

---

## Current Confirmed File State (verified against fix branch 4d04442)

Fixes PRESENT in the branch (do not re-apply):
- `BaseLayout.astro` — description conditional; italic font imports for Cormorant + Fraunces ✅
- `tailwind.config.mjs` — tailwindcss-animate plugin ✅
- `ServiceCards.tsx` — CSS vars, no hardcoded colors ✅
- `CalendlyButton.astro` — guard for missing URL; no role="button" ✅
- `TestimonialCarousel.tsx` — CSS vars; pause on hover/focus ✅
- `MobileNav.tsx` — aria-label on hamburger; SheetTitle sr-only ✅
- `BlogCard.astro` — alt text; width/height on img ✅
- `Header.astro` — width="auto" removed ✅
- `PaletteManager.tsx` — framer-motion removed; body fade correct ✅
- `SageAccent.astro` — aria-hidden="true" ✅
- `PortfolioGrid.tsx` — CSS vars; image dimensions ✅
- `ChatButton.tsx` — aria-label ✅
- `Footer.astro` — dynamic year ✅
- `FAQAccordion.tsx` — framer-motion removed ✅
- `index.astro` — SessionTypeCards removed; 1200px breakpoint added ✅
- `SkipLink.astro` — charcoal bg / cream text (~9.5:1 contrast) ✅
- `contact.astro` — padding: var(--space-2xl) ✅
- `ContactForm.tsx` — #B45252 → var(--color-accent) ✅

Still needing fixes (from REM-1 through REM-9 above):
- `ContactForm.tsx:97` — textAlign: 'center' still present ❌
- `ContactForm.tsx:126` — aria-hidden missing ="true" ❌
- `global.css` — focus-visible styles not added ❌
- `global.css` — session-card-overlay rgba not using CSS var ❌
- `Footer.astro:188` — font-size: 13px still present ❌
- `Header.astro` — logo still 404 (/TLC-logo.svg does not exist) ❌
- `Footer.astro:73` — /legal link still present ❌
- `services.astro` — no section id attributes ❌
- `astro.config.mjs` — no site property ❌
