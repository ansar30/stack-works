/**
 * StackWorks Studio — Free & Easy Email Notification Service
 * Powered by Resend API (https://resend.com)
 */

export interface InquiryEmailData {
  name: string;
  email: string;
  company?: string | null;
  projectType: string;
  budgetRange: string;
  timeline: string;
  description: string;
  inquiryId?: string;
}

export async function sendInquiryEmailNotification(data: InquiryEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || "ansarthameem30@gmail.com";

  if (!apiKey || apiKey.trim() === "") {
    console.log(
      "[StackWorks Email]: RESEND_API_KEY is missing. Inquiry stored safely in Neon DB."
    );
    return { sent: false, reason: "RESEND_API_KEY missing" };
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Project Inquiry — StackWorks</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #09090B; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #09090B; padding: 40px 16px;">
        <tr>
          <td align="center">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #111113; border: 1px solid #27272A; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
              
              <!-- Brand Header -->
              <tr>
                <td style="padding: 28px 32px; background-color: #18181B; border-bottom: 1px solid #27272A;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="left">
                        <span style="display: inline-block; width: 8px; height: 8px; background-color: #A3E635; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></span>
                        <span style="color: #FAFAFA; font-size: 18px; font-weight: 700; tracking-tight: -0.5px; vertical-align: middle;">StackWorks</span>
                      </td>
                      <td align="right">
                        <span style="font-family: monospace; font-size: 11px; color: #A3E635; text-transform: uppercase; background-color: rgba(163, 230, 53, 0.1); padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(163, 230, 53, 0.2);">
                          ⚡ New Project Inquiry
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Main Content Body -->
              <tr>
                <td style="padding: 32px;">
                  <h2 style="color: #FAFAFA; font-size: 22px; font-weight: 600; margin: 0 0 8px 0; letter-spacing: -0.5px;">
                    New inquiry submitted by ${data.name}
                  </h2>
                  <p style="color: #A1A1AA; font-size: 14px; margin: 0 0 28px 0; line-height: 1.5;">
                    A prospective client submitted their project details via the StackWorks contact portal.
                  </p>

                  <!-- Client Info Details Table -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #09090B; border: 1px solid #27272A; border-radius: 8px; margin-bottom: 24px;">
                    <tr>
                      <td style="padding: 16px 20px; border-bottom: 1px solid #18181B;">
                        <span style="color: #71717A; font-size: 11px; font-family: monospace; text-transform: uppercase; display: block; margin-bottom: 2px;">Client Name</span>
                        <span style="color: #FAFAFA; font-size: 14px; font-weight: 600;">${data.name}</span>
                      </td>
                      <td style="padding: 16px 20px; border-bottom: 1px solid #18181B;">
                        <span style="color: #71717A; font-size: 11px; font-family: monospace; text-transform: uppercase; display: block; margin-bottom: 2px;">Work Email</span>
                        <a href="mailto:${data.email}" style="color: #A3E635; font-size: 14px; text-decoration: none; font-weight: 500;">${data.email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 16px 20px; border-bottom: 1px solid #18181B;">
                        <span style="color: #71717A; font-size: 11px; font-family: monospace; text-transform: uppercase; display: block; margin-bottom: 2px;">Company / Org</span>
                        <span style="color: #FAFAFA; font-size: 14px;">${data.company || "Not specified"}</span>
                      </td>
                      <td style="padding: 16px 20px; border-bottom: 1px solid #18181B;">
                        <span style="color: #71717A; font-size: 11px; font-family: monospace; text-transform: uppercase; display: block; margin-bottom: 2px;">Project Type</span>
                        <span style="color: #A3E635; font-size: 14px; font-weight: 600;">${data.projectType}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 16px 20px;">
                        <span style="color: #71717A; font-size: 11px; font-family: monospace; text-transform: uppercase; display: block; margin-bottom: 2px;">Target Budget</span>
                        <span style="color: #FAFAFA; font-size: 14px;">${data.budgetRange}</span>
                      </td>
                      <td style="padding: 16px 20px;">
                        <span style="color: #71717A; font-size: 11px; font-family: monospace; text-transform: uppercase; display: block; margin-bottom: 2px;">Target Timeline</span>
                        <span style="color: #FAFAFA; font-size: 14px;">${data.timeline}</span>
                      </td>
                    </tr>
                  </table>

                  <!-- Description Block -->
                  <div style="background-color: #18181B; border: 1px solid #27272A; border-radius: 8px; padding: 20px; margin-bottom: 28px;">
                    <span style="color: #71717A; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Project Scope & Description</span>
                    <p style="color: #A1A1AA; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.description}</p>
                  </div>

                  <!-- Action CTA Button -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center">
                        <a href="http://localhost:3000/admin" style="background-color: #FAFAFA; color: #09090B; padding: 14px 28px; border-radius: 6px; font-size: 13px; font-weight: 600; text-decoration: none; display: inline-block; letter-spacing: 0.5px;">
                          Open in Admin Dashboard →
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 20px 32px; background-color: #09090B; border-top: 1px solid #27272A; text-align: center;">
                  <p style="color: #71717A; font-size: 11px; font-family: monospace; margin: 0;">
                    StackWorks Studio • Digital products, engineered.
                  </p>
                  <p style="color: #3F3F46; font-size: 10px; font-family: monospace; margin: 4px 0 0 0;">
                    Inquiry ID: ${data.inquiryId || "N/A"} • Persisted to Neon PostgreSQL
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "StackWorks Studio <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `⚡ New Inquiry: ${data.name} (${data.projectType})`,
        html: htmlContent,
      }),
    });

    if (res.ok) {
      console.log(`[StackWorks Email]: Instant email notification sent to ${adminEmail} via Resend API.`);
      return { sent: true };
    } else {
      const err = await res.json();
      console.error("[StackWorks Email Error]:", err);
      return { sent: false, error: err };
    }
  } catch (error) {
    console.error("[StackWorks Email Exception]:", error);
    return { sent: false, error };
  }
}
