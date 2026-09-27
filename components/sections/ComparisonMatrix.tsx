"use client";

import { Check, X } from "lucide-react";

export function ComparisonMatrix() {
  const comparison = [
    {
      feature: "Engineering Leadership",
      agency: "Junior developers abstracted by account managers",
      studio: "Direct access to senior full-stack software engineers",
    },
    {
      feature: "Architecture & Code Quality",
      agency: "Generic templates & bloatware plugins",
      studio: "Bespoke TypeScript, Next.js, and serverless Neon DB",
    },
    {
      feature: "Database & Security",
      agency: "Basic shared hosting without parameterization",
      studio: "Neon serverless PostgreSQL, Zod validation, rate limiting",
    },
    {
      feature: "Communication & Speed",
      agency: "Slow email ticketing & black-box development",
      studio: "Direct milestone syncs, live staging environments",
    },
  ];

  return (
    <section className="py-20 border-b border-[#27272A] bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
            Why Partner With StackWorks
          </span>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#FAFAFA] tracking-tight">
            Built for founders who value senior engineering.
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA]">
            How our boutique studio model compares to traditional software agencies.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-xl border border-[#27272A] bg-[#111113] overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#27272A] bg-[#18181B] text-xs font-mono text-[#71717A] uppercase tracking-wider">
                <th className="p-4 sm:p-6">Aspect</th>
                <th className="p-4 sm:p-6 text-zinc-400">Traditional Agency</th>
                <th className="p-4 sm:p-6 text-[#A3E635]">StackWorks Studio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]/80">
              {comparison.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#18181B]/40 transition-colors">
                  <td className="p-4 sm:p-6 font-semibold text-[#FAFAFA] whitespace-nowrap">
                    {item.feature}
                  </td>
                  <td className="p-4 sm:p-6 text-[#71717A] flex items-center space-x-2">
                    <X className="w-4 h-4 text-red-500/80 shrink-0" />
                    <span>{item.agency}</span>
                  </td>
                  <td className="p-4 sm:p-6 text-[#FAFAFA] font-medium flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#A3E635] shrink-0" />
                    <span>{item.studio}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
