# Task 8: Session Type Quiz Island

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

A single React island: `SessionQuiz.tsx`. A lightweight, fully client-side quiz on the Services page that helps visitors identify which session type is right for them. 4 questions, 2–3 choices each. No backend. No analytics. Pure React state.

After building the component, activate it on the Services page by replacing the placeholder comment that Task 4 left there.

## Steps

1. Create `src/components/SessionQuiz.tsx`
2. Implement the question flow, state management, and recommendation logic using the exact spec below
3. Style all elements with TLC design tokens (no hardcoded colors)
4. Open `src/pages/services.astro` and replace the `{/* SessionQuiz island — built in Task 8. */}` placeholder comment with the actual import and `<SessionQuiz client:visible />` element
5. Verify the quiz renders correctly on the Services page, recommendations link correctly, and the component works on mobile
6. STOP and report.

## Packages to Install

None. This task uses React (already installed). No additional packages.

## Component

File: `src/components/SessionQuiz.tsx`
Hydration: `client:visible`
Props: none (self-contained, all data hardcoded in the component)

## Questions

The quiz has 4 questions shown one at a time. Display a progress indicator ("Question 1 of 4") above each question.

```typescript
const QUESTIONS = [
  {
    id: 'subject',
    text: 'Who\'s being photographed?',
    choices: [
      { id: 'just-me',  label: 'Just me'              },
      { id: 'partner',  label: 'Me and my partner'    },
      { id: 'family',   label: 'Our family'            },
      { id: 'baby',     label: 'Our baby'              },
    ],
  },
  {
    id: 'occasion',
    text: 'What\'s the occasion?',
    choices: [
      { id: 'milestone',     label: 'A milestone'          },
      { id: 'just-because',  label: 'Just because'         },
      { id: 'announcement',  label: 'An announcement'      },
    ],
  },
  {
    id: 'setting',
    text: 'Indoor or outdoor?',
    choices: [
      { id: 'outdoor',      label: 'Outdoors always'    },
      { id: 'indoor',       label: 'Indoor would be nice' },
      { id: 'no-pref',      label: 'No preference'      },
    ],
  },
  {
    id: 'vibe',
    text: 'What feel are you going for?',
    choices: [
      { id: 'relaxed',   label: 'Natural and relaxed'        },
      { id: 'polished',  label: 'More posed and polished'    },
      { id: 'mix',       label: 'A mix of both'              },
    ],
  },
];
```

## State Management

Use React `useState` only. No external state library.

```typescript
type Answers = Record<string, string>; // questionId -> choiceId

const [currentStep, setCurrentStep] = useState(0); // 0-indexed question index
const [answers, setAnswers] = useState<Answers>({});
const [result, setResult] = useState<SessionType | null>(null);
```

Flow:
1. Start: show question 0
2. User selects a choice → store answer, auto-advance to next question after a 200ms delay (gives a brief visual confirmation before moving on)
3. After question 3 (last question): compute recommendation, set `result`, show result screen
4. "Start over" button on result screen: reset all state to initial values

Do not require a "Next" button. Selecting a choice is the only navigation needed. The Back button (see below) is available on every question after the first.

Back button: show on questions 1, 2, and 3 (not on question 0). On click, decrement `currentStep` and clear the answer for the current question so the user re-answers it on the way forward.

## Recommendation Logic

```typescript
type SessionType = 'families' | 'couples' | 'seniors' | 'newborns' | 'maternity' | 'engagements';

function getRecommendation(answers: Answers): SessionType[] {
  const { subject, occasion } = answers;

  // Primary recommendation (always one)
  let primary: SessionType;

  if (subject === 'baby') {
    primary = 'newborns';
  } else if (subject === 'family') {
    primary = occasion === 'announcement' ? 'maternity' : 'families';
  } else if (subject === 'partner') {
    primary = occasion === 'announcement' ? 'engagements' : 'couples';
  } else {
    // just-me
    primary = 'seniors';
  }

  // Secondary recommendation (optional, shown when a meaningful alternative exists)
  const secondary: SessionType[] = [];

  if (primary === 'families' && occasion === 'milestone') {
    secondary.push('seniors'); // e.g., graduating senior in a family milestone context
  }
  if (primary === 'couples' && occasion === 'milestone') {
    secondary.push('engagements');
  }
  if (primary === 'seniors' && occasion === 'announcement') {
    secondary.push('engagements'); // grad announcement
  }

  return [primary, ...secondary].slice(0, 2); // max 2 recommendations
}
```

## Session Type Data

These are the display labels and descriptions shown on the result screen. The `anchor` is the `id` of the corresponding section on the Services page (which Task 4 built). Use `href={\`/services#\${type.anchor}\`}` for the "See this session" link.

```typescript
const SESSION_DATA: Record<SessionType, { label: string; description: string; anchor: string }> = {
  families: {
    label: 'Families',
    description: 'Real moments, real laughter. We photograph your family as you actually are — together.',
    anchor: 'families',
  },
  couples: {
    label: 'Couples',
    description: 'Just the two of you. Connection, light, and a location that feels like yours.',
    anchor: 'couples',
  },
  seniors: {
    label: 'Seniors',
    description: 'A portrait that captures who you are right now — before everything changes.',
    anchor: 'seniors',
  },
  newborns: {
    label: 'Newborns',
    description: 'They stay this small for about five minutes. We help you keep it.',
    anchor: 'newborns',
  },
  maternity: {
    label: 'Maternity',
    description: 'This is a season worth remembering. Soft light, gentle pacing, beautiful images.',
    anchor: 'maternity',
  },
  engagements: {
    label: 'Engagements',
    description: 'Before the wedding, when it\'s still just the two of you figuring out how to be in love.',
    anchor: 'engagements',
  },
};
```

## Layout and Styling

### Outer wrapper

- bg `var(--color-surface)`, border-radius 8px, padding 32px (24px mobile)
- max-width 640px, centered
- This is a card that sits near the top of the Services page

### Progress indicator

- `var(--font-ui)` 12px, color `var(--color-neutral)`, uppercase, letter-spacing 1.5px
- e.g., "QUESTION 2 OF 4"
- margin-bottom 16px

### Question text

- `var(--font-heading)` 24px
- margin-bottom 24px

### Choice buttons

Use shadcn Button secondary/outline variant for each choice. Style:
- Full-width (width: 100%)
- Stack vertically with 8px gap between buttons
- `var(--font-body)` 16px (not uppercase — these are conversational labels, not CTAs)
- letter-spacing: normal (override the Button's default 1.5px tracking)
- text-align: left, padding-left 20px
- When a choice is selected (the brief 200ms window before advancing): swap to primary variant (filled) to give visual feedback

### Back button

- Lucide ChevronLeft icon + text "Back"
- `var(--font-ui)` 14px, color `var(--color-neutral)`
- No border, no background — text link style
- margin-top 16px
- 44px min touch target

### Result screen

Replace the question UI entirely. No animation required (static swap is fine).

- Heading: "We'd recommend:" — `var(--font-subheading)` 18px italic, color `var(--color-neutral)`
- For each recommended session (1 or 2):
  - Session name: `var(--font-heading)` 28px
  - Description: `var(--font-body)` 16px, line-height 1.6
  - Two buttons below the description, stacked:
    1. Primary: "See this session" — links to `/services#[anchor]`
    2. Secondary: "Book a consultation" — links to the Calendly URL from Keystatic site settings. Since this is a client-side component with no server access, pass the Calendly URL as a prop from the Services page.
- If 2 sessions are recommended, separate them with a SageAccent divider or a 2px `var(--color-botanical-1)` horizontal rule
- "Start over" link below: `var(--font-ui)` 14px, color `var(--color-neutral)`, no border, text link style

### Prop addition for Calendly URL

Since SessionQuiz needs the Calendly URL for the result screen's booking CTA, add one prop:

```typescript
interface Props {
  calendlyUrl: string;
}
```

The Services page passes this from Keystatic site settings:

```astro
<SessionQuiz client:visible calendlyUrl={settings?.calendlyUrl ?? '#'} />
```

## Reduced Motion

No transitions are used in this component (choice selection advances instantly). The 200ms delay before advancing is a setTimeout, not a CSS animation — it is NOT motion and does NOT need to be skipped for `prefers-reduced-motion`. The delay is a UX pause, not a visual effect.

If you add any CSS transitions to the choice buttons (e.g., a background color change on selection), respect `prefers-reduced-motion` by removing those transitions. The state changes themselves always happen immediately.

## Accessibility

- The outer card has `role="region"` and `aria-label="Session type quiz"`
- Each question has `role="group"` with `aria-labelledby` pointing to the question text element
- Choice buttons are standard `<button>` elements — keyboard navigable and screen-reader friendly by default
- After the result appears, move focus to the result heading using a `useEffect` + `ref` so screen reader users are aware the content changed
- The "Start over" action is a `<button>`, not a link
- Progress indicator: add `aria-live="polite"` to the progress text so screen readers announce question changes

## What NOT to Do

- Do not add a backend call or analytics event on any quiz interaction
- Do not animate question transitions. Static show/hide is correct.
- Do not embed Calendly. The result screen's booking CTA is a link that opens Calendly in a new tab, matching every other CalendlyButton on the site.
- Do not add a "skip quiz" option. The quiz is optional — visitors can simply scroll past it.
- Do not show all questions at once or as a multi-column layout. One question at a time is the specified flow.
- Do not install any packages.
- Do not modify any other files except `src/components/SessionQuiz.tsx` and `src/pages/services.astro`.
