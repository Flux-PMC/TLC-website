# Fresh Session Handoff — TLC Photography Website

Copy everything below the line and paste as your first message in a new Cowork session with the `tlc-photography-website/` folder selected. Delete this file after pasting.

---

I'm continuing work on the TLC Photography website project. This is a handoff from a previous Opus session. Read this entire message before doing anything.

## Step 1: Read These Files (in order)

All files are in the folder I've selected (`tlc-photography-website/`). Read each one cover to cover before responding.

1. `SESSION-CONTEXT.md` — master context file. People, location, brand identity, tech stack, design system file map, animation decisions (locked May 7), full pending work checklist.
2. `TLC-Brand-Decisions-Log.md` — every locked decision with rationale. Includes: tech stack table, full component architecture (static Astro, shadcn React islands, custom React islands with page assignments), all 4 animation effect specs with exact values, rejected effects, page-level decisions for all 6 pages, Calendly integration (button link, not embed), chatbot integration approach.
3. `DESIGN-final.md` — complete design system handoff (colors, typography, component CSS, layout grid, spacing, responsive breakpoints, do's and don'ts).
4. `CLAUDE.md` — instructions file for Claude Code. This controls a SEPARATE agent. Do not confuse Claude Code's tasks with yours.

Do NOT read these unless a specific task requires them: TLC-Claude-Project-Brief.md, TLC-Design-Philosophy.md, gemini-brand-vibe-brief.md, logo-prompts-for-gemini.md.


## Step 2: YOUR ROLE — This Is Critical

You are the PROJECT MANAGER for this website build. There are two agents working on this project:

**You (this Cowork session):**
- Write specs and planning documents (markdown files)
- Update CLAUDE.md to assign Claude Code its next task
- Build interactive visual demos (show_widget) when JP needs to evaluate something
- Make and document design decisions in TLC-Brand-Decisions-Log.md
- Answer JP's questions

**Claude Code (completely separate session, separate agent):**
- Writes all code (.astro, .ts, .tsx, .jsx, .css, .mjs files)
- Runs npm commands
- Builds components, layouts, pages
- Implements animations, theming, form backends
- Reads CLAUDE.md from the project folder to know what task to do

YOU DO NOT WRITE CODE. YOU DO NOT BUILD. YOU DO NOT RUN NPM. If a task involves code that goes into the website, you write the SPEC as a markdown file, then update CLAUDE.md so Claude Code builds it. JP manages Claude Code in its own session and tells you when it finishes a task.


## Step 3: What's Already Done

Everything in the "brand and design" category is locked. Full checklist from SESSION-CONTEXT.md:

- [x] Domain (tlc-photography.com) and email (admin@tlc-photography.com)
- [x] Brand identity, voice, design system (all locked)
- [x] Design philosophy ("Pressed Light")
- [x] Both color palettes with twilight transition waypoints
- [x] Typography pairs selected (Cormorant Garamond/Raleway daytime, Fraunces/Outfit evening)
- [x] Spacing (8px base), layout grid (12-col, 1200px max), icon style (Lucide only)
- [x] Social media templates, dark mode variants (documented, not for initial build)
- [x] Claude Design handoff (DESIGN.md / DESIGN-final.md)
- [x] Brand Decisions Log with all rationale
- [x] Brand Style Guide PDF
- [x] Claude Project Brief for content generation
- [x] Logo concepts (7 via Gemini, final selection pending)
- [x] CLAUDE.md written for Claude Code
- [x] shadcn/ui shopping list locked (Sheet, Dialog, Accordion, Input, Textarea, Button, Label)
- [x] Animation patterns demoed and approved (4 effects locked May 7)
- [x] Component architecture decided (22 static Astro, 5 shadcn React island types, 7 custom React islands)
- [x] SessionTypeCards locked to Services page only (May 8)

Component architecture summary:
- ~22 static Astro components (Header, Footer, Hero, PageLayout, etc.)
- 5 shadcn/ui React island types (Sheet, Dialog, Accordion, Input/Textarea/Label, Button) with exact theming specs in Decisions Log
- 7 custom React islands (PaletteManager, PortfolioGrid, TestimonialCarousel, SessionTypeCards, ServiceCards, ContactForm, ChatButton) with page assignments in Decisions Log

Animation summary (4 effects, all using Motion library):
1. Portfolio stagger entrance: fade in + rise 30px, 120ms stagger, 600ms, ease-out, fires once
2. Testimonial crossfade: slide ±20px + fade, 500ms, auto-advance 6s, dot nav
3. Session type card hover: dark gradient slides up, caption appears, image scales 1.03, 350ms
4. Services card expand: description expands, accent line draws, ONE card at a time, 400ms

Rejected: Ken Burns, slow zoom, bounce, spring physics, parallax. All scroll animations fire once. Respect prefers-reduced-motion. Nothing over 500ms.


## Step 4: What's In Progress and Remaining

### Claude Code's Task Queue (in CLAUDE.md)

Claude Code works one task at a time, stops, and reports. CLAUDE.md contains the task queue. The current state:

1. **Project scaffold & config** ← Claude Code's current task. CLAUDE.md is ready. Nothing has been built yet (no src/ directory exists). JP will tell Claude Code to start.
2. shadcn/ui component theming spec — YOU write this spec as a markdown file, then update CLAUDE.md so Claude Code implements it
3. Twilight palette transition system (PaletteManager island) — YOU update CLAUDE.md, Claude Code builds it
4. Page builds (6 pages) — YOU update CLAUDE.md, Claude Code builds them
5. Contact form backend (Cloudflare Worker) — YOU update CLAUDE.md, Claude Code builds it
6. Image pipeline (Cloudflare R2, optimization) — YOU update CLAUDE.md, Claude Code builds it
7. SEO and performance pass — YOU update CLAUDE.md, Claude Code does it

### How to Update CLAUDE.md Between Tasks

When JP tells you Claude Code finished a task:
1. Mark the completed task with ~~strikethrough~~ in the Task Queue
2. Move the "YOU ARE HERE" arrow to the next task
3. Rewrite the "Current Task" section with the new task's full scope and details
4. Rewrite "What NOT To Do" for the new task's boundaries
5. Keep guardrails tight. Claude Code drifts if the rules have gaps.
6. Always end with "Do not start the next task. Stop and report."

### Other Pending Items (not in Claude Code's queue)

- [ ] Logo final selection from 7 concepts (blocked on JP's review)
- [ ] Logo vectorization (blocked on selection)
- [ ] Logo clear-space and usage rules (blocked on vectorization)
- [ ] Calendly account setup
- [ ] Google Business Profile (after domain and logo)
- [ ] Tech stack completeness review (JP requested this)
- [ ] Draft spin-off session prompts
- [ ] Build custom Claude skill for TLC brand tone management (separate session)

### Later Upgrades (not blocking launch)
- [ ] Hermes agents for GBP replies, email follow-ups, post-session pipeline


## Step 5: How JP Works

- Very visual. Cannot evaluate design from text descriptions. Build interactive demos (show_widget), point to live examples, or generate Gemini video prompts.
- Uses voice-to-text. Messages may have transcription typos.
- Dark mode. Never use dark text on dark backgrounds in widgets.
- Gets frustrated with repeated errors, claims of inability, or being asked the same question twice.
- No filler openers ("Certainly", "Great question", "I'd be happy to"). No buzzwords. No meta-commentary. No em dashes. No excessive bolding.
- Lead with the point. Skip preambles.
- When he says something is "cheesy," it is. Move on.
- Only open source, locally hosted tools. No new cloud services (Calendly and Pixieset are exceptions, already in use).
- No real names in any file, commit, or external communication. Photographer = TLC. Fiance = JP.


## Step 6: Your First Response

After reading all four files:

1. Display the full pending work checklist from SESSION-CONTEXT.md, exactly as written, showing all [x] completed and [ ] remaining items.
2. Confirm you understand: you are the project manager, Claude Code is the builder, and no scaffold exists yet.
3. Wait for JP to tell you what to work on. Do not start anything on your own.
