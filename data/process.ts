export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the business problem, users, technical constraints, and desired outcome before writing code.",
    deliverables: ["Product requirement sync", "Technical feasibility check", "Core metric alignment"],
  },
  {
    number: "02",
    title: "Architect",
    description: "Define the product scope, schema design, API boundaries, technical architecture, and milestones.",
    deliverables: ["System architecture spec", "Database schema definition", "Milestone timeline"],
  },
  {
    number: "03",
    title: "Build",
    description: "Design, develop, and iterate with direct communication and continuous testing environments.",
    deliverables: ["Production-grade code", "Staging environment previews", "Automated test coverage"],
  },
  {
    number: "04",
    title: "Launch",
    description: "Deploy to production, configure domain & security header rules, monitor performance, and hand over ownership.",
    deliverables: ["Zero-downtime deployment", "Telemetry & monitoring", "Complete repository & documentation handoff"],
  },
];
