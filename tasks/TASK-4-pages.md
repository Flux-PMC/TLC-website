# Task 4: Header, Footer, Pages, and React Islands

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
- No box-shadows, drop-shadows, gradients, or glow effects (except the approved dark gradient overlay in SessionTypeCards Effect 3).
- No Google Fonts CDN. Fonts are self-hosted via Fontsource packages.
- Respect `prefers-reduced-motion` for all animations. When set, disable all animations entirely (static display, no fallback to slower motion).
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

All page content, the site header, footer, all 7 custom React islands, a legal/privacy page, and a custom 404 page. This is the largest task. Take it section by section.

## Packages to Install

```
motion
```

Motion (formerly Framer Motion) is used by PortfolioGrid, TestimonialCarousel, SessionTypeCards, and ServiceCards. This is the ONLY package to install. Nothing else.

## Build Order

Build in this order to minimize broken dependencies:

1. Header (static Astro)
2. Footer (static Astro)
3. Static helper components (SectionWrapper, CalendlyButton, SageAccent, BlogCard, etc.)
4. React islands (PaletteManager already exists from Task 3)
5. Pages (wire everything together)
6. Verify all pages render on desktop and mobile

## Header

File: `src/components/Header.astro`

- Position: sticky top
- Background: `var(--color-surface)`
- Left: the vectorized logo already located at `public/TLC-logo.svg`. Reference it as `<img src="/TLC-logo.svg" alt="TLC Photography" />`. Link the image to `/`. Height 40px, width auto. No text fallback needed — the logo contains the wordmark.
- Right: nav links — "Portfolio", "Services", "About", "Blog", "Contact"
- Nav font: `var(--font-ui)`, 14px, uppercase, letter-spacing 1.5px
- Active link: color `var(--color-accent)`, 1.5px solid bottom border in `var(--color-accent)`
- Hover: color `var(--color-accent)`
- Mobile (< 768px): hide text nav links. Show hamburger button (Lucide Menu icon, 44px touch target). Hamburger opens the Sheet component (from Task 2) as a mobile nav drawer.
- Sheet content: same nav links as desktop, stacked vertically, each link is a full-width tappable row with 44px minimum height, padding 16px. Close button (Lucide X icon) top-right.
- Container: max-width 1200px, centered, responsive horizontal padding (16px mobile, 32px tablet, 48px desktop)

## Footer

File: `src/components/Footer.astro`

- Background: `var(--color-botanical-2)`
- Text color: `var(--color-text-primary)`
- No phone number.
- Three content groups in the main footer row:
  1. Left: "TLC Photography" in `var(--font-heading)` 18px, then "Tender love lights the way." in `var(--font-subheading)` 14px italic `var(--color-neutral)`, then "admin@tlc-photography.com" in `var(--font-body)` 14px as a mailto link in `var(--color-text-primary)`.
  2. Center: nav links stacked vertically — Portfolio, Services, About, Blog, Contact. Font `var(--font-ui)` 14px uppercase letter-spacing 1.5px. Hover: `var(--color-accent)`.
  3. Right: social icon links — Lucide Instagram and Facebook icons, 1.5px stroke, 24px, link to `#` for now. Displayed side by side with 16px gap.
- Bottom bar (below a 1px `var(--color-botanical-1)` divider line): "© 2026 TLC Photography. All rights reserved." in `var(--font-body)` 13px `var(--color-neutral)`, then a separator " · ", then a link to `/legal` with text "Legal & Privacy" in the same style. Entire bottom bar centered.
- Max-width 1200px centered
- Padding: 48px top/bottom on the main row, 24px top/bottom on the bottom bar, responsive horizontal padding
- Layout: on desktop, three groups spread horizontally. On mobile, stack all groups vertically, center-aligned, 32px gap between groups.

## Static Astro Components

Create each as its own file in `src/components/`:

**SectionWrapper.astro** — Wrapper with 96px vertical padding (64px mobile). Accepts `bg` prop for background color override (default: transparent). Centers content with max-width 1200px.

**CalendlyButton.astro** — Renders a shadcn Button (primary variant) that links to the Calendly URL from Keystatic site settings. Opens in new tab. Below the button, a short description paragraph in `var(--font-body)` 14px `var(--color-neutral)`. Accepts `description` prop for the text.

**SageAccent.astro** — A small horizontal line divider, 40px wide, 2px height, color `var(--color-botanical-1)`, centered. Used as a visual separator between sections.

**BlogCard.astro** — Card for blog listing. Props: title, date, excerpt, coverImage, slug. Card: bg `var(--color-bg-primary)`, 0.5px border `var(--color-surface)`, border-radius 8px. Image at top (aspect-ratio 3/2, object-fit cover, 4px top border-radius). Title in `var(--font-heading)` 22px. Date in `var(--font-body)` 14px `var(--color-neutral)`. Excerpt in `var(--font-body)` 16px. Entire card is a link to `/blog/{slug}`.

**SkipLink.astro** — Accessibility skip-to-content link. Visually hidden until focused. On focus: appears at top-left, bg `var(--color-accent)`, text `var(--color-bg-primary)`, padding 8px 16px, z-index 9999. Links to `#main-content`.

## React Islands

All React islands go in `src/components/` with `.tsx` extension. Each uses `client:visible` or `client:only="react"` as noted.

### TestimonialCarousel.tsx

Hydration: `client:visible`
Props: `testimonials` array of `{ clientName, sessionType, quote }`

Behavior (Effect 2 — Crossfade):
- One quote visible at a time
- Current quote: slides left (translateX to -20px) and fades out (opacity to 0)
- Next quote: slides in from right (translateX 20px to 0) and fades in (opacity 0 to 1)
- Transition: 500ms duration, ease-out
- Auto-advances every 6 seconds
- Dot indicators below: one dot per testimonial, active dot filled with `var(--color-accent)`, inactive dots outlined
- Clicking a dot jumps to that quote and resets the auto-advance timer
- Layout: centered text, max-width 600px. Quote in `var(--font-subheading)` 18px italic. Client name below in `var(--font-ui)` 14px `var(--color-neutral)`.
- `prefers-reduced-motion`: no slide/fade, instant swap

### PortfolioGrid.tsx

Hydration: `client:visible`
Props: `images` array of `{ title, src, alt, category }`

Layout: CSS grid, 3 columns desktop, 2 columns mobile, 8px gap. Images: aspect-ratio 4/5 (portrait), object-fit cover, border-radius 4px.

Behavior (Effect 1 — Stagger Entrance):
- IntersectionObserver fires once when grid enters viewport
- Each image: opacity 0 to 1, translateY 30px to 0
- 120ms stagger between items
- 600ms duration per item
- ease-out timing
- `prefers-reduced-motion`: show all immediately, no animation

Click: opens Dialog (lightbox) showing the full image. Dialog closes on overlay click, Escape key, or close button.

No category filter tabs. No sorting. The portfolio is one curated set.

### SessionTypeCards.tsx

Hydration: `client:visible`
Props: `sessions` array of `{ name, description, image, startingPrice }`

Layout: grid, 3 columns desktop, 2 tablet, 1 mobile. Gap 24px.

Each card: image fills card (aspect-ratio 4/5, object-fit cover, border-radius 4px), position relative. The overlay and caption are positioned absolute over the image.

Behavior (Effect 3 — Hover Reveal):
- Default: image only, no overlay
- Hover: dark gradient overlay slides up from bottom — `linear-gradient(to top, rgba(58,51,56,0.85) 0%, transparent 100%)`. Caption appears inside gradient: session name in heading font 20px cream (`var(--color-bg-primary)`), one-line description in body font 12px cream at 80% opacity. Image behind scales to 1.03. All transitions 350ms ease-out.
- Mouse out: everything reverses, same timing
- Mobile: tap toggles overlay on/off (use state toggle on click, not CSS hover)
- `prefers-reduced-motion`: overlay appears instantly, no slide or scale

### ServiceCards.tsx

Hydration: `client:visible`
Props: `services` array of `{ name, description, image, startingPrice }`

Layout: vertical stack, one card at a time full-width, max-width 800px centered. Gap 24px.

Each card: bg `var(--color-surface)`, border-radius 8px, padding 24px. Image section on left (or top on mobile), text section on right (or bottom on mobile). Name in heading font 22px. Price in ui font 14px `var(--color-neutral)` ("Starting at $X").

Behavior (Effect 4 — Card Expand):
- Hover: description expands below price line. max-height 0 to content height, 400ms ease-out. Opacity fades 0 to 1 with 100ms delay. 2px lavender accent line draws across card bottom (scaleX 0 to 1, transform-origin left, 350ms ease-out). Image section opacity drops from 1.0 to 0.88. No zoom, no scale.
- CONSTRAINT: only ONE card expands at a time. Hovering a different card collapses the previous one.
- Mobile: tap toggles. Same one-at-a-time rule.
- `prefers-reduced-motion`: expand/collapse instantly, no animation

### ContactForm.tsx

Hydration: `client:only="react"` (needs full client-side JS for validation)
Props: none (self-contained)

Fields: name (Input), email (Input), phone (Input), message (Textarea). All use the themed shadcn Input/Textarea/Label from Task 2.

All 4 fields required. Validation:
- Name: non-empty after trim
- Email: valid email format (basic regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Phone: digits, dashes, parens, spaces, plus only. Min 7 chars. Regex: `/^[+\d\s()-]{7,20}$/`
- Message: non-empty after trim

Honeypot: hidden field named "website" (`<input type="text" name="website" style="display:none" tabIndex={-1} autoComplete="off" />`). If filled, silently reject (send request anyway but backend handles it).

Submit button: shadcn Button primary variant. Text "Send Message". Disabled (opacity 0.5, cursor not-allowed) until all 4 visible fields pass validation. On submit: button shows "Sending..." with disabled state. Sends POST to `/api/contact` with JSON body `{ name, email, phone, message, website }`.

Success: replace form with green confirmation message "Thank you! We'll be in touch soon." in `var(--color-botanical-1)`.
Error: show red error message below the form. Allow retry.

### ChatButton.tsx

Hydration: `client:only="react"`
Props: `chatbotUrl` (string)

Floating button: fixed position, bottom-right corner (bottom 24px, right 24px). Bg `var(--color-accent)`, border-radius 50%, 56px diameter, 44px min touch target. Lucide MessageCircle icon in `var(--color-bg-primary)`.

Click: opens an overlay with an iframe. Overlay: fixed, full viewport on mobile, 400x600px panel bottom-right on desktop. Iframe `src` = `chatbotUrl`. Close button (Lucide X) top-right of the overlay.

Iframe loads lazily: only set the `src` when the button is first clicked. Before click, no iframe exists in the DOM.

If `chatbotUrl` is empty or undefined, do not render the button at all.

## Page Builds

### Home (`src/pages/index.astro`)

1. Hero section: full-bleed, min-height 80vh (60vh mobile). Use a placeholder `<div>` with bg `var(--color-surface)` and a text overlay until real images arrive. Centered text overlay, max-width 600px:
   - Headline: "Tender love lights the way." — `var(--font-heading)` 48px, text-center
   - Subheading: "Boutique portrait photography in Louisiana" — `var(--font-subheading)` 18px italic, text-center
   - CTA: CalendlyButton or a link-styled Button to `/contact`

2. Brand intro: SectionWrapper. Short paragraph about TLC Photography. Left-aligned text. SageAccent divider above.

3. Featured portfolio: SectionWrapper. 3-4 image placeholders in a row (use `var(--color-surface)` divs). Link to /portfolio.

4. Testimonials: SectionWrapper. TestimonialCarousel island. Feed testimonials from Keystatic (or hardcode 2-3 placeholder quotes if Keystatic has no data yet — use generic text like "Placeholder testimonial text" with clientName "Client Name").

5. Session type preview: SectionWrapper. Brief heading ("Find Your Session"), then SessionTypeCards island with 3 session types only (Families, Couples, Seniors). Pass placeholder images and prices as props, same as the full version. Each card links to `/services` on click (wrap cards in an anchor or handle via onClick navigation) — this is a teaser that drives visitors to the Services page, not a destination. The full 6-session SessionTypeCards island lives on the Services page. Do not add a "See all sessions" text link — the card click is the CTA.

96px spacing between all sections. SageAccent between some sections for visual rhythm.

### Portfolio (`src/pages/portfolio.astro`)

1. Page title: "Portfolio" in heading font 36px
2. PortfolioGrid island with images from Keystatic portfolio collection
3. If no images in Keystatic yet, render a placeholder message "Portfolio images coming soon" in neutral color

### Services (`src/pages/services.astro`)

1. Page title: "Services" in heading font 36px
2. Intro paragraph about TLC's approach
3. Add this exact comment on its own line, immediately after the intro paragraph: `{/* SessionQuiz island — built in Task 8. Do not remove this comment. */}` — Task 8 will replace it with the actual component. Do not build anything here now.
4. SessionTypeCards island: all 6 session types (Families, Couples, Seniors, Newborns, Maternity, Engagements). Use placeholder images (colored divs) and placeholder prices. This is the full version — all 6 types, no links to /services (the user is already here).
5. ServiceCards island: same 6 types with expandable descriptions
6. CalendlyButton after the services section

### About (`src/pages/about.astro`)

1. Page title: "About" in heading font 36px
2. Text/image split sections: 5 columns text, 7 columns image on desktop. Alternating sides (first section: text left image right, second: image left text right).
3. Content: placeholder text about the photographer's story, the California-to-Louisiana journey, the "Two Kinds of Light" philosophy.
4. Image slots: placeholder divs with `var(--color-surface)` background.
5. Mobile: stack vertically, image first.

### Blog (`src/pages/blog/index.astro`)

1. Page title: "Journal" in heading font 36px
2. Grid of BlogCard components from Keystatic blog collection
3. If no posts, show "Stories coming soon" in neutral color
4. 3 columns desktop, 2 tablet, 1 mobile

### Blog Post (`src/pages/blog/[slug].astro`)

1. BreadcrumbNav at top: Home > Journal > [Post Title]. Font ui 14px, links in accent color.
2. Cover image placeholder (full-width, aspect-ratio 16/9, 4px radius)
3. Title in heading font 36px
4. Date in body font 14px neutral color
5. MDX content from Keystatic, styled with body font 16px, line-height 1.6
6. Max-width 720px for readability

### Contact (`src/pages/contact.astro`)

1. Page title: "Get in Touch" in heading font 36px
2. ContactForm island on a surface-colored card (bg `var(--color-surface)`, border-radius 8px, padding 32px)
3. Below form: CalendlyButton with description "Schedule a free consultation to discuss your session"
4. FAQ section: heading "Common Questions" in heading font 28px. Accordion island populated from Keystatic FAQ collection. If no FAQ items, hardcode 3-4 placeholder questions (e.g., "What should we wear?", "How long until we get our photos?", "Do you travel for sessions?", "What's included in a session?") with placeholder answers.
5. ChatButton island: floating, loads chatbotUrl from Keystatic site settings

### Legal & Privacy (`src/pages/legal.astro`)

A static text page. No islands. No placeholder content — use the exact copy below verbatim. Max-width 720px, left-aligned, same body styles as the blog post template.

Page title: "Legal & Privacy" in heading font 36px.

Structure: each section uses an H2 heading in heading font 28px, a SageAccent divider below each heading, then body text at 16px line-height 1.6. 64px vertical spacing between sections.

---

**Copy to use (verbatim):**

**Section 1 — Privacy Policy**

Heading: "Privacy Policy"

Body:
When you use the contact form on this site, we collect the name, email address, phone number, and message you provide. This information is used solely to respond to your inquiry. It is not sold, rented, or shared with third parties.

Your IP address is used temporarily to prevent contact form abuse and is not stored or logged beyond that purpose.

This site offers an optional chat assistant accessible via the button in the lower right corner. The assistant is hosted by a third-party service. Conversations may be stored or processed by that service according to its own terms. Use of the assistant is entirely optional.

This site does not use advertising cookies, tracking pixels, or third-party analytics. No data about your visit is shared with advertisers.

Questions: admin@tlc-photography.com

---

**Section 2 — Website Terms of Use**

Heading: "Website Terms of Use"

Body:
This website and all content on it — including all photographs, written copy, and design — are the property of TLC Photography and are protected by United States copyright law. All rights reserved.

Images and content from this site may not be reproduced, distributed, displayed, or used without prior written permission from TLC Photography. Unauthorized use of photographs is a violation of federal copyright law.

This site is provided for informational purposes. TLC Photography makes no warranties regarding the accuracy or completeness of site content. Governing law: Louisiana.

---

**Section 3 — Photography Service Policies**

Heading: "Photography Service Policies"

Intro paragraph:
The following policies apply to all portrait sessions. A full Photography Service Agreement is provided and must be signed before any session is confirmed. Pricing is available upon request — contact us to discuss your session.

Then render these as a definition list or styled label/value pairs (use `var(--font-ui)` 14px uppercase for the label, `var(--font-body)` 16px for the value):

Retainer — A non-refundable retainer of 25% of the session fee is required within 48 hours of signing your agreement to hold your session date. Under Louisiana civil law, this retainer constitutes liquidated damages and is non-refundable under all circumstances.

Balance Due — The remaining balance is due no later than 48 hours before your session. Accepted payment methods: Stripe, Zelle, cash, or check. Gallery delivery is withheld until all payments are received in full.

Cancellation — 14 or more days before: retainer forfeited only. 7–13 days before: retainer plus 25% of remaining balance. Fewer than 7 days before: retainer plus 50% of remaining balance. If TLC Photography must cancel due to emergency or illness, you receive a full refund or the option to reschedule at no cost.

Rescheduling — One complimentary reschedule is permitted with at least 48 hours written notice, within 2 months of the original date. Short-notice rescheduling (under 48 hours) incurs a $75 fee. Weather-related rescheduling for outdoor sessions is never penalized.

Gallery Delivery — 12 fully edited, high-resolution images delivered via private Pixieset gallery within 2–3 weeks of your session. Gallery remains active for 90 days. Rush editing (48-hour delivery) is available for an additional fee if requested before the session.

Your Images — All delivered images include full print rights for personal use. You may print at any lab of your choice. Images may not be used for commercial purposes without a separate written agreement. Images may not be filtered, color-altered, or otherwise edited by anyone other than TLC Photography. Cropping for framing or social media use is permitted.

Additional Images — After gallery delivery, additional edited images are available at $12 per image. Gallery upgrades to 50 edited selects are available for $175 (standard sessions and above; not available for Mini sessions).

Copyright — TLC Photography retains full copyright and ownership of all images created during your session. You receive a personal use license conditioned on receipt of full payment. Images may not be sold, licensed, or transferred to third parties.

Portfolio & Marketing Use — Whether TLC Photography may use images from your session for portfolio, website, or social media is your choice and is documented in your signed agreement. Sensitive session types (maternity, etc.) require your approval before any images are shared publicly. You will never be identified by name without your explicit permission.

---

**Section 4 — Copyright Notice**

Heading: "Copyright"

Body:
All photographs on this website are © 2026 TLC Photography. All rights reserved. Unauthorized reproduction, distribution, or commercial use of any image is prohibited and constitutes copyright infringement under 17 U.S.C. § 501. To request licensing or usage permissions, contact admin@tlc-photography.com.

---

### 404 (`src/pages/404.astro`)

Astro's custom 404 page — renders automatically when any URL is not found. No islands. No animations. Static only.

1. Full BaseLayout wrapper with title "Page Not Found — TLC Photography"
2. Centered content, max-width 600px, 128px top padding
3. SageAccent divider
4. Heading: "Page Not Found" — `var(--font-heading)` 36px, text-center
5. Subheading: "The page you're looking for has moved or doesn't exist." — `var(--font-subheading)` 18px italic, text-center, `var(--color-neutral)`
6. 32px spacing, then two buttons centered, side by side on desktop and stacked on mobile with 12px gap:
   - Primary Button: "Go Home" — links to `/`
   - Secondary Button: "View Portfolio" — links to `/portfolio`

---

## Rejected Effects — Do NOT Implement These

- Ken Burns (slow pan/zoom on hero images) — rejected as "cheesy"
- Slow zoom on hover for service cards — rejected ("Very ASPCA in the arms of an angel")
- Bounce or overshoot easing — rejected
- Spring physics — rejected
- Parallax scrolling — rejected

## What NOT to Do

- Do not build the contact form backend (Task 5 handles the API endpoint)
- Do not set up image optimization (Task 6)
- Do not add SEO meta tags or structured data (Task 7)
- Do not embed Calendly widgets (button links only, opens in new tab)
- Do not reference or place logo image files
- Do not remove the test-components page from Task 2 (leave it, or remove it — either is fine)
- Do not add any animation effects not listed in this file
- Do not add category filter tabs to the portfolio
