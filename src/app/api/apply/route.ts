import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, linkedin, useCase, goodFit, velocity, timeline, referral } = body;

    if (!name || !email || !useCase || !goodFit) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subject = `New RedClaw Application — ${name}${company ? ` @ ${company}` : ""}`;

    const html = `
<div style="font-family: -apple-system, sans-serif; max-width: 600px; color: #1a1a1a;">
  <div style="background: #0a0a0a; padding: 24px 28px; border-radius: 12px 12px 0 0;">
    <span style="color: #C41E3A; font-weight: 700; font-size: 18px;">🦀 RedClaw — New Application</span>
  </div>
  <div style="border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 12px 12px; padding: 28px;">
    <table style="width:100%; border-collapse: collapse;">
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; width: 160px; font-size: 13px;">Name</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600;">${name}</td></tr>
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px;">Email</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${email}" style="color: #C41E3A;">${email}</a></td></tr>
      ${company ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px;">Company</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${company}</td></tr>` : ""}
      ${linkedin ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px;">LinkedIn / X</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${linkedin}</td></tr>` : ""}
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px;">Velocity</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${velocity || "—"}</td></tr>
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px;">Timeline</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${timeline || "—"}</td></tr>
      ${referral ? `<tr><td style="padding: 10px 0; color: #666; font-size: 13px;">How they found us</td>
          <td style="padding: 10px 0;">${referral}</td></tr>` : ""}
    </table>

    <div style="margin-top: 24px;">
      <div style="font-size: 12px; font-weight: 700; color: #C41E3A; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">What they want their red claw to do</div>
      <div style="background: #f8f8f8; border-radius: 8px; padding: 16px; font-size: 15px; line-height: 1.6;">${useCase.replace(/\n/g, "<br>")}</div>
    </div>

    <div style="margin-top: 20px;">
      <div style="font-size: 12px; font-weight: 700; color: #C41E3A; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">What makes them a good fit</div>
      <div style="background: #f8f8f8; border-radius: 8px; padding: 16px; font-size: 15px; line-height: 1.6;">${goodFit.replace(/\n/g, "<br>")}</div>
    </div>

    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f0f0f0; font-size: 12px; color: #999;">
      Submitted via redclaw.ai · Reply directly to <a href="mailto:${email}">${email}</a>
    </div>
  </div>
</div>`;

    const { error } = await resend.emails.send({
      from: "RedClaw Applications <onboarding@resend.dev>",
      to: "rushantashtputre2002@gmail.com",
      replyTo: email,
      subject,
      html,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Apply route error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
