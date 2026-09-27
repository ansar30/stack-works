import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { initDb } from "@/lib/db/init";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await initDb();
    const sql = getDb();
    const projects = await sql`
      SELECT id, slug, title, category, summary, problem, approach, solution,
             architecture, technologies, outcome, featured, is_confidential, confidentiality_note, status, created_at
      FROM projects
      ORDER BY created_at DESC;
    `;

    return NextResponse.json({ projects });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initDb();
    const data = await req.json();

    const id = data.id || data.slug || `proj-${Date.now()}`;
    const sql = getDb();

    await sql`
      INSERT INTO projects (
        id, slug, title, category, summary, problem, approach, solution,
        architecture, technologies, outcome, featured, is_confidential, confidentiality_note, status
      ) VALUES (
        ${id}, ${data.slug}, ${data.title}, ${data.category}, ${data.summary}, ${data.problem},
        ${data.approach}, ${data.solution}, ${JSON.stringify(data.architecture || [])},
        ${JSON.stringify(data.technologies || [])}, ${data.outcome}, ${!!data.featured},
        ${!!data.isConfidential}, ${data.confidentialityNote || null}, ${data.status || 'published'}
      )
    `;

    return NextResponse.json({ success: true, message: "Project created", id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    if (!data.id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const sql = getDb();
    await sql`
      UPDATE projects SET
        slug = ${data.slug},
        title = ${data.title},
        category = ${data.category},
        summary = ${data.summary},
        problem = ${data.problem},
        approach = ${data.approach},
        solution = ${data.solution},
        architecture = ${JSON.stringify(data.architecture || [])},
        technologies = ${JSON.stringify(data.technologies || [])},
        outcome = ${data.outcome},
        featured = ${!!data.featured},
        is_confidential = ${!!data.isConfidential},
        confidentiality_note = ${data.confidentialityNote || null},
        status = ${data.status || 'published'}
      WHERE id = ${data.id}
    `;

    return NextResponse.json({ success: true, message: "Project updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
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
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    const sql = getDb();
    await sql`DELETE FROM projects WHERE id = ${id}`;

    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
