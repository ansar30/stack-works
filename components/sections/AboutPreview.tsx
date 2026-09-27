import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="py-24 border-b border-[#27272A] bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Heading */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
              Studio Overview
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#FAFAFA] tracking-tight leading-tight">
              A small studio with an engineering mindset.
            </h2>
          </div>

          {/* Right Narrative Copy & Subtle Founder Note */}
          <div className="lg:col-span-7 space-y-6 text-base text-[#A1A1AA] leading-relaxed font-normal">
            <p>
              StackWorks is an independent software studio focused on building modern digital products, business systems and AI-powered applications.
            </p>
            <p>
              We combine product thinking with full-stack engineering to take projects from early ideas to reliable production software.
            </p>

            {/* Subtle Founder Note */}
            <div className="pt-4 border-t border-[#27272A] space-y-2">
              <p className="text-xs text-[#71717A] font-mono uppercase tracking-wider">
                Leadership Note
              </p>
              <p className="text-sm text-[#A1A1AA] italic">
                Founded and led by an independent software engineer with experience across full-stack development, cloud infrastructure, and AI-powered applications.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center space-x-1.5 text-sm font-medium text-[#FAFAFA] hover:text-[#A3E635] transition-colors"
              >
                <span>Read Full Studio Philosophy</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
