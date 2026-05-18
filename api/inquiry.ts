// Vercel Edge function — POST /api/inquiry
// Sends the sprint inquiry to Purvang via Resend.

import { Resend } from "resend";

export const config = { runtime: "edge" };

const EMAIL_RX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const FROM = process.env.RESEND_FROM || "VWV <onboarding@resend.dev>";
const INBOX = process.env.RESEND_INBOX || "hello@vwv.agency";

type Body = {
  name?: string;
  email?: string;
  company?: string;
  tier?: string;
  workflow?: string;
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
  const company = (payload.company || "").trim();
  const tier = (payload.tier || "").trim();
  const workflow = (payload.workflow || "").trim();

  if (!name || !company || !workflow) {
    return json(400, { ok: false, error: "Missing required fields." });
  }
  if (!EMAIL_RX.test(email)) {
    return json(400, { ok: false, error: "Please use a valid email." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return json(503, { ok: false, error: "Inquiry service is offline." });
  }

  const resend = new Resend(apiKey);

  // 1) Internal notification to Purvang
  try {
    await resend.emails.send({
      from: FROM,
      to: INBOX,
      replyTo: email,
      subject: `Sprint inquiry · ${tier || "unspecified"} · ${company}`,
      text: [
        `Name:     ${name}`,
        `Email:    ${email}`,
        `Company:  ${company}`,
        `Tier:     ${tier}`,
        ``,
        `Workflow:`,
        workflow,
        ``,
        `— Reply directly to this email to reach ${name}.`,
      ].join("\n"),
    });
  } catch (err) {
    console.error("resend.emails.send (internal) failed:", err);
    return json(502, {
      ok: false,
      error: "Could not deliver the inquiry. Try again or email hello@vwv.agency.",
    });
  }

  // 2) Confirmation to the inquirer
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: INBOX,
      subject: "We got your sprint inquiry.",
      text: [
        `Hi ${name.split(" ")[0]},`,
        ``,
        `Thanks for sending over the inquiry for ${company}. Purvang has it.`,
        ``,
        `Next step: reply within 24 hours with two or three time options for a`,
        `30-minute scoping call. The call is free, the deliverable after the`,
        `call is a one-page sprint plan with a fixed price and timebox.`,
        ``,
        `If you need to reach a human in the meantime, just reply to this email.`,
        ``,
        `— VWV.agency`,
        `Outcome velocity.`,
      ].join("\n"),
    });
  } catch (err) {
    // Don't block — the internal notification already worked.
    console.error("resend.emails.send (confirmation) failed:", err);
  }

  return json(200, { ok: true });
}
