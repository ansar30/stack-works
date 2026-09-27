import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { initDb } from "@/lib/db/init";
import { sendInquiryEmailNotification } from "@/lib/email";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Please enter a valid email address (e.g. name@company.com)").max(255),
  company: z.string().trim().max(160).optional().nullable().or(z.literal("")),
  projectType: z.string().optional().default("Web Application"),
  budgetRange: z.string().optional().default("Not sure yet"),
  timeline: z.string().optional().default("Flexible"),
  description: z.string().trim().min(2, "Please enter your project details").max(5000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Server-side validation
    const validation = inquirySchema.safeParse(body);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      const firstErrorMessage =
        Object.values(fieldErrors).flat()[0] || "Invalid form inputs. Please check your details.";

      return NextResponse.json(
        {
          error: firstErrorMessage,
          details: fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Ensure database table exists
    await initDb();
    const sql = getDb();

    // Insert into Neon PostgreSQL
    const result = (await sql`
      INSERT INTO project_inquiries (
        name,
        email,
        company,
        project_type,
        budget_range,
        timeline,
        description
      )
      VALUES (
        ${data.name},
        ${data.email},
        ${data.company || null},
        ${data.projectType},
        ${data.budgetRange},
        ${data.timeline},
        ${data.description}
      )
      RETURNING id, created_at;
    `) as Array<{ id: string; created_at: string }>;

    const inquiryId = result[0]?.id;

    // Trigger instant email notification (non-blocking)
    sendInquiryEmailNotification({
      name: data.name,
      email: data.email,
      company: data.company,
      projectType: data.projectType,
      budgetRange: data.budgetRange,
      timeline: data.timeline,
      description: data.description,
      inquiryId,
    }).catch((err) => console.error("[Background Email Dispatch Error]:", err));

    return NextResponse.json(
      {
        success: true,
        message: "Project inquiry received successfully.",
        id: inquiryId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[StackWorks Inquiry API Error]:", error);
    return NextResponse.json(
      {
        error: "Failed to process project inquiry",
        message: error?.message || "An unexpected server error occurred. Please try again or email hello@stackworks.dev.",
      },
      { status: 500 }
    );
  }
}
