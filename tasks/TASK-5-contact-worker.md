# Task 5: Contact Form Backend (Cloudflare Worker)

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

A serverless API route at `src/pages/api/contact.ts` that handles contact form POST requests. It validates input, checks a honeypot field, applies rate limiting, and sends a notification email. This runs on Cloudflare Workers via the Astro Cloudflare adapter (already configured in Task 1).

## Steps

1. Create `src/pages/api/contact.ts` as an Astro API route
2. Implement request validation
3. Implement honeypot check
4. Implement rate limiting
5. Implement email notification
6. Test the endpoint manually with curl or similar
7. STOP and report.

## Packages to Install

```
mimetext
```

Required for constructing MIME-formatted email messages for the Cloudflare Email Workers binding. Install with `npm install mimetext`. Do not install anything else.

## API Route: `src/pages/api/contact.ts`

### Method Handling

- Accept POST only.
- Return 405 `{ success: false, message: "Method not allowed" }` for all other HTTP methods.

### Request Body

Parse JSON body expecting these fields:

```typescript
{
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string; // honeypot field
}
```

### Honeypot

The `website` field is a hidden form field (already implemented in the ContactForm React island from Task 4). If `website` is not empty after trimming, return 200 with `{ success: true, message: "Thank you! We'll be in touch soon." }`. Silent reject. No error. Bots filling every field get a fake success response.

### Validation Rules

Apply these checks after the honeypot passes. Return 400 with specific per-field error messages for failures.

| Field | Rules |
|-------|-------|
| `name` | Required. Non-empty after trim. Max 200 characters. |
| `email` | Required. Must match a reasonable email regex (e.g., `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`). Max 200 characters. |
| `phone` | Required. Only digits, dashes, parentheses, spaces, and plus sign allowed. Min 7 characters, max 20 characters after stripping spaces. |
| `message` | Required. Non-empty after trim. Max 5000 characters. |

Error response format:

```json
{
  "success": false,
  "errors": {
    "name": "Name is required",
    "email": "Please enter a valid email address",
    "phone": "Please enter a valid phone number"
  }
}
```

Only include fields that failed validation. Do not return errors for valid fields.

### Rate Limiting

- Use an in-memory Map as the rate limit store. Cloudflare Workers run at the edge, so the Map resets on cold starts. This is acceptable for a low-traffic photography site. Cloudflare KV is an alternative if available via `context.locals.runtime.env`, but do not require it.
- Key: client IP address. Extract from `request.headers.get('cf-connecting-ip')` or `request.headers.get('x-forwarded-for')` as fallback, or `'unknown'` if neither exists.
- Limit: 3 submissions per IP per hour.
- Track timestamps of submissions per IP. On each request, filter out timestamps older than 1 hour, then check if 3 or more remain.
- If rate limited, return 429:

```json
{
  "success": false,
  "message": "Please wait before submitting again."
}
```

### Email Notification

Send a notification email using the Cloudflare Email Workers binding. No API keys or secrets are needed — the binding handles authorization automatically.

#### Step 1: Add the binding to `wrangler.jsonc`

Add this block to the project's `wrangler.jsonc` (create the file at the project root if it does not exist):

```jsonc
{
  "send_email": [
    {
      "name": "CONTACT_EMAIL",
      "destination_address": "admin@tlc-photography.com"
    }
  ]
}
```

#### Step 2: Send the email in the Worker

Use the `EmailMessage` class from `cloudflare:email` and the `mimetext` package to construct and send the message.

Install `mimetext`:

```
npm install mimetext
```

Add this import at the top of `src/pages/api/contact.ts`:

```typescript
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";
```

Send the notification after validation passes:

```typescript
const msg = createMimeMessage();
msg.setSender({ name: "TLC Photography", addr: "noreply@tlc-photography.com" });
msg.setRecipient("admin@tlc-photography.com");
msg.setSubject(`New inquiry from ${name}`);
msg.addMessage({
  contentType: "text/plain",
  data: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
});

const emailMessage = new EmailMessage(
  "noreply@tlc-photography.com",
  "admin@tlc-photography.com",
  msg.asRaw()
);

await context.locals.runtime.env.CONTACT_EMAIL.send(emailMessage);
```

If `context.locals.runtime.env.CONTACT_EMAIL` is not available (local dev without remote bindings), catch the error, log it with `console.error`, and still return the 200 success response. The form submission is not lost — the data is logged.

Email contents:

- **From:** noreply@tlc-photography.com
- **To:** admin@tlc-photography.com
- **Subject:** `New inquiry from {name}`
- **Body:** Plain text with all four fields (name, email, phone, message), clearly labeled.

### Response Formats

| Scenario | Status | Body |
|----------|--------|------|
| Success | 200 | `{ "success": true, "message": "Thank you! We'll be in touch soon." }` |
| Honeypot triggered | 200 | `{ "success": true, "message": "Thank you! We'll be in touch soon." }` |
| Validation error | 400 | `{ "success": false, "errors": { "fieldName": "error message" } }` |
| Rate limited | 429 | `{ "success": false, "message": "Please wait before submitting again." }` |
| Server error | 500 | `{ "success": false, "message": "Something went wrong. Please try again." }` |

### Error Handling

Wrap the entire handler in a try/catch. Any uncaught error returns the 500 response above. Log the error with `console.error` for Cloudflare's logging.

### CORS

Set these response headers on all responses:

```
Content-Type: application/json
Access-Control-Allow-Origin: * (or restrict to the site's domain if known)
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

Handle OPTIONS preflight requests by returning 204 with the CORS headers above.

## What NOT to Do

- Do not modify any frontend components (the ContactForm island from Task 4 already POSTs to `/api/contact`).
- Do not add analytics or tracking to form submissions.
- Do not store submissions in a database. Email notification only for now.
- Do not add CAPTCHA or reCAPTCHA.
- Do not use Resend or any third-party email service. Cloudflare Email Workers is the only email method.
- Do not create additional API routes beyond `/api/contact`.
- Do not modify the Astro config or Cloudflare adapter settings.
