# Twilight Transition Demo — Paste This Into Sonnet Cowork Session

Copy everything below the line and paste it as a message in your Sonnet Cowork session. Do not modify it.

---

I need you to build an interactive visual demo using show_widget. This is a design evaluation tool for the TLC Photography website's twilight palette transition system. Read every word of this prompt before writing any code.

## What You're Building

A full-screen interactive demo that shows how the website's color palette transitions from daytime (Lavender & Sage) to evening (Golden Hour) over a simulated 1-hour window (5:00 PM to 6:00 PM). The demo must show TWO versions side by side so I can compare them and decide which direction to go:

**Version A — "Light to Light":** The current spec. Both palettes use light, warm backgrounds. The shift is subtle — cream to slightly warmer cream.

**Version B — "Light to Dark":** The evening palette uses deep, dark backgrounds. The shift is dramatic — the site visually darkens like the sky at sunset. Text inverts from dark-on-light to light-on-dark.

Both versions render simultaneously, side by side, controlled by a single shared slider and play button. I will drag the slider from 5:00 PM to 6:00 PM and watch both versions change in real time.

## The Color Values

### Daytime Palette — Lavender & Sage (both versions start here at 5:00 PM)

| Token | Role | Hex |
|-------|------|-----|
| --color-bg-primary | Page background | #FAF7F4 |
| --color-text-primary | Body/heading text | #3A3338 |
| --color-accent | Buttons, links, highlights | #9B8EC4 |
| --color-surface | Cards, sections | #EDE7DF |
| --color-neutral | Borders, subtle text | #A89B91 |
| --color-botanical-1 | Decorative accent | #C2CBB2 |
| --color-botanical-2 | Decorative accent | #D6DCCA |

### Version A End State — Golden Hour Light (6:00 PM)

| Token | Role | Hex |
|-------|------|-----|
| --color-bg-primary | Page background | #FBF6F0 |
| --color-text-primary | Body/heading text | #2F2623 |
| --color-accent | Buttons, links, highlights | #C08B76 |
| --color-surface | Cards, sections | #EBD9CF |
| --color-neutral | Borders, subtle text | #8E7568 |
| --color-botanical-1 | Decorative accent | #A3AB8E |
| --color-botanical-2 | Decorative accent | #DDD0B8 |

### Version B End State — Golden Hour Dark (6:00 PM)

| Token | Role | Hex |
|-------|------|-----|
| --color-bg-primary | Page background | #1C1714 |
| --color-text-primary | Body/heading text | #EBD9CF |
| --color-accent | Buttons, links, highlights | #C08B76 |
| --color-surface | Cards, sections | #2A231E |
| --color-neutral | Borders, subtle text | #6B5A4E |
| --color-botanical-1 | Decorative accent | #A3AB8E |
| --color-botanical-2 | Decorative accent | #DDD0B8 |

Note: In Version B, the text color INVERTS. Daytime has dark text (#3A3338) on light background (#FAF7F4). Evening has light text (#EBD9CF) on dark background (#1C1714). The crossover point where text flips from dark to light is the trickiest part of the transition — handle it carefully so there's never a moment where text becomes unreadable against the background. The accent color (#C08B76) is the same in both versions.

## Transition Mechanics

The transition uses 5 hand-picked waypoints at 15-minute intervals. Do NOT use linear RGB interpolation between the start and end colors — that produces muddy, gray midpoints. Instead, use the specific hex values provided below for each waypoint.

### Waypoints for Version A (Light to Light)

| Token | 5:00 PM | 5:15 PM | 5:30 PM | 5:45 PM | 6:00 PM |
|-------|---------|---------|---------|---------|---------|
| bg | #FAF7F4 | #FAF7F2 | #FBF7F1 | #FBF6F0 | #FBF6F0 |
| text | #3A3338 | #372F32 | #332B2C | #312827 | #2F2623 |
| accent | #9B8EC4 | #B28EAC | #C08B76 | #C69862 | #C9A45C |
| surface | #EDE7DF | #ECE2D9 | #EBDDD3 | #EBDAD0 | #EBD9CF |
| neutral | #A89B91 | #A09183 | #978676 | #907B6E | #8E7568 |
| botanical-1 | #C2CBB2 | #B8C3A5 | #ADBA99 | #A6B292 | #A3AB8E |
| botanical-2 | #D6DCCA | #D8D9C4 | #DAD5BD | #DCD2BA | #DDD0B8 |

### Waypoints for Version B (Light to Dark)

This is the dramatic version. Background darkens substantially. Text lightens substantially. The midpoints must maintain readable contrast at every step.

| Token | 5:00 PM | 5:15 PM | 5:30 PM | 5:45 PM | 6:00 PM |
|-------|---------|---------|---------|---------|---------|
| bg | #FAF7F4 | #D4C8BC | #8E7568 | #463832 | #1C1714 |
| text | #3A3338 | #5A4E48 | #9E8A7E | #C4AEA0 | #EBD9CF |
| accent | #9B8EC4 | #B28EAC | #C08B76 | #C69862 | #C08B76 |
| surface | #EDE7DF | #C4B8AE | #7A6A5E | #44382F | #2A231E |
| neutral | #A89B91 | #9A8C80 | #8A7C6E | #7A6B5C | #6B5A4E |
| botanical-1 | #C2CBB2 | #B8C3A5 | #ADBA99 | #A6B292 | #A3AB8E |
| botanical-2 | #D6DCCA | #D8D9C4 | #DAD5BD | #DCD2BA | #DDD0B8 |

Note on Version B accent: it transitions through the same warm path as Version A (lavender → mauve → rose → amber) but lands on dusty rose #C08B76 instead of golden honey #C9A45C. The golden honey doesn't read well on dark walnut backgrounds. This is intentional.

Between each waypoint, interpolate smoothly (CSS-style cubic-bezier or simple lerp between the two nearest waypoints). The waypoints define the control points — the transition between them should be smooth, not stepped.

## What the Demo Page Must Show

### Layout

Two columns, side by side, each showing a miniature website preview. Equal width. Label the left one "Version A: Light → Light" and the right one "Version B: Light → Dark" in a header above each column.

Below both columns: a single horizontal slider labeled with times from "5:00 PM" on the left to "6:00 PM" on the right, with marks at each 15-minute interval. Dragging the slider updates BOTH previews simultaneously.

Below the slider: a Play button that animates the slider from 5:00 PM to 6:00 PM over 10 seconds, then pauses. A Reset button returns to 5:00 PM.

Below the controls: a comparison table showing the current hex value of each token for both versions at the current slider position.

### What Each Mini-Preview Must Contain

Each mini-preview simulates a simplified photography website page. It must include:

1. A header bar with a text logo "TLC Photography" and three nav links ("Portfolio", "Services", "Contact"). The header background uses --color-surface. Text uses --color-text-primary. The active nav link is underlined with --color-accent.

2. A hero section below the header. Background uses --color-bg-primary. A large heading "Tender love lights the way." in a serif font (use Georgia as a stand-in). Below it, a subheading "Boutique portrait photography in Louisiana" in a sans-serif font. A button "Book a Consultation" styled with --color-accent background and --color-bg-primary text.

3. A section with two cards side by side. Each card has:
   - Background: --color-surface
   - A colored bar across the top edge using --color-botanical-1
   - A title in --color-text-primary (e.g., "Family Portraits", "Senior Sessions")
   - A short description line in --color-neutral
   - A small accent element (dot or line) in --color-accent

4. A footer bar. Background uses --color-botanical-2. Text uses --color-text-primary. Contains "admin@tlc-photography.com" and a copyright line.

Every element in the preview must use the CSS custom property tokens, not hardcoded colors. As the slider moves, every element updates in real time.

### Font Swap Indicator

At the 6:00 PM position (slider fully right), show a small badge on each preview that says "Font swap: Cormorant Garamond → Fraunces / Raleway → Outfit" to indicate where the font families would change. You don't need to actually load these fonts — Georgia and sans-serif stand-ins are fine. Just show the indicator so I know where it happens.

## Styling Rules for the Demo Itself

CRITICAL: I am viewing this in dark mode. The demo page's own background must be dark (#1a1a1a or similar). All labels, headings, slider text, and table text in the demo chrome (not the previews) must be light-colored and readable against a dark background. The mini-previews are the only elements that use the brand colors.

Do not use pure black (#000000) or pure white (#FFFFFF) anywhere in the demo or the previews. Use off-blacks and off-whites.

Give each mini-preview a subtle 1px border in #333 to separate it from the dark demo background.

The slider should have a visible track and thumb. Style it so it's easy to grab and drag.

The comparison table below should have a dark background (#222) with light text, and show color swatches (small colored squares) next to each hex value.

## Technical Requirements

- This must be a single self-contained HTML widget for show_widget. No external dependencies except fonts from CDN if needed.
- All JavaScript inline. All CSS inline.
- Smooth animation at 60fps when the slider is dragged or Play is running.
- The color interpolation between waypoints must use the provided hex values as control points, with smooth interpolation between them. Parse hex to RGB, lerp between the two nearest waypoints based on the slider position, convert back to hex.
- Total code can be long — this is a complex interactive demo. Do not simplify or cut corners on the preview fidelity. Every element listed above must be present and properly styled.
- Use requestAnimationFrame for the play animation.
- Make it responsive enough that it works in a window at least 900px wide. Below that, stack the two previews vertically instead of side by side.

## What NOT to Do

- Do not ask me clarifying questions. Build the demo with exactly what's specified here.
- Do not simplify the previews to just colored rectangles. They must look like miniature web pages with actual UI elements (header, hero, cards, footer).
- Do not use linear interpolation across the full range. Use the waypoint tables. Interpolate only between adjacent waypoints.
- Do not make the demo background light/white. I'm in dark mode.
- Do not add any colors, elements, or features not specified here.
- Do not use any of these words in labels or descriptions: "delve", "leverage", "utilize", "synergy". Just use plain English.
- Do not add sound, video, or particle effects.

Build this now. Show it to me using show_widget with the title "twilight_palette_transition_comparison".
