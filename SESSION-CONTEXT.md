# TLC Photography — Session Context (Persistent)

Do not delete this file. Read it at the start of every session or after compaction.


## People

- The photographer's initials are TLC (her actual initials, not just a play on tender love and care)
- She came from California, was a west coast vegan, became a boudin-eating southern belle by choice
- She picked up a slight southern accent from her fiancé whose drawl runs deep
- Her fiancé (JP, the user) handles all tech, web, branding, business infrastructure
- JP is not a web designer or developer by trade, but is very tech-savvy
- JP is the "webmaster" and second shooter; she focuses on the photography
- No names go to Google. No names in any file sent externally. Period.


## Location

- Current: Pineville/Alexandria, Louisiana
- Moving to: Monroe/West Monroe, Louisiana (1.5 hours north)
- Timeline: when the current house sells
- Maintaining clients and growth in both markets
- SEO should target both metro areas as service regions from day one


## Brand Identity

- Brand concept: "Two Kinds of Light"
- Design philosophy: "Pressed Light" (see TLC-Design-Philosophy.md)
- Two palettes that shift by time of day on the website:
  - Lavender & Sage (stable 9 AM - 5 PM): cool, calm, authority
  - Golden Hour (stable 6 PM - 8 AM): warm, intimate, amber
- Twilight transition: 1-hour windows with 5 hand-picked color waypoints at 15-min intervals
  - Evening: 5:00 PM → 6:00 PM (Lavender → Golden Hour)
  - Morning: 8:00 AM → 9:00 AM (Golden Hour → Lavender)
- Font swap at 6:00 PM / 9:00 AM: 600ms fade out, swap font-family, 600ms fade in (1.2s total)
- All materials outside the website (print, social, packaging) use Lavender & Sage exclusively
- Tagline: "Tender love lights the way." (written by JP, locked May 2 2026)
- Brand voice: Warm not bubbly, Southern not folksy, Confident not salesy, Poetic not precious
- Relationship: engaged (fiancé, not married)
- Bio: "TLC Photography is a boutique portrait studio serving central, northeast Louisiana, and beyond. The photographer behind it came from California, chose the South, and never looked back. She photographs families, couples, newborns, and graduating seniors, always chasing the moment after the pose, when the guard drops and something real surfaces. Her fiancé runs the business so she can stay behind the camera. Every image is crafted to last a lifetime and be passed to the next."
- Logo/wordmark: 7 Gemini concepts generated (May 2026). Final selection + vectorization pending.
- Claude cannot design logos. JP said "no logo for you."


## Tech Stack (Locked)

- Site: Astro
- CMS: Keystatic (git-based, visual editor for non-technical users)
- Hosting: Cloudflare Pages (free tier, unlimited bandwidth)
- Scheduling: Calendly (styled button link, not embedded. Quick description text next to it for people unfamiliar with online booking)
- Client galleries: Pixieset (sent direct to clients, not on the main site)
- Automation: Hermes agents for GBP replies, email follow-ups, post-session pipeline
- Email: admin@tlc-photography.com (Cloudflare email routing)
- Domain: tlc-photography.com (registered on Cloudflare)


## Website Structure (Locked)

Six pages:
1. Home — full-bleed hero, brand introduction
2. Portfolio — masonry with scroll-triggered reveals, staggered portrait/landscape, motion and intrigue, curated exhibit feel, NOT a basic photo grid
3. Services — session type descriptions, starting-at price ranges, "Book a Consultation" buttons linking to Calendly
4. About — the story, the California-to-Louisiana journey, the "Two Kinds of Light" philosophy
5. Blog — SEO, session spotlights, behind-the-scenes
6. Contact — basic info card (name, email, phone, message), ALL fields required, submit button greyed/disabled until all fields validate (email format, phone format, name not empty, message not empty), Calendly styled button link below the form, FAQ accordion (shadcn Accordion), optional chatbot iframe (floating lavender button opens JP's Vercel/Supabase bot)

Post-session flow: automated follow-up email for private reviews/feedback, handled by email service or Hermes agent. Reviews collected privately, best ones featured as testimonials.


## Design System Files (All in tlc-photography-website/)

- CLAUDE.md — Instructions for Claude Code (scoped to Phase 3 Task 1: scaffold & config only)
- DESIGN.md — Claude Design 9-section handoff file (original)
- DESIGN-final.md — updated with new transition timing (May 5, 2026)
- TLC-Brand-Style-Guide.pdf — landscape PDF style guide (original)
- TLC-Brand-Style-Guide-final.pdf — regenerated PDF (May 5, 2026)
- TLC-Design-Philosophy.md — "Pressed Light" aesthetic manifesto
- TLC-Brand-Decisions-Log.md — all locked creative and technical decisions (original)
- TLC-Brand-Decisions-Log-final.md — updated with new transition timing (May 5, 2026)
- logo-prompts-for-gemini.md — 6 logo generation prompts + vectorization pipeline
- gemini-brand-vibe-brief.md — brand essence brief to paste above Gemini logo prompts
- TLC-Claude-Project-Brief.md — consolidated brief for Claude projects (content generation)
- tlc-ecosystem-map.html — interactive architecture diagram of all services
- tlc-project-checklist.html — interactive project checklist with progress tracking
- tlc-master-build-plan.html — 7-phase build plan with expandable task cards


## Animation Decisions (Locked May 7, 2026)

All four effects approved via interactive demo. Motion library (formerly Framer Motion) for all.

1. Portfolio staggered entrance: Images fade in + rise from 30px below, 120ms stagger, 600ms duration, ease-out, IntersectionObserver fires once
2. Testimonial crossfade: Quote slides left (20px) + fades out, next slides in from right (20px) + fades in, 500ms, auto-advances every 6s, dot nav below
3. Session type card hover: Dark gradient slides up from bottom, caption appears (session name + one-liner), image scales to 1.03, 350ms ease-out. Mobile: tap toggles.
4. Services card expand: Description expands below price (max-height, 400ms), lavender accent line draws across bottom (scaleX 0 to 1, 350ms), image opacity drops to 0.88. ONE card at a time (not all three). Mobile: tap toggles.

Rejected: Ken Burns (cheesy), slow zoom on hover (cheesy/overused), bounce, overshoot, spring physics, parallax.

General: All scroll-triggered animations fire once. Respect prefers-reduced-motion. No animations over 500ms.


## Typography

- Daytime: Cormorant Garamond (headings), Raleway (body/UI)
- Evening: Fraunces (headings), Outfit (body/UI)
- Type scale: Hero 48px, H1 36px, H2 28px, H3 22px, Sub 18px, Body 16px, Small 14px, Button 14px
- No font-size-adjust. Each font renders at natural proportions.


## Color Quick Reference

Lavender & Sage: bg #FAF7F4, text #3A3338, accent #9B8EC4, surface #EDE7DF, neutral #A89B91, sage #C2CBB2
Golden Hour: bg #FBF6F0, text #2F2623, accent #C08B76, surface #EBD9CF, gold #C9A45C, neutral #8E7568


## User Preferences (Critical)

- HEIC screenshots can and must be converted
- JP is in dark mode — never use dark text on dark backgrounds in widgets
- present_files tool has sync issues with bash-generated files
- JP gets frustrated with repeated errors or claims of inability
- No filler openers, no buzzwords, no meta-commentary, no em dashes, no excessive bolding
- Only open source, locally hosted tools. No cloud services, no subscriptions (except Calendly and Pixieset which are already in use)
- OmniSVG is NOT an LLM. It's a diffusion model. Won't appear in LM Studio.
- When uncertain, look it up from primary source before stating it as fact


## Pending Work

- [x] Pick domain name (tlc-photography.com)
- [x] Set up email (admin@tlc-photography.com via Cloudflare routing)
- [x] Brand identity, voice, design system (all locked)
- [x] Design philosophy ("Pressed Light") written
- [x] Both color palettes designed with twilight transition waypoints
- [x] Typography pairs selected and font metrics measured
- [x] Spacing, layout grid, icon style, social templates all defined
- [x] Dark mode variants documented (optional, not for initial build)
- [x] Claude Design handoff file (DESIGN.md / DESIGN-final.md) completed
- [x] Brand Decisions Log completed with all rationale
- [x] Brand Style Guide PDF generated
- [x] Claude Project Brief for content generation completed
- [x] Logo concepts generated (7 via Gemini)
- [x] CLAUDE.md written for Claude Code (scoped to scaffold task)
- [x] shadcn/ui component shopping list locked (Sheet, Dialog, Accordion, Input, Textarea, Button, Label)
- [x] Animation/interaction patterns demoed and approved (4 effects locked May 7, 2026)
- [x] Component architecture decided (22 static Astro, 5 shadcn React islands, 7 custom React islands)
- [ ] Website scaffold (Astro + Keystatic + Cloudflare Pages config) — Claude Code working on this
- [ ] Twilight palette transition system implementation
- [ ] Page builds (6 pages)
- [ ] Contact form backend (Cloudflare Worker)
- [ ] Image pipeline (Cloudflare R2, optimization)
- [ ] SEO and performance pass
- [ ] Deploy and go live
- [ ] Logo final selection from 7 concepts (blocked on JP's review)
- [ ] Logo vectorization (blocked on selection)
- [ ] Logo clear-space and usage rules (blocked on vectorization)
- [ ] Calendly account setup
- [ ] shadcn/ui component theming (restyle to match TLC design tokens)
- [ ] Draft spin-off session prompts (Task #7)
- [ ] Build custom Claude skill for TLC brand tone management (separate session)
- [ ] Google Business Profile (after domain and logo)
- [ ] Tech stack completeness review (JP requested this)

### Later Upgrades (not blocking launch)
- [ ] Hermes agents for GBP replies, email follow-ups, post-session pipeline
