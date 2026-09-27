import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { initDb } from "@/lib/db/init";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await initDb();
    const sql = getDb();
    const services = await sql`
      SELECT id, slug, title, short_description, description, capabilities, tech_highlight, icon, created_at
      FROM services
      ORDER BY created_at ASC;
    `;

    return NextResponse.json({ services });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initDb();
    const data = await req.json();

    const id = data.id || `service-${Date.now()}`;
    const sql = getDb();

    await sql`
      INSERT INTO services (
        id, slug, title, short_description, description, capabilities, tech_highlight, icon
      ) VALUES (
        ${id}, ${data.slug || id}, ${data.title}, ${data.shortDescription}, ${data.description},
        ${JSON.stringify(data.capabilities || [])}, ${JSON.stringify(data.techHighlight || [])}, ${data.icon || 'LayoutGrid'}
      )
    `;

    return NextResponse.json({ success: true, message: "Service created", id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    if (!data.id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const sql = getDb();
    await sql`
      UPDATE services SET
        title = ${data.title},
        short_description = ${data.shortDescription},
        description = ${data.description},
        capabilities = ${JSON.stringify(data.capabilities || [])},
        tech_highlight = ${JSON.stringify(data.techHighlight || [])},
        icon = ${data.icon || 'LayoutGrid'}
      WHERE id = ${data.id}
    `;

    return NextResponse.json({ success: true, message: "Service updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
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
      return NextResponse.json({ error: "Service ID required" }, { status: 400 });
    }

    const sql = getDb();
    await sql`DELETE FROM services WHERE id = ${id}`;

    return NextResponse.json({ success: true, message: "Service deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
