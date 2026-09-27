import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 bg-[#09090B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 rounded-2xl bg-[#111113] border border-[#27272A] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
              Ready to build?
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#FAFAFA] tracking-tight">
              Have a digital product or business system to engineer?
            </h2>
            <p className="text-base text-[#A1A1AA] leading-relaxed">
              Tell us about your project requirements, scope, and timeline. We respond directly with technical feedback and clear next steps.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-6 py-4 rounded-md bg-[#FAFAFA] text-[#09090B] hover:bg-white text-sm font-medium tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4 text-[#09090B]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
