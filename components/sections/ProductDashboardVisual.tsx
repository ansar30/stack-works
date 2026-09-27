"use client";

import { useState, useEffect } from "react";
import { Terminal, Activity, CheckCircle2, Cpu, ShieldCheck, Zap } from "lucide-react";

export function ProductDashboardVisual() {
  const [activeTab, setActiveTab] = useState<"overview" | "ingestion" | "security">("overview");
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    { time: "15:44:01", label: "DB POOL", msg: "PostgreSQL query executed in 2.1ms (Neon)", status: "success" },
    { time: "15:44:02", label: "AUTH", msg: "Session token validated via JWT RS256", status: "info" },
    { time: "15:44:04", label: "VECTOR", msg: "pgvector similarity match score 0.984", status: "success" },
    { time: "15:44:05", label: "EDGE", msg: "Next.js ISR revalidated route /api/v1/metrics", status: "info" },
    { time: "15:44:07", label: "WORKFLOW", msg: "Webhook dispatcher delivered payload", status: "success" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % logs.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [logs.length]);

  return (
    <div className="w-full rounded-xl border border-[#27272A] bg-[#111113] shadow-2xl overflow-hidden text-xs">
      {/* Top Window Bar */}
      <div className="px-3.5 sm:px-4 py-3 bg-[#18181B] border-b border-[#27272A] flex items-center justify-between gap-2 overflow-hidden">
        <div className="flex items-center space-x-2 min-w-0">
          <div className="flex space-x-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#27272A]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27272A]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27272A]" />
          </div>
          <span className="font-mono text-[10px] sm:text-[11px] text-[#A1A1AA] truncate tracking-tight">
            app.stackworks.studio / system-v2.4
          </span>
        </div>
        <div className="flex items-center space-x-1.5 shrink-0">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A3E635] animate-pulse" />
          <span className="font-mono text-[9px] sm:text-[10px] text-[#A3E635] uppercase tracking-wider">
            Live
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-0 md:min-h-[340px]">
        {/* Sidebar Controls */}
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-[#27272A] bg-[#09090B]/60 p-2.5 sm:p-3 space-y-1">
          <div className="text-[9px] font-mono text-[#71717A] uppercase px-2 py-1 tracking-wider hidden sm:block">
            Workspaces
          </div>
          <div className="flex md:flex-col gap-1 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <button
              onClick={() => setActiveTab("overview")}
              className={`shrink-0 text-left px-2.5 py-1.5 rounded-md font-medium transition-colors flex items-center space-x-2 text-[11px] ${
                activeTab === "overview"
                  ? "bg-[#18181B] text-[#FAFAFA] border border-[#27272A]"
                  : "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]/50"
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-[#A3E635] shrink-0" />
              <span className="whitespace-nowrap">Overview</span>
            </button>
            <button
              onClick={() => setActiveTab("ingestion")}
              className={`shrink-0 text-left px-2.5 py-1.5 rounded-md font-medium transition-colors flex items-center space-x-2 text-[11px] ${
                activeTab === "ingestion"
                  ? "bg-[#18181B] text-[#FAFAFA] border border-[#27272A]"
                  : "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]/50"
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="whitespace-nowrap">API & Ingestion</span>
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`shrink-0 text-left px-2.5 py-1.5 rounded-md font-medium transition-colors flex items-center space-x-2 text-[11px] ${
                activeTab === "security"
                  ? "bg-[#18181B] text-[#FAFAFA] border border-[#27272A]"
                  : "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]/50"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="whitespace-nowrap">Data & Security</span>
            </button>
          </div>

          <div className="hidden md:block pt-3 mt-3 border-t border-[#27272A]/60 px-2 space-y-2">
            <div className="text-[9px] font-mono text-[#71717A] uppercase tracking-wider">
              Environment
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#A1A1AA]">
              <span>Region</span>
              <span className="font-mono text-[#FAFAFA]">iad1 (Vercel)</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#A1A1AA]">
              <span>Database</span>
              <span className="font-mono text-[#FAFAFA]">Neon PG</span>
            </div>
          </div>
        </div>

        {/* Display Area */}
        <div className="md:col-span-9 p-3.5 sm:p-4 flex flex-col justify-between space-y-3.5">
          {/* Stats Grid - Responsive wrap */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-lg bg-[#18181B]/70 border border-[#27272A]">
              <div className="text-[9px] font-mono text-[#71717A] uppercase">API Latency</div>
              <div className="text-sm sm:text-base font-semibold text-[#FAFAFA] mt-0.5 font-mono">14ms</div>
              <div className="text-[9px] text-[#A3E635] mt-0.5 flex items-center">
                <Zap className="w-2.5 h-2.5 mr-0.5" /> p99 optimized
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#18181B]/70 border border-[#27272A]">
              <div className="text-[9px] font-mono text-[#71717A] uppercase">Active Queries</div>
              <div className="text-sm sm:text-base font-semibold text-[#FAFAFA] mt-0.5 font-mono">2,410 /s</div>
              <div className="text-[9px] text-zinc-400 mt-0.5">Pooled execution</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#18181B]/70 border border-[#27272A]">
              <div className="text-[9px] font-mono text-[#71717A] uppercase">Health Status</div>
              <div className="text-sm sm:text-base font-semibold text-[#FAFAFA] mt-0.5 font-mono">99.98%</div>
              <div className="text-[9px] text-[#A3E635] mt-0.5 flex items-center">
                <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" /> All nominal
              </div>
            </div>
          </div>

          {/* Bar Graph Representation */}
          <div className="p-3 rounded-lg bg-[#18181B]/40 border border-[#27272A] space-y-2">
            <div className="flex items-center justify-between text-[10px] text-[#A1A1AA] font-mono">
              <span>QUERY THROUGHPUT (RPS)</span>
              <span className="text-[#A3E635]">PEAK: 3,840</span>
            </div>
            <div className="h-10 sm:h-12 flex items-end justify-between space-x-1 pt-1">
              {[40, 65, 45, 80, 55, 90, 70, 85, 100, 75, 60, 95, 85, 70, 90, 65, 80].map((val, idx) => (
                <div
                  key={idx}
                  style={{ height: `${val}%` }}
                  className={`w-full rounded-t-xs transition-all duration-300 ${
                    idx === 8 ? "bg-[#A3E635]" : "bg-[#27272A]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Live Log Stream */}
          <div className="p-2.5 rounded-lg bg-[#09090B] border border-[#27272A] font-mono text-[10px] space-y-1">
            <div className="flex items-center justify-between text-[#71717A] border-b border-[#27272A]/50 pb-1 mb-1">
              <span className="flex items-center space-x-1.5">
                <Terminal className="w-3 h-3 text-[#A3E635]" />
                <span className="tracking-wider uppercase">Realtime Logs</span>
              </span>
              <span className="text-[9px]">live</span>
            </div>
            {logs.slice(0, 2).map((log, idx) => {
              const isCurrent = idx === logIndex % 2;
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between py-0.5 gap-2 transition-opacity ${
                    isCurrent ? "text-[#FAFAFA]" : "text-[#71717A]"
                  }`}
                >
                  <div className="flex items-center space-x-1.5 truncate">
                    <span className="text-[#71717A] shrink-0">[{log.time}]</span>
                    <span className="px-1 py-0.5 rounded bg-[#18181B] text-[8px] text-[#A1A1AA] shrink-0">
                      {log.label}
                    </span>
                    <span className="truncate">{log.msg}</span>
                  </div>
                  <span className="text-[9px] text-[#A3E635] shrink-0 font-medium">200 OK</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
