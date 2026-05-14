# Task 3: Twilight Palette Transition System

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

A React island called PaletteManager that reads the visitor's system clock and transitions all CSS custom properties between Palette A (Lavender & Sage, daytime) and Palette B (Golden Hour, evening). It also handles the font family swap at transition boundaries.

## Steps

1. Create `src/components/PaletteManager.tsx`
2. Add it to BaseLayout with `client:only="react"` (no SSR, client-side only)
3. Implement the waypoint interpolation system using the exact values below
4. Implement the font swap animation
5. Add debug mode via URL parameter
6. Test using `?time=17:30` and similar overrides
7. STOP and report.

## Packages to Install

None. This task uses React (already installed) and vanilla JS. No additional packages.

## Transition Schedule

- Evening transition: 5:00 PM to 6:00 PM (Palette A → Palette B)
- Morning transition: 8:00 AM to 9:00 AM (Palette B → Palette A, same waypoints in reverse)
- 9:00 AM to 5:00 PM: static Palette A, no interval running
- 6:00 PM to 8:00 AM: static Palette B, no interval running

## Waypoint Table

These are hand-picked values. Do NOT use linear RGB interpolation between start and end. Use these exact hex values as control points. Interpolate smoothly between adjacent waypoints only.

```
| Token                | 5:00 PM   | 5:15 PM   | 5:30 PM   | 5:45 PM   | 6:00 PM   |
|----------------------|-----------|-----------|-----------|-----------|-----------|
| --color-bg-primary   | #FAF7F4   | #FAF7F2   | #FBF7F1   | #FBF6F0   | #FBF6F0   |
| --color-text-primary | #3A3338   | #372F32   | #332B2C   | #312827   | #2F2623   |
| --color-accent       | #9B8EC4   | #B28EAC   | #C08B76   | #C69862   | #C9A45C   |
| --color-surface      | #EDE7DF   | #ECE2D9   | #EBDDD3   | #EBDAD0   | #EBD9CF   |
| --color-neutral      | #A89B91   | #A09183   | #978676   | #907B6E   | #8E7568   |
| --color-botanical-1  | #C2CBB2   | #B8C3A5   | #ADBA99   | #A6B292   | #A3AB8E   |
| --color-botanical-2  | #D6DCCA   | #D8D9C4   | #DAD5BD   | #DCD2BA   | #DDD0B8   |
```

Morning transition uses the same table in reverse: 8:00 AM = 6:00 PM column, 8:15 AM = 5:45 PM column, 8:30 AM = 5:30 PM column, 8:45 AM = 5:15 PM column, 9:00 AM = 5:00 PM column.

## Interpolation Logic

Here is the exact algorithm. Follow it precisely.

```typescript
// progress: 0.0 (start of transition) to 1.0 (end of transition)
// waypoints: array of 5 hex strings for one token, e.g. ['#FAF7F4','#FAF7F2','#FBF7F1','#FBF6F0','#FBF6F0']

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r,g,b].map(v => Math.round(v).toString(16).padStart(2,'0')).join('');
}

function interpolateWaypoints(waypoints: string[], progress: number): string {
  const p = Math.max(0, Math.min(1, progress));
  const pos = p * 4; // 5 waypoints = 4 segments
  const idx = Math.min(Math.floor(pos), 3);
  const frac = pos - idx;
  const [r1,g1,b1] = hexToRgb(waypoints[idx]);
  const [r2,g2,b2] = hexToRgb(waypoints[idx + 1]);
  return rgbToHex(
    r1 + (r2-r1) * frac,
    g1 + (g2-g1) * frac,
    b1 + (b2-b1) * frac
  );
}
```

Apply this for each of the 7 tokens. Set each result on `document.documentElement.style.setProperty('--token-name', value)`.

## Computing Progress

```typescript
function getTransitionProgress(now: Date): { progress: number; phase: 'day' | 'evening-transition' | 'night' | 'morning-transition' } {
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  const eveningStart = 17 * 60;       // 5:00 PM = 1020
  const eveningEnd = 18 * 60;         // 6:00 PM = 1080
  const morningStart = 8 * 60;        // 8:00 AM = 480
  const morningEnd = 9 * 60;          // 9:00 AM = 540

  if (totalMinutes >= morningEnd && totalMinutes < eveningStart) {
    return { progress: 0, phase: 'day' };
  }
  if (totalMinutes >= eveningStart && totalMinutes < eveningEnd) {
    return { progress: (totalMinutes - eveningStart) / 60, phase: 'evening-transition' };
  }
  if (totalMinutes >= eveningEnd || totalMinutes < morningStart) {
    return { progress: 1, phase: 'night' };
  }
  if (totalMinutes >= morningStart && totalMinutes < morningEnd) {
    return { progress: 1 - (totalMinutes - morningStart) / 60, phase: 'morning-transition' };
  }
  return { progress: 0, phase: 'day' };
}
```

During `day` phase: set Palette A values directly, clear interval.
During `night` phase: set Palette B values directly, clear interval.
During `evening-transition` or `morning-transition`: run setInterval every 60000ms (1 minute), compute progress, interpolate all tokens, set CSS vars.

## Palette B End State (Golden Hour)

When progress = 1.0, set these values directly (no interpolation needed):

```css
--color-text-primary: #2F2623;
--color-bg-primary: #FBF6F0;
--color-accent: #C9A45C;
--color-surface: #EBD9CF;
--color-neutral: #8E7568;
--color-botanical-1: #A3AB8E;
--color-botanical-2: #DDD0B8;

--font-heading: 'Fraunces', Georgia, serif;
--font-subheading: 'Fraunces', Georgia, serif;
--font-body: 'Outfit', 'Helvetica Neue', sans-serif;
--font-ui: 'Outfit', 'Helvetica Neue', sans-serif;
```

## Font Swap Animation

Fonts swap at exactly the transition boundary (6:00 PM evening, 9:00 AM morning). This is separate from the color transition.

Sequence:
1. Add a CSS transition on `<html>`: `transition: opacity 0.6s ease`
2. Set `document.documentElement.style.opacity = '0'`
3. After 600ms (use setTimeout), swap all 4 font custom properties:
   - Evening (6:00 PM): Cormorant Garamond → Fraunces, Raleway → Outfit
   - Morning (9:00 AM): Fraunces → Cormorant Garamond, Outfit → Raleway
4. Set `document.documentElement.style.opacity = '1'`
5. Total visible effect: 1.2 seconds (600ms fade out, swap, 600ms fade in)

The font swap fires once per transition, not on every interval tick. Track whether you've already swapped with a ref or state flag.

## Reduced Motion

If `window.matchMedia('(prefers-reduced-motion: reduce)').matches`:
- Skip the font swap fade animation. Swap fonts instantly (no opacity transition).
- Still transition colors via the interval. The 60-second interval is a gradual value change, not a visual animation.

## Debug Mode

Support a URL parameter `?time=HH:MM` that overrides the system clock.

Example: `?time=17:30` makes the component behave as if the current time is 5:30 PM.

Parse this in a useEffect on mount. If present, use the override time instead of `new Date()` for all calculations. The interval should still run but use the fixed override time (so the transition state is stable for inspection, not advancing).

## What NOT to Do

- Do not modify any component styling (shadcn or otherwise)
- Do not build page content
- Do not implement Version B (dark background variant). That is deferred indefinitely.
- Do not add any UI for manual palette switching (no toggle, no button)
- Do not add a dark mode media query
- Do not modify the Tailwind config
- Do not install any packages
