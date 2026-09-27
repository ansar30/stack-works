import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { initDb } from "@/lib/db/init";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initDb();
    const sql = getDb();
    const inquiries = await sql`
      SELECT id, name, email, company, project_type, budget_range, timeline, description, status, created_at
      FROM project_inquiries
      ORDER BY created_at DESC;
    `;

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID required" }, { status: 400 });
    }

    const sql = getDb();
    await sql`DELETE FROM project_inquiries WHERE id = ${id}`;

    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status required" }, { status: 400 });
    }

    const sql = getDb();
    await sql`UPDATE project_inquiries SET status = ${status} WHERE id = ${id}`;

    return NextResponse.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update inquiry status" }, { status: 500 });
  }
}
