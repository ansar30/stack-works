export interface TechCategory {
  category: string;
  items: string[];
}

export const techStack: TechCategory[] = [
  {
    category: "Frontend & UI",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Web Vitals"],
  },
  {
    category: "Backend & Systems",
    items: ["Node.js", "REST APIs", "GraphQL", "Serverless Functions", "Webhooks"],
  },
  {
    category: "Data & Storage",
    items: ["PostgreSQL", "Neon", "Redis", "pgvector", "SQL Schema Migration"],
  },
  {
    category: "Cloud & Infrastructure",
    items: ["Vercel", "AWS", "Docker", "CI/CD Pipelines", "Edge Networks"],
  },
  {
    category: "AI & Automation",
    items: ["LLM APIs", "RAG Systems", "Vector Embeddings", "AI Integrations", "Workflow Automation"],
  },
];
