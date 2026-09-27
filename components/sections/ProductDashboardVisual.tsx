"use client";

import { useState } from "react";
import { Activity, ArrowUpRight, Boxes, Braces, Check, ChevronRight, Database, Fingerprint, Globe2, Layers3, ShieldCheck, Sparkles, Workflow, Zap } from "lucide-react";

type Layer = "product" | "platform" | "intelligence";

const layers: { id: Layer; label: string; icon: typeof Layers3; status: string }[] = [
  { id: "product", label: "Product", icon: Boxes, status: "Your experience, connected" },
  { id: "platform", label: "Platform", icon: Layers3, status: "A resilient foundation" },
  { id: "intelligence", label: "Intelligence", icon: Sparkles, status: "Systems that get smarter" },
];

const systems: Record<Layer, { name: string; detail: string; icon: typeof Layers3; position: string; color: string }[]> = {
  product: [
    { name: "Web app", detail: "Fast, focused experiences", icon: Globe2, position: "left-[3%] top-[9%]", color: "text-sky-300" },
    { name: "Your team", detail: "One clear control surface", icon: Boxes, position: "right-[3%] top-[9%]", color: "text-violet-300" },
    { name: "Mobile", detail: "Native where it matters", icon: Activity, position: "left-[3%] bottom-[8%]", color: "text-amber-300" },
    { name: "Integrations", detail: "Tools working together", icon: Workflow, position: "right-[3%] bottom-[8%]", color: "text-[#B8EF69]" },
  ],
  platform: [
    { name: "API & edge", detail: "14ms average response", icon: Braces, position: "left-[3%] top-[9%]", color: "text-sky-300" },
    { name: "Cloud", detail: "Always-on infrastructure", icon: Globe2, position: "right-[3%] top-[9%]", color: "text-violet-300" },
    { name: "Database", detail: "Secure, reliable storage", icon: Database, position: "left-[3%] bottom-[8%]", color: "text-amber-300" },
    { name: "Identity", detail: "Access by design", icon: Fingerprint, position: "right-[3%] bottom-[8%]", color: "text-[#B8EF69]" },
  ],
  intelligence: [
    { name: "Signals", detail: "Events become insight", icon: Activity, position: "left-[3%] top-[9%]", color: "text-sky-300" },
    { name: "AI layer", detail: "Useful, grounded AI", icon: Sparkles, position: "right-[3%] top-[9%]", color: "text-violet-300" },
    { name: "Knowledge", detail: "Your data, in context", icon: Database, position: "left-[3%] bottom-[8%]", color: "text-amber-300" },
    { name: "Automation", detail: "Less busywork, by default", icon: Zap, position: "right-[3%] bottom-[8%]", color: "text-[#B8EF69]" },
  ],
};

export function ProductDashboardVisual() {
  const [activeLayer, setActiveLayer] = useState<Layer>("platform");
  const [activeSystem, setActiveSystem] = useState(0);
  const active = layers.find((layer) => layer.id === activeLayer)!;
  const nodes = systems[activeLayer];

  function selectLayer(layer: Layer) {
    setActiveLayer(layer);
    setActiveSystem(0);
  }

  return (
    <div className="group relative isolate mx-auto w-full max-w-[660px] min-w-0 [perspective:1200px]">
      <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(ellipse_at_50%_45%,rgba(163,230,53,0.16),transparent_68%)] blur-3xl transition-opacity duration-700 group-hover:opacity-150" />
      <div className="overflow-hidden rounded-2xl border border-white/[0.11] bg-[#0b0d0f]/95 shadow-[0_32px_100px_-35px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-transform duration-500 ease-out group-hover:[transform:rotateY(-1deg)_rotateX(1deg)_translateY(-3px)] sm:rounded-[22px]">
        <header className="flex items-center justify-between gap-3 border-b border-white/[0.08] bg-white/[0.025] px-4 py-3.5 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex shrink-0 gap-1.5" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" /><span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" /><span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" /></div>
            <span className="h-5 w-px bg-white/10" />
            <div className="truncate text-[11px] text-zinc-400 sm:text-xs"><span className="font-medium text-zinc-200">stackworks</span><span className="mx-1.5 text-zinc-700">/</span>system map</div>
          </div>
          <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#A3E635]/20 bg-[#A3E635]/[0.07] px-2.5 py-1.5 text-[10px] font-medium tracking-wide text-[#C7F58A] sm:text-[11px]">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A3E635] opacity-50" /><span className="relative h-2 w-2 rounded-full bg-[#A3E635]" /></span>Systems online
          </div>
        </header>

        <div className="px-4 pt-4 sm:px-5 sm:pt-5">
          <div className="flex items-start justify-between gap-3">
            <div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B8EF69]">One connected system</div><h2 className="mt-1.5 text-lg font-medium tracking-tight text-white sm:text-xl">See how it all works together.</h2></div>
            <div className="hidden items-center gap-1.5 pt-1 text-[10px] text-zinc-500 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" /> Live architecture</div>
          </div>

          <div className="mt-4 flex gap-1.5 rounded-xl border border-white/[0.07] bg-black/25 p-1 sm:mt-5 sm:inline-flex sm:gap-1">
            {layers.map(({ id, label, icon: Icon }) => <button key={id} type="button" aria-pressed={activeLayer === id} onClick={() => selectLayer(id)} className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[10px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]/70 sm:flex-none sm:justify-start sm:px-3 sm:text-[11px] ${activeLayer === id ? "bg-white/[0.09] text-white shadow-sm shadow-black/30" : "text-zinc-500 hover:bg-white/[0.035] hover:text-zinc-200"}`}><Icon className={`h-3.5 w-3.5 ${activeLayer === id ? "text-[#B8EF69]" : ""}`} />{label}</button>)}
          </div>
        </div>

        <div className="relative mx-3 mt-3 h-[295px] overflow-hidden rounded-xl border border-white/[0.06] bg-[#0f1112] sm:mx-5 sm:mt-4 sm:h-[320px] sm:rounded-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_52%,rgba(163,230,53,0.075),transparent_45%)]" />
          <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(161,161,170,0.28)_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
          <div className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.09] sm:h-[238px] sm:w-[238px]" />
          <div className="absolute left-1/2 top-1/2 h-[154px] w-[154px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] sm:h-[178px] sm:w-[178px]" />

          <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 600 320" preserveAspectRatio="none">
            <defs><linearGradient id="system-line" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#A3E635" stopOpacity=".12" /><stop offset=".5" stopColor="#A3E635" stopOpacity=".62" /><stop offset="1" stopColor="#A3E635" stopOpacity=".12" /></linearGradient></defs>
            <path d="M112 74 C174 74 205 115 300 160" fill="none" stroke="url(#system-line)" strokeWidth="1.2" />
            <path d="M488 74 C426 74 395 115 300 160" fill="none" stroke="url(#system-line)" strokeWidth="1.2" />
            <path d="M112 246 C174 246 205 205 300 160" fill="none" stroke="url(#system-line)" strokeWidth="1.2" />
            <path d="M488 246 C426 246 395 205 300 160" fill="none" stroke="url(#system-line)" strokeWidth="1.2" />
            <circle className="motion-reduce:hidden" r="2.4" fill="#C7F58A"><animateMotion dur="3.8s" repeatCount="indefinite" path="M112 74 C174 74 205 115 300 160" /></circle>
            <circle className="motion-reduce:hidden" r="2.4" fill="#C7F58A"><animateMotion dur="4.3s" repeatCount="indefinite" path="M488 74 C426 74 395 115 300 160" /></circle>
            <circle className="motion-reduce:hidden" r="2.4" fill="#C7F58A"><animateMotion dur="4.6s" repeatCount="indefinite" path="M112 246 C174 246 205 205 300 160" /></circle>
            <circle className="motion-reduce:hidden" r="2.4" fill="#C7F58A"><animateMotion dur="4s" repeatCount="indefinite" path="M488 246 C426 246 395 205 300 160" /></circle>
          </svg>

          {nodes.map(({ name, detail, icon: Icon, position, color }, index) => <button key={`${activeLayer}-${name}`} type="button" aria-pressed={activeSystem === index} onClick={() => setActiveSystem(index)} className={`absolute z-10 ${position} flex w-[43%] max-w-[178px] items-center gap-2 rounded-xl border px-2.5 py-2 text-left backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]/80 sm:w-[37%] sm:max-w-[190px] sm:gap-2.5 sm:px-3 sm:py-2.5 ${activeSystem === index ? "border-[#A3E635]/30 bg-[#1a2013]/95 shadow-[0_0_28px_rgba(163,230,53,0.1)]" : "border-white/[0.09] bg-[#141618]/95 hover:border-white/20 hover:bg-[#191c1e]"}`}>
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.035] ${color}`}><Icon className="h-4 w-4" /></span><span className="min-w-0"><span className="block truncate text-[11px] font-medium text-zinc-100 sm:text-xs">{name}</span><span className="mt-0.5 block truncate text-[9px] text-zinc-500 sm:text-[10px]">{detail}</span></span><ChevronRight className={`ml-auto hidden h-3 w-3 shrink-0 sm:block ${activeSystem === index ? "text-[#B8EF69]" : "text-zinc-700"}`} />
          </button>)}

          <div className="absolute left-1/2 top-1/2 z-20 flex h-[102px] w-[102px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#A3E635]/25 bg-[#11160d]/95 shadow-[0_0_45px_rgba(163,230,53,0.12),inset_0_0_22px_rgba(163,230,53,0.045)] sm:h-[118px] sm:w-[118px]">
            <span className="absolute inset-[7px] rounded-full border border-dashed border-[#A3E635]/15 motion-safe:animate-[spin_28s_linear_infinite]" />
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#A3E635]/10 text-[#C7F58A] sm:h-9 sm:w-9"><Layers3 className="h-4.5 w-4.5 sm:h-5 sm:w-5" /></span>
            <span className="mt-2 text-[10px] font-semibold tracking-wide text-white sm:text-[11px]">Stackworks</span>
            <span className="mt-0.5 text-[8px] uppercase tracking-[0.16em] text-[#B8EF69]/75">{active.label}</span>
          </div>

          <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-[9px] text-zinc-600 sm:bottom-3 sm:left-4 sm:text-[10px]"><span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-400">i</span> Select a system to explore</div>
          <div className="absolute bottom-2.5 right-3 inline-flex items-center gap-1.5 text-[9px] text-zinc-600 sm:bottom-3 sm:right-4 sm:text-[10px]"><span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" /> Connected</div>
        </div>

        <footer className="mx-3 mb-3 mt-2.5 flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 sm:mx-5 sm:mb-5 sm:mt-3 sm:px-4 sm:py-3">
          <div className="flex min-w-0 items-center gap-2.5"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#A3E635]/[0.08] text-[#B8EF69]"><Check className="h-4 w-4" /></span><span className="min-w-0"><span className="block truncate text-[10px] font-medium text-zinc-200 sm:text-[11px]">{layers.find((layer) => layer.id === activeLayer)?.status}</span><span className="mt-0.5 block truncate text-[9px] text-zinc-500 sm:text-[10px]">{nodes[activeSystem].name} <span className="text-zinc-700">·</span> Ready for what&apos;s next</span></span></div>
          <span className="inline-flex shrink-0 items-center gap-1 text-[9px] font-medium text-[#B8EF69] sm:text-[10px]">Explore <ArrowUpRight className="h-3 w-3" /></span>
        </footer>
        <div className="sr-only" aria-live="polite">{active.label}: {nodes[activeSystem].name}. {nodes[activeSystem].detail}</div>
      </div>
    </div>
  );
}
