// Vercel Edge function — POST /api/apply
// Sends a job application to Purvang via Resend, plus a confirmation
// reply to the applicant.

import { Resend } from "resend";

export const config = { runtime: "edge" };

const EMAIL_RX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const FROM = process.env.RESEND_FROM || "VWV <onboarding@resend.dev>";
const INBOX = process.env.RESEND_INBOX || "hello@vwv.agency";
const SITE_URL = process.env.SITE_URL || "https://vwv.agency";

type Body = {
  name?: string;
  email?: string;
  role?: string;
  location?: string;
  linkedin?: string;
  portfolio?: string;
  why?: string;
};

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

const ROLE_LABEL: Record<string, string> = {
  "sprint-strategist": "Sprint Strategist",
  "ai-build-engineer": "AI Build Engineer",
  "workflow-engineer": "Workflow Engineer",
  "brand-design-operator": "Brand & Design Operator",
  "funnel-operator": "Funnel Operator",
};

const LOCATION_LABEL: Record<string, string> = {
  ahmedabad: "Hybrid · Ahmedabad",
  remote: "Remote",
  open: "Open to either",
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  let payload: Body = {};
  try {
    payload = (await req.json()) as Body;
  } catch {
    return json(400, { ok: false, error: "Invalid JSON" });
  }

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim().toLowerCase();
  const roleSlug = (payload.role || "").trim();
  const locationSlug = (payload.location || "").trim();
  const linkedin = (payload.linkedin || "").trim();
  const portfolio = (payload.portfolio || "").trim();
  const why = (payload.why || "").trim();

  if (!name || !linkedin || !why) {
    return json(400, { ok: false, error: "Missing required fields." });
  }
  if (!EMAIL_RX.test(email)) {
    return json(400, { ok: false, error: "Please use a valid email." });
  }

  const roleLabel = ROLE_LABEL[roleSlug] || roleSlug || "(role unspecified)";
  const locationLabel =
    LOCATION_LABEL[locationSlug] || locationSlug || "(location unspecified)";

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return json(503, {
      ok: false,
      error: "Application service is offline. Try again in a moment.",
    });
  }

  const resend = new Resend(apiKey);

  // 1) Internal notification to Purvang
  try {
    await resend.emails.send({
      from: FROM,
      to: INBOX,
      replyTo: email,
      subject: `Application · ${roleLabel} · ${name}`,
      text: [
        `Role:      ${roleLabel}`,
        `Location:  ${locationLabel}`,
        ``,
        `Name:      ${name}`,
        `Email:     ${email}`,
        `LinkedIn:  ${linkedin}`,
        portfolio ? `Portfolio: ${portfolio}` : "Portfolio: (not provided)",
        ``,
        `What they'd rebuild at our last client:`,
        why,
        ``,
        `--`,
        `Reply directly to this email to reach ${name.split(" ")[0]}.`,
        `Submitted via ${SITE_URL}/careers`,
      ].join("\n"),
    });
  } catch (err) {
    console.error("resend.emails.send (internal) failed:", err);
    return json(502, {
      ok: false,
      error:
        "Could not deliver the application. Try again or email hello@vwv.agency.",
    });
  }

  // 2) Confirmation to the applicant
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: INBOX,
      subject: `Got your VWV application for ${roleLabel}.`,
      text: [
        `Hi ${name.split(" ")[0]},`,
        ``,
        `Thanks for the application for ${roleLabel}. Purvang has it.`,
        ``,
        `Next step: every application gets read personally. If we see a`,
        `fit, you'll hear back within 5 working days with two or three`,
        `time options for a 30-minute call. If we don't, we say so`,
        `directly within the same week.`,
        ``,
        `If anything urgent comes up in the meantime, just reply to this`,
        `email. It reaches hello@vwv.agency.`,
        ``,
        `VWV.agency · Outcome velocity.`,
        `${SITE_URL}`,
      ].join("\n"),
    });
  } catch (err) {
    // Don't block on confirmation failure.
    console.error("resend.emails.send (confirmation) failed:", err);
  }

  return json(200, { ok: true });
}
