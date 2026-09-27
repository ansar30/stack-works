import { getDb } from "@/lib/db";
import { initDb } from "@/lib/db/init";

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  capabilities: string[];
  techHighlight: string[];
  icon: string;
}

export const defaultServices: Service[] = [
  {
    id: "product-development",
    title: "Product Development",
    shortDescription: "Custom web applications and digital products built around real business requirements.",
    description:
      "We design and build bespoke web applications from the ground up. Focusing on performance, accessibility, and maintainable architecture, we translate complex domain logic into intuitive user experiences.",
    capabilities: [
      "Custom Web Applications",
      "Interactive Dashboards",
      "Complex Domain Workflows",
      "Design System Engineering",
      "Responsive Cross-Platform Interfaces",
    ],
    techHighlight: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    icon: "LayoutGrid",
  },
  {
    id: "saas-platforms",
    title: "SaaS Platforms",
    shortDescription: "Multi-user products, dashboards, subscriptions and scalable application architectures.",
    description:
      "End-to-end engineering for modern SaaS products. We architect multi-tenant database models, multi-tier permissions, subscription billing, and real-time operational monitoring.",
    capabilities: [
      "Multi-Tenant Architecture",
      "Subscription & Billing Workflows",
      "Role-Based Access Control (RBAC)",
      "Customer Self-Service Portals",
      "Usage Analytics & Metrics",
    ],
    techHighlight: ["Next.js", "PostgreSQL", "Neon", "Stripe API"],
    icon: "Layers",
  },
  {
    id: "ai-applications",
    title: "AI-Powered Applications",
    shortDescription: "AI integrations, intelligent workflows, assistants and business automation.",
    description:
      "We integrate modern LLMs and vector search capabilities directly into production business workflows. From RAG systems to intelligent document processing, we turn AI capability into reliable tools.",
    capabilities: [
      "LLM API Integrations",
      "Retrieval-Augment Generation (RAG)",
      "Intelligent Document Analysis",
      "Autonomous Agent Workflows",
      "Semantic Search & Embeddings",
    ],
    techHighlight: ["OpenAI API", "Vector Databases", "TypeScript", "Python"],
    icon: "Sparkles",
  },
  {
    id: "backend-apis",
    title: "Backend & APIs",
    shortDescription: "Reliable APIs, integrations, authentication, authorization and data systems.",
    description:
      "High-throughput server architectures engineered for reliability. We design RESTful and GraphQL APIs, integrate third-party webhooks, and ensure data consistency under load.",
    capabilities: [
      "REST & GraphQL API Design",
      "Database Schema Design & Migrations",
      "Third-Party Service Integrations",
      "Secure Auth & Session Management",
      "Asynchronous Job Queues",
    ],
    techHighlight: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    icon: "Server",
  },
  {
    id: "business-automation",
    title: "Business Automation",
    shortDescription: "Replace repetitive manual processes with software and intelligent workflows.",
    description:
      "We build custom automation pipelines that connect legacy databases, internal APIs, and operational software—reducing human error and freeing teams to focus on high-value work.",
    capabilities: [
      "Internal Tooling & Operations",
      "Automated Data Ingestion Pipelines",
      "Webhook & Event Triggers",
      "Legacy System Connectors",
      "Audit Logging & Monitoring",
    ],
    techHighlight: ["Node.js", "Serverless Functions", "Webhooks", "PostgreSQL"],
    icon: "Cpu",
  },
  {
    id: "mvp-development",
    title: "MVP Development",
    shortDescription: "Turn an idea into a focused, production-ready first version.",
    description:
      "Fast, disciplined product creation for early-stage companies and business units. We focus strictly on core value metrics to build launchable software in weeks, not quarters.",
    capabilities: [
      "Scope & Spec Definition",
      "Rapid Prototype to Code",
      "Core Feature Architecture",
      "Production Deployment Setup",
      "Analytics & Feedback Instrumentation",
    ],
    techHighlight: ["Next.js", "Tailwind CSS", "Neon DB", "Vercel"],
    icon: "Rocket",
  },
];

export const services = defaultServices;

/**
 * Dynamic async fetcher for services directly from Neon PostgreSQL
 */
export async function getServices(): Promise<Service[]> {
  try {
    await initDb();
    const sql = getDb();
    const rows = (await sql`
      SELECT id, title, short_description, description, capabilities, tech_highlight, icon
      FROM services
      ORDER BY created_at ASC;
    `) as any[];

    if (!rows || rows.length === 0) return defaultServices;

    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      shortDescription: r.short_description,
      description: r.description,
      capabilities: Array.isArray(r.capabilities) ? r.capabilities : JSON.parse(r.capabilities || "[]"),
      techHighlight: Array.isArray(r.tech_highlight) ? r.tech_highlight : JSON.parse(r.tech_highlight || "[]"),
      icon: r.icon || "LayoutGrid",
    }));
  } catch (err) {
    console.error("[StackWorks DB fetch error - getServices]:", err);
    return defaultServices;
  }
}
