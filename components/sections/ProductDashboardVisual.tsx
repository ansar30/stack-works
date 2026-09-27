"use client";

import { useState } from "react";
import { Activity, ArrowUpRight, Check, ChevronRight, CirclePause, Cpu, Database, Radio, ShieldCheck, Sparkles, Workflow, Zap } from "lucide-react";

type View = "platform" | "intelligence" | "automation";

const dashboard: Record<View, {
  name: string;
  heading: string;
  description: string;
  metrics: { name: string; value: string; note: string }[];
  chartLabel: string;
  chartValue: string;
  chart: number[];
  systems: { name: string; note: string }[];
  events: { time: string; name: string; detail: string }[];
}> = {
  platform: {
    name: "Platform", heading: "Your product, running smoothly.", description: "A clear view across the systems behind your product.",
    metrics: [{ name: "Uptime", value: "99.98%", note: "this month" }, { name: "API latency", value: "14ms", note: "p95 response" }, { name: "Requests", value: "2,410", note: "per second" }],
    chartLabel: "Request volume", chartValue: "2,410 req/s", chart: [30, 36, 31, 43, 38, 50, 46, 42, 58, 55, 63, 52, 66, 61, 74, 69, 77, 70, 88, 78, 84, 73, 91, 82, 96, 86, 92, 80, 89, 100],
    systems: [{ name: "Application", note: "All regions healthy" }, { name: "Database", note: "Pool operating normally" }, { name: "Edge network", note: "No delivery delays" }],
    events: [{ time: "15:44:07", name: "API", detail: "Request completed in 14ms" }, { time: "15:44:05", name: "DATABASE", detail: "Connection pool healthy" }, { time: "15:44:02", name: "EDGE", detail: "Route cache refreshed" }],
  },
  intelligence: {
    name: "Intelligence", heading: "Knowledge, ready when you need it.", description: "Search, context, and AI working as one system.",
    metrics: [{ name: "Match quality", value: "0.984", note: "similarity score" }, { name: "Response", value: "120ms", note: "end to end" }, { name: "Knowledge", value: "4.8k", note: "indexed sources" }],
    chartLabel: "Search activity", chartValue: "684 searches / min", chart: [22, 35, 29, 42, 35, 55, 44, 63, 51, 46, 69, 58, 72, 61, 83, 69, 77, 62, 91, 74, 85, 72, 97, 81, 89, 77, 100, 83, 92, 86],
    systems: [{ name: "Semantic search", note: "Index is up to date" }, { name: "AI services", note: "Response within target" }, { name: "Knowledge store", note: "Sources synchronized" }],
    events: [{ time: "15:44:07", name: "SEARCH", detail: "Relevant match found · 0.984" }, { time: "15:44:05", name: "KNOWLEDGE", detail: "Source indexed successfully" }, { time: "15:44:02", name: "AI", detail: "Response streamed in 120ms" }],
  },
  automation: {
    name: "Automation", heading: "The right work, already in motion.", description: "Events flow through your business without the busywork.",
    metrics: [{ name: "Events", value: "1,284", note: "this hour" }, { name: "Delivered", value: "99.9%", note: "success rate" }, { name: "Processing", value: "18ms", note: "average" }],
    chartLabel: "Workflow activity", chartValue: "1,284 events", chart: [27, 34, 26, 44, 36, 53, 41, 61, 50, 67, 58, 48, 72, 59, 80, 67, 88, 72, 81, 65, 94, 77, 85, 70, 96, 82, 91, 78, 100, 88],
    systems: [{ name: "Event queue", note: "No items waiting" }, { name: "Workflows", note: "All jobs completed" }, { name: "Integrations", note: "Connected and in sync" }],
    events: [{ time: "15:44:07", name: "WORKFLOW", detail: "Order confirmation sent" }, { time: "15:44:05", name: "QUEUE", detail: "Batch processed · 18ms" }, { time: "15:44:02", name: "INTEGRATION", detail: "Inventory synchronized" }],
  },
};

const views: { id: View; icon: typeof Activity }[] = [
  { id: "platform", icon: Activity },
  { id: "intelligence", icon: Sparkles },
  { id: "automation", icon: Workflow },
];

export function ProductDashboardVisual() {
  const [view, setView] = useState<View>("platform");
  const [paused, setPaused] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const active = dashboard[view];
  const chartPoints = active.chart.map((value, index) => `${(index / (active.chart.length - 1)) * 600},${116 - value}`).join(" ");
  const chartPath = `M ${chartPoints.replaceAll(" ", " L ")}`;

  return (
    <div className="relative mx-auto w-full max-w-[660px] min-w-0">
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(ellipse_at_50%_48%,rgba(163,230,53,0.11),transparent_68%)] blur-3xl" />
      <div className="overflow-hidden rounded-2xl border border-[#27272A] bg-[#111113] shadow-[0_28px_80px_-38px_rgba(0,0,0,0.95)] sm:rounded-[20px]">
        <header className="flex items-center justify-between gap-3 border-b border-[#27272A] bg-[#18181B] px-4 py-3.5 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex shrink-0 gap-1.5" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" /></div>
            <span className="h-4 w-px bg-[#3F3F46]" />
            <span className="truncate font-mono text-[10px] tracking-tight text-[#A1A1AA] sm:text-[11px]">app.stackworks.studio <span className="text-[#52525B]">/</span> system-v2.4</span>
          </div>
          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#A3E635]/20 bg-[#A3E635]/[0.06] px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-[#B8EF69] sm:text-[10px]">
            <span className={`h-1.5 w-1.5 rounded-full bg-[#A3E635] ${paused ? "" : "animate-pulse"}`} />{paused ? "Paused" : "Live"}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_190px]">
          <main className="min-w-0 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0"><div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.15em] text-[#A3E635]"><Radio className="h-3.5 w-3.5" /> System overview</div><h2 className="text-[17px] font-medium leading-snug tracking-tight text-[#FAFAFA] sm:text-lg">{active.heading}</h2><p className="mt-1 text-[11px] leading-relaxed text-[#71717A]">{active.description}</p></div>
              <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume preview" : "Pause preview"} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#18181B] text-zinc-400 transition-colors hover:border-[#3F3F46] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]/70">{paused ? <Radio className="h-3.5 w-3.5" /> : <CirclePause className="h-3.5 w-3.5" />}</button>
            </div>

            <div className="mt-4 flex gap-1 border-b border-[#27272A] sm:mt-5">
              {views.map(({ id, icon: Icon }) => <button key={id} type="button" aria-pressed={view === id} onClick={() => setView(id)} className={`relative inline-flex flex-1 items-center justify-center gap-1.5 px-2 pb-2.5 pt-1 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#A3E635]/70 sm:flex-none sm:justify-start sm:px-3 sm:text-[11px] ${view === id ? "text-[#FAFAFA]" : "text-[#71717A] hover:text-[#D4D4D8]"}`}><Icon className={`h-3.5 w-3.5 ${view === id ? "text-[#A3E635]" : ""}`} />{dashboard[id].name}{view === id && <span className="absolute inset-x-2 bottom-0 h-px bg-[#A3E635] sm:inset-x-3" />}</button>)}
            </div>

            <div className="mt-4 grid grid-cols-3 divide-x divide-[#27272A] rounded-xl border border-[#27272A] bg-[#09090B]/55 py-3">
              {active.metrics.map((metric) => <div key={metric.name} className="min-w-0 px-2.5 sm:px-3.5"><div className="truncate text-[9px] font-mono uppercase tracking-wider text-[#71717A]">{metric.name}</div><div className="mt-1 font-mono text-base font-medium tracking-tight text-[#FAFAFA] sm:text-lg">{metric.value}</div><div className="mt-0.5 truncate text-[9px] text-[#71717A]">{metric.note}</div></div>)}
            </div>

            <section aria-label={active.chartLabel} className="mt-3.5 rounded-xl border border-[#27272A] bg-[#09090B]/45 p-3 sm:p-3.5">
              <div className="flex items-center justify-between gap-2"><div className="flex items-center gap-1.5 text-[10px] font-mono text-[#A1A1AA]"><Activity className="h-3.5 w-3.5 text-[#A3E635]" />{active.chartLabel}</div><div className="font-mono text-[10px] text-[#FAFAFA]">{active.chartValue}</div></div>
              <div className="relative mt-3 h-[95px] overflow-hidden">
                <div className="absolute inset-0 flex flex-col justify-between"><span className="border-t border-dashed border-[#27272A]" /><span className="border-t border-dashed border-[#27272A]" /><span className="border-t border-dashed border-[#27272A]" /></div>
                <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 600 116" preserveAspectRatio="none" role="img" aria-label={`${active.chartLabel} trend rising over the last hour`}>
                  <defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#A3E635" stopOpacity=".20" /><stop offset="1" stopColor="#A3E635" stopOpacity="0" /></linearGradient></defs>
                  <path d={`${chartPath} L 600 116 L 0 116 Z`} fill="url(#chart-fill)" />
                  <polyline points={chartPoints} fill="none" stroke="#A3E635" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  <circle cx="600" cy={116 - active.chart[active.chart.length - 1]} r="4" fill="#A3E635" stroke="#111113" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
                <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#111113]/60 to-transparent" />
              </div>
              <div className="mt-1 flex justify-between font-mono text-[8px] text-[#52525B]"><span>60 min ago</span><span>45 min</span><span>30 min</span><span>15 min</span><span>now</span></div>
            </section>

            <section aria-label="Recent activity" className="mt-3.5">
              <div className="mb-1.5 flex items-center justify-between"><span className="text-[9px] font-mono uppercase tracking-[0.13em] text-[#71717A]">Recent activity</span><button type="button" onClick={() => setShowAllEvents((value) => !value)} aria-expanded={showAllEvents} className="inline-flex items-center gap-1 text-[9px] text-[#71717A] transition-colors hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]/70">{showAllEvents ? "Show less" : "View stream"} <ChevronRight className={`h-3 w-3 transition-transform ${showAllEvents ? "rotate-90" : ""}`} /></button></div>
              <div className="divide-y divide-[#27272A]/70">
                {active.events.slice(0, showAllEvents ? active.events.length : 2).map((event) => <div key={event.time} className="flex items-center gap-2 py-2"><span className="shrink-0 font-mono text-[9px] text-[#52525B]">{event.time}</span><span className="shrink-0 rounded border border-[#27272A] bg-[#18181B] px-1.5 py-0.5 font-mono text-[8px] text-[#A1A1AA]">{event.name}</span><span className="min-w-0 flex-1 truncate text-[10px] text-[#A1A1AA]">{event.detail}</span><Check className="h-3 w-3 shrink-0 text-[#A3E635]" /></div>)}
              </div>
            </section>
          </main>

          <aside className="border-t border-[#27272A] bg-[#09090B]/35 px-4 py-4 md:border-l md:border-t-0 md:px-3.5 md:py-5">
            <div className="flex items-center justify-between"><span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#71717A]">System status</span><span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" /></div>
            <div className="mt-3 space-y-2">
              {active.systems.map((system, index) => { const Icon = index === 0 ? Cpu : index === 1 ? Database : ShieldCheck; return <div key={system.name} className="rounded-lg border border-[#27272A] bg-[#111113] p-2.5"><div className="flex items-center gap-2"><Icon className="h-3.5 w-3.5 text-[#A3E635]" /><span className="text-[10px] font-medium text-[#E4E4E7]">{system.name}</span></div><div className="mt-1.5 flex items-center gap-1.5 pl-[22px] text-[9px] text-[#71717A]"><span className="h-1 w-1 rounded-full bg-[#A3E635]" />{system.note}</div></div>; })}
            </div>
            <div className="mt-3.5 border-t border-[#27272A] pt-3.5">
              <div className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#71717A]">Environment</div>
              <div className="mt-2.5 space-y-2 text-[9px] text-[#A1A1AA]"><div className="flex items-center justify-between"><span>Region</span><span className="font-mono text-zinc-300">US East</span></div><div className="flex items-center justify-between"><span>Database</span><span className="font-mono text-zinc-300">Neon PG</span></div><div className="flex items-center justify-between"><span>Deploy</span><span className="font-mono text-zinc-300">Vercel</span></div></div>
            </div>
            <div className="mt-3.5 rounded-lg border border-[#A3E635]/15 bg-[#A3E635]/[0.045] p-2.5"><div className="flex items-center gap-1.5 text-[9px] font-medium text-[#B8EF69]"><ShieldCheck className="h-3 w-3" />All systems operational</div><div className="mt-1 text-[9px] leading-relaxed text-[#71717A]">Health checks are passing across your stack.</div></div>
            <div className="mt-3 hidden items-center justify-between border-t border-[#27272A] pt-3 text-[9px] text-[#52525B] md:flex"><span>Details</span><ArrowUpRight className="h-3 w-3" /></div>
          </aside>
        </div>
        <footer className="flex items-center justify-between border-t border-[#27272A] bg-[#09090B]/45 px-4 py-2.5 font-mono text-[8px] text-[#52525B] sm:px-5"><span className="inline-flex items-center gap-1.5"><Zap className="h-2.5 w-2.5 text-[#A3E635]" />Product system preview</span><span>STACKWORKS <span className="mx-1.5 text-[#3F3F46]">/</span> V2.4</span></footer>
      </div>
    </div>
  );
}
