import { getDb } from "@/lib/db";
import { initDb } from "@/lib/db/init";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  approach: string;
  solution: string;
  architecture: string[];
  technologies: string[];
  outcome: string;
  featured: boolean;
  isConfidential?: boolean;
  confidentialityNote?: string | null;
  status: "published" | "draft";
}

export const defaultProjects: Project[] = [
  {
    id: "nexus-analytics-platform",
    slug: "nexus-analytics-platform",
    title: "Nexus Data Engine",
    category: "SaaS Platform",
    summary: "Real-time telemetry and operational metrics platform for distributed systems monitoring.",
    problem: "The client needed a unified dashboard to ingest telemetry data across multi-region server clusters without query latency degradation.",
    approach: "Designed a lightweight event-driven pipeline feeding into an optimized columnar-backed PostgreSQL database with serverless web UI rendering.",
    solution: "Built a responsive, dark-mode monitoring portal with sub-second aggregate query speeds, customizable widget layouts, and automated alert routing.",
    architecture: [
      "Next.js App Router for serverless dashboard rendering",
      "Neon PostgreSQL with connection pooling for high-throughput ingestion",
      "WebSockets for real-time live event streaming",
      "Tailwind CSS custom charting components for zero external bundle overhead",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Neon", "Tailwind CSS", "WebSockets"],
    outcome: "Streamlined operational visibility across 4 regions with under 150ms query response times.",
    featured: true,
    isConfidential: false,
    status: "published",
  },
  {
    id: "cortex-ai-copilot",
    slug: "cortex-ai-copilot",
    title: "Cortex Knowledge Assistant",
    category: "AI Application",
    summary: "RAG-powered document search and intelligent synthesis copilot for internal operations.",
    problem: "Field engineers spent hours manually locating technical specifications and compliance docs across fragmented document stores.",
    approach: "Architected a secure RAG (Retrieval-Augmented Generation) pipeline with strict document access boundaries and vector embeddings.",
    solution: "Engineered a web workspace enabling natural language queries over 50,000+ technical PDFs with cited inline source references.",
    architecture: [
      "Vector embeddings with semantic chunking pipeline",
      "OpenAI API integration for context-aware summary generation",
      "PostgreSQL with pgvector for spatial document querying",
      "Role-based access token validation on every search request",
    ],
    technologies: ["React", "TypeScript", "Node.js", "OpenAI API", "PostgreSQL", "pgvector"],
    outcome: "Reduced average document retrieval time from 45 minutes to under 8 seconds per query.",
    featured: true,
    isConfidential: true,
    confidentialityNote: "Demonstration architecture. Selected domain specifics and proprietary vectors are intentionally omitted due to client confidentiality.",
    status: "published",
  },
  {
    id: "strata-inventory-automation",
    slug: "strata-inventory-automation",
    title: "Strata Automation Engine",
    category: "Business Automation",
    summary: "Automated inventory reconciliation and ERP sync system replacing manual spreadsheet workflows.",
    problem: "Daily inventory sync required 3 hours of manual data entry between e-commerce storefronts and legacy warehouse ERP software.",
    approach: "Built a headless background integration service with automated error reporting and transaction retry queues.",
    solution: "Developed custom webhook handlers and scheduled cron workers that reconcile inventory levels every 5 minutes automatically.",
    architecture: [
      "Serverless background cron schedules with failure notifications",
      "Idempotent API integration wrappers for legacy ERP endpoints",
      "PostgreSQL audit log table for transactional traceability",
      "Real-time status portal with alert triggers",
    ],
    technologies: ["Node.js", "TypeScript", "REST APIs", "PostgreSQL", "Vercel Cron"],
    outcome: "Eliminated manual spreadsheet reconciliation entirely, saving over 15 hours of engineering effort weekly.",
    featured: true,
    isConfidential: false,
    status: "published",
  },
  {
    id: "omni-commerce-gateway",
    slug: "omni-commerce-gateway",
    title: "Omni Portal & API",
    category: "Web Platform & API",
    summary: "B2B client portal and custom ordering backend built for scale.",
    problem: "Existing legacy portal suffered from high failure rates on peak catalog update cycles and lacked automated customer billing controls.",
    approach: "Rebuilt the front-end with server components while establishing a clean REST API layer for catalog and invoice management.",
    solution: "A modern B2B ordering portal featuring instant instant search, automated invoice generation, and tier-based catalog pricing.",
    architecture: [
      "Server-side rendered dynamic pages with aggressive edge caching",
      "Stripe API integration for subscription and usage-based invoice generation",
      "Normalized relational schema for fast catalog queries",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Stripe API", "Neon DB"],
    outcome: "Handled 10x traffic spikes with zero downtime during peak product catalog releases.",
    featured: false,
    isConfidential: true,
    confidentialityNote: "Selected implementation details and client identifiers are omitted due to confidentiality agreements.",
    status: "published",
  },
];

export const projects = defaultProjects;

/**
 * Dynamic async fetcher for projects directly from Neon PostgreSQL
 */
export async function getProjects(): Promise<Project[]> {
  try {
    await initDb();
    const sql = getDb();
    const rows = (await sql`
      SELECT id, slug, title, category, summary, problem, approach, solution,
             architecture, technologies, outcome, featured, is_confidential, confidentiality_note, status
      FROM projects
      ORDER BY created_at DESC;
    `) as any[];

    if (!rows || rows.length === 0) return defaultProjects;

    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      category: r.category,
      summary: r.summary,
      problem: r.problem,
      approach: r.approach,
      solution: r.solution,
      architecture: Array.isArray(r.architecture) ? r.architecture : JSON.parse(r.architecture || "[]"),
      technologies: Array.isArray(r.technologies) ? r.technologies : JSON.parse(r.technologies || "[]"),
      outcome: r.outcome,
      featured: !!r.featured,
      isConfidential: !!r.is_confidential,
      confidentialityNote: r.confidentiality_note,
      status: r.status as "published" | "draft",
    }));
  } catch (err) {
    console.error("[StackWorks DB fetch error - getProjects]:", err);
    return defaultProjects;
  }
}
