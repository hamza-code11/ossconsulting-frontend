import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return value.replace(/[&<>"']/g, (char) => entities[char]);
}

export async function POST(request: NextRequest) {
  // 1) Body ko safely parse karo (khali / invalid JSON par 500 nahi, 400 do)
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (!raw || !raw.trim()) {
      return NextResponse.json(
        { success: false, message: "Request body is empty." },
        { status: 400 }
      );
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Body must be a JSON object");
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  try {
    const {
      name,
      email,
      phone = "",
      service = "",
      message,
      website = "",
    } = body;

    // 2) Honeypot spam protection
    if (typeof website === "string" && website.trim()) {
      return NextResponse.json({ success: true });
    }

    // 3) Input validation
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      typeof phone !== "string" ||
      typeof service !== "string"
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid input." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanService = service.trim();
    const cleanMessage = message.trim();

    if (
      cleanName.length < 2 ||
      cleanName.length > 100 ||
      !EMAIL_REGEX.test(cleanEmail) ||
      cleanEmail.length > 254 ||
      cleanMessage.length < 10 ||
      cleanMessage.length > 5000 ||
      cleanPhone.length > 30 ||
      cleanService.length > 120
    ) {
      return NextResponse.json(
        { success: false, message: "Please check your form details." },
        { status: 400 }
      );
    }

    // 4) Environment variables
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER;

    if (!smtpUser || !smtpPass || !receiver) {
      console.error("Contact email configuration is missing.");
      return NextResponse.json(
        { success: false, message: "Email service is not configured." },
        { status: 500 }
      );
    }

    // 5) Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass.replace(/\s/g, ""),
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safePhone = escapeHtml(cleanPhone || "Not provided");
    const safeService = escapeHtml(cleanService || "Not specified");
    const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br/>");

    await transporter.sendMail({
      from: `"OSS Consulting Website" <${smtpUser}>`,
      to: receiver,
      replyTo: cleanEmail,
      subject: `New Contact Enquiry - ${cleanName}`,
      text: `
New Contact Form Submission

Name: ${cleanName}
Email: ${cleanEmail}
Phone: ${cleanPhone || "Not provided"}
Service: ${cleanService || "Not specified"}

Message:
${cleanMessage}
      `,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#242122;">
          <h2 style="color:#083c6e;">New Contact Enquiry</h2>

          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Service:</strong> ${safeService}</p>

          <hr style="border:0;border-top:1px solid #ddd;margin:20px 0;" />

          <h3>Message</h3>
          <p style="line-height:1.7;">${safeMessage}</p>

          <hr style="border:0;border-top:1px solid #ddd;margin:20px 0;" />

          <p style="font-size:12px;color:#777;">
            Sent from OSS Consulting website contact form.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact form email error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to send your message. Please try again.",
      },
      { status: 500 }
    );
  }
}