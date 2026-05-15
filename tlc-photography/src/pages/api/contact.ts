import type { APIRoute } from "astro";
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext/browser";

export const prerender = false;

// In-memory rate limit store. Resets on Worker cold start — acceptable for low-traffic site.
const rateLimitStore = new Map<string, number[]>();

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const OPTIONS: APIRoute = () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Parse body
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid request body." }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();
    const website = String(body.website ?? "").trim();

    // Honeypot — silent fake success for bots
    if (website.length > 0) {
      return new Response(
        JSON.stringify({ success: true, message: "Thank you! We'll be in touch soon." }),
        { status: 200, headers: CORS_HEADERS }
      );
    }

    // Rate limiting
    const ip =
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for") ??
      "unknown";

    const now = Date.now();
    const timestamps = (rateLimitStore.get(ip) ?? []).filter(
      (t) => now - t < RATE_LIMIT_WINDOW_MS
    );

    if (timestamps.length >= RATE_LIMIT_MAX) {
      return new Response(
        JSON.stringify({ success: false, message: "Please wait before submitting again." }),
        { status: 429, headers: CORS_HEADERS }
      );
    }

    // Validation
    const errors: Record<string, string> = {};

    if (!name || name.length === 0) {
      errors.name = "Name is required";
    } else if (name.length > 200) {
      errors.name = "Name must be 200 characters or fewer";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.length === 0) {
      errors.email = "Please enter a valid email address";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    } else if (email.length > 200) {
      errors.email = "Email must be 200 characters or fewer";
    }

    const phoneDigitsOnly = phone.replace(/\s/g, "");
    const phoneRegex = /^[\d\-\(\)\+\s]+$/;
    if (!phone || phone.length === 0) {
      errors.phone = "Please enter a valid phone number";
    } else if (!phoneRegex.test(phone)) {
      errors.phone = "Please enter a valid phone number";
    } else if (phoneDigitsOnly.length < 7 || phoneDigitsOnly.length > 20) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!message || message.length === 0) {
      errors.message = "Message is required";
    } else if (message.length > 5000) {
      errors.message = "Message must be 5000 characters or fewer";
    }

    if (Object.keys(errors).length > 0) {
      return new Response(
        JSON.stringify({ success: false, errors }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Record submission timestamp after validation passes
    rateLimitStore.set(ip, [...timestamps, now]);

    // Send email via Cloudflare Email Workers binding
    try {
      const runtime = (locals as { runtime?: { env?: Record<string, unknown> } }).runtime;
      const emailBinding = runtime?.env?.CONTACT_EMAIL as
        | { send: (msg: EmailMessage) => Promise<void> }
        | undefined;

      if (emailBinding) {
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

        await emailBinding.send(emailMessage);
      } else {
        // Local dev fallback — log submission data, do not fail the request
        console.error("[contact] CONTACT_EMAIL binding not available. Submission data:", {
          name,
          email,
          phone,
          message,
        });
      }
    } catch (emailError) {
      console.error("[contact] Failed to send email:", emailError);
      // Do not surface email errors to the user — submission is not lost from logs
    }

    return new Response(
      JSON.stringify({ success: true, message: "Thank you! We'll be in touch soon." }),
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (err) {
    console.error("[contact] Unhandled error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Something went wrong. Please try again." }),
      { status: 500, headers: CORS_HEADERS }
    );
  }
};
