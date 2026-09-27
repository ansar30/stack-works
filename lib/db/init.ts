import { getDb } from "./index";
import { projects as defaultProjects } from "@/data/projects";
import { services as defaultServices } from "@/data/services";

let isInitialized = false;

export async function initDb() {
  if (isInitialized) return;

  try {
    const sql = getDb();

    // 1. Create tables if they do not exist
    await sql`
      CREATE TABLE IF NOT EXISTS project_inquiries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(120) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(160),
        project_type VARCHAR(80) NOT NULL,
        budget_range VARCHAR(80) NOT NULL,
        timeline VARCHAR(80) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(120) PRIMARY KEY,
        slug VARCHAR(120) UNIQUE NOT NULL,
        title VARCHAR(200) NOT NULL,
        category VARCHAR(80) NOT NULL,
        summary TEXT NOT NULL,
        problem TEXT NOT NULL,
        approach TEXT NOT NULL,
        solution TEXT NOT NULL,
        architecture JSONB NOT NULL DEFAULT '[]'::jsonb,
        technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
        outcome TEXT NOT NULL,
        featured BOOLEAN DEFAULT false,
        is_confidential BOOLEAN DEFAULT false,
        confidentiality_note TEXT,
        status VARCHAR(20) DEFAULT 'published',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(120) PRIMARY KEY,
        slug VARCHAR(120) UNIQUE NOT NULL,
        title VARCHAR(160) NOT NULL,
        short_description TEXT NOT NULL,
        description TEXT NOT NULL,
        capabilities JSONB NOT NULL DEFAULT '[]'::jsonb,
        tech_highlight JSONB NOT NULL DEFAULT '[]'::jsonb,
        icon VARCHAR(50) DEFAULT 'LayoutGrid',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 2. Check if projects table is empty, seed initial projects
    const existingProjects = (await sql`SELECT COUNT(*)::int as count FROM projects`) as Array<{ count: number }>;
    if (existingProjects[0]?.count === 0) {
      for (const p of defaultProjects) {
        await sql`
          INSERT INTO projects (
            id, slug, title, category, summary, problem, approach, solution,
            architecture, technologies, outcome, featured, is_confidential, confidentiality_note, status
          ) VALUES (
            ${p.id}, ${p.slug}, ${p.title}, ${p.category}, ${p.summary}, ${p.problem},
            ${p.approach}, ${p.solution}, ${JSON.stringify(p.architecture)}, ${JSON.stringify(p.technologies)},
            ${p.outcome}, ${p.featured}, ${p.isConfidential || false}, ${p.confidentialityNote || null}, ${p.status}
          ) ON CONFLICT (id) DO NOTHING;
        `;
      }
    }

    // 3. Check if services table is empty, seed initial services
    const existingServices = (await sql`SELECT COUNT(*)::int as count FROM services`) as Array<{ count: number }>;
    if (existingServices[0]?.count === 0) {
      for (const s of defaultServices) {
        await sql`
          INSERT INTO services (
            id, slug, title, short_description, description, capabilities, tech_highlight, icon
          ) VALUES (
            ${s.id}, ${s.id}, ${s.title}, ${s.shortDescription}, ${s.description},
            ${JSON.stringify(s.capabilities)}, ${JSON.stringify(s.techHighlight)}, ${s.icon}
          ) ON CONFLICT (id) DO NOTHING;
        `;
      }
    }

    isInitialized = true;
    console.log("[StackWorks DB]: Database tables initialized and verified.");
  } catch (error) {
    console.error("[StackWorks DB Init Error]:", error);
  }
}
