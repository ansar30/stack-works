"use client";

import { useState } from "react";
import { Cpu, Layers, Sparkles, Server, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function InteractiveWorkflowPlayground() {
  const [activeWorkflow, setActiveWorkflow] = useState<"saas" | "ai" | "automation">("saas");

  const workflows = {
    saas: {
      title: "SaaS Multi-Tenant Architecture",
      subtitle: "Scalable multi-tenant databases with instant subscription billing & RBAC",
      metrics: [
        { label: "Tenant Isolation", val: "Row-Level Security" },
        { label: "DB Latency", val: "1.8ms (Neon Serverless)" },
        { label: "Auth Provider", val: "JWT RS256 Tokens" },
      ],
      steps: [
        { name: "01. Auth & Session", detail: "Validates tenant context & RBAC scopes" },
        { name: "02. Connection Pool", detail: "Routes query to serverless Neon PG pool" },
        { name: "03. State Synthesis", detail: "Renders Next.js server components in 14ms" },
      ],
      codeSnippet: `// Multi-tenant DB Query with Neon Pooler
const tenantDb = await getTenantClient(req.tenantId);
const subscription = await tenantDb.query(
  'SELECT status, quota FROM subscriptions WHERE tenant_id = $1',
  [req.tenantId]
);`,
    },
    ai: {
      title: "RAG & Vector Knowledge Engine",
      subtitle: "Semantic search and context-aware LLM synthesis over enterprise document stores",
      metrics: [
        { label: "Vector Search", val: "pgvector (HNSW Index)" },
        { label: "Match Score", val: "0.984 Cosine Similarity" },
        { label: "Latency", val: "120ms End-to-End" },
      ],
      steps: [
        { name: "01. Vector Embedding", detail: "Generates 1536-dim embedding vector" },
        { name: "02. Nearest Neighbor", detail: "Executes top-k pgvector similarity query" },
        { name: "03. Context Assembly", detail: "Feeds retrieved chunks into LLM stream" },
      ],
      codeSnippet: `// RAG Context Match Query
const embeddings = await openai.embeddings.create({ input: query });
const results = await sql\`
  SELECT content, 1 - (embedding <=> \${embeddings}) AS similarity
  FROM document_chunks ORDER BY similarity DESC LIMIT 5;
\`;`,
    },
    automation: {
      title: "Business Process Automation Queue",
      subtitle: "Event-driven webhooks, scheduled background cron workers, and automated reconciliation",
      metrics: [
        { label: "Queue Dispatcher", val: "Idempotent Retry Handler" },
        { label: "Sync Interval", val: "5-Minute Automated Cron" },
        { label: "Audit Trace", val: "100% Immutable Log" },
      ],
      steps: [
        { name: "01. Event Ingestion", detail: "Captures third-party webhooks with signature check" },
        { name: "02. Background Worker", detail: "Processes payload in isolated serverless job" },
        { name: "03. Audit Logging", detail: "Records execution status & dispatches alerts" },
      ],
      codeSnippet: `// Background Idempotent Automation Task
export async function POST(req: NextRequest) {
  const signature = req.headers.get('x-webhook-signature');
  verifySignature(signature, req.rawBody);
  await queue.enqueue('reconcile-inventory', req.json());
}`,
    },
  };

  const current = workflows[activeWorkflow];

  return (
    <section className="py-20 border-b border-[#27272A] bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#27272A] pb-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
              Interactive System Explorer
            </span>
            <h2 className="text-2xl sm:text-4xl font-semibold text-[#FAFAFA] tracking-tight">
              Test StackWorks engineering patterns in real time.
            </h2>
            <p className="text-sm text-[#A1A1AA]">
              Select a system pattern below to inspect live query benchmarks, architectural execution flows, and production code snippets.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
            <span className="text-xs font-mono text-[#FAFAFA]">Interactive Sandbox Active</span>
          </div>
        </div>

        {/* Workflow Switcher Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveWorkflow("saas")}
            className={`p-5 rounded-xl border text-left transition-all ${
              activeWorkflow === "saas"
                ? "bg-[#18181B] border-[#A3E635] shadow-lg shadow-[#A3E635]/5"
                : "bg-[#111113] border-[#27272A] hover:border-[#3F3F46]"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Layers className={`w-5 h-5 ${activeWorkflow === "saas" ? "text-[#A3E635]" : "text-zinc-400"}`} />
              <span className="text-[10px] font-mono text-[#71717A] uppercase">Pattern 01</span>
            </div>
            <h3 className="text-base font-semibold text-[#FAFAFA]">SaaS Platforms</h3>
            <p className="text-xs text-[#A1A1AA] mt-1">Multi-tenant models & subscription billing</p>
          </button>

          <button
            onClick={() => setActiveWorkflow("ai")}
            className={`p-5 rounded-xl border text-left transition-all ${
              activeWorkflow === "ai"
                ? "bg-[#18181B] border-[#A3E635] shadow-lg shadow-[#A3E635]/5"
                : "bg-[#111113] border-[#27272A] hover:border-[#3F3F46]"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Sparkles className={`w-5 h-5 ${activeWorkflow === "ai" ? "text-[#A3E635]" : "text-zinc-400"}`} />
              <span className="text-[10px] font-mono text-[#71717A] uppercase">Pattern 02</span>
            </div>
            <h3 className="text-base font-semibold text-[#FAFAFA]">AI & Vector Search</h3>
            <p className="text-xs text-[#A1A1AA] mt-1">RAG pipelines & semantic match search</p>
          </button>

          <button
            onClick={() => setActiveWorkflow("automation")}
            className={`p-5 rounded-xl border text-left transition-all ${
              activeWorkflow === "automation"
                ? "bg-[#18181B] border-[#A3E635] shadow-lg shadow-[#A3E635]/5"
                : "bg-[#111113] border-[#27272A] hover:border-[#3F3F46]"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Cpu className={`w-5 h-5 ${activeWorkflow === "automation" ? "text-[#A3E635]" : "text-zinc-400"}`} />
              <span className="text-[10px] font-mono text-[#71717A] uppercase">Pattern 03</span>
            </div>
            <h3 className="text-base font-semibold text-[#FAFAFA]">Business Automation</h3>
            <p className="text-xs text-[#A1A1AA] mt-1">Event webhooks & idempotent cron queues</p>
          </button>
        </div>

        {/* Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-2xl bg-[#111113] border border-[#27272A]">
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#A3E635]">
                <Zap className="w-3.5 h-3.5" />
                <span>{current.title}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#FAFAFA]">{current.subtitle}</h3>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3">
              {current.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#18181B] border border-[#27272A] space-y-1">
                  <span className="text-[10px] font-mono text-[#71717A] uppercase block">{m.label}</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#FAFAFA] font-mono block">{m.val}</span>
                </div>
              ))}
            </div>

            {/* Execution Steps */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono text-[#FAFAFA] uppercase">Execution Pipeline Steps</span>
              <div className="space-y-2">
                {current.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs p-3 rounded-lg bg-[#18181B]/60 border border-[#27272A]">
                    <CheckCircle2 className="w-4 h-4 text-[#A3E635] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#FAFAFA] font-mono block">{step.name}</span>
                      <span className="text-[#A1A1AA]">{step.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Code Display */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="rounded-xl bg-[#09090B] border border-[#27272A] p-4 font-mono text-xs overflow-x-auto space-y-3">
              <div className="flex items-center justify-between border-b border-[#27272A]/80 pb-2 text-[#71717A] text-[11px]">
                <span className="flex items-center space-x-1.5">
                  <Server className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>production-schema.ts</span>
                </span>
                <span className="text-[10px] text-[#A3E635]">Type-safe</span>
              </div>
              <pre className="text-[#A1A1AA] leading-relaxed">
                <code>{current.codeSnippet}</code>
              </pre>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[#71717A] font-mono">Deployable to Vercel & Neon PostgreSQL</span>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-1 text-[#FAFAFA] hover:text-[#A3E635] font-medium transition-colors"
              >
                <span>Discuss Implementation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
