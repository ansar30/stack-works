import Link from "next/link";
import { principles } from "@/data/principles";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = {
  title: "About Studio & Engineering Standards | StackWorks",
  description: "Learn about StackWorks, an independent software studio built around senior engineering discipline and product thinking.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4 border-b border-[#27272A] pb-10">
          <span className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
            Studio Philosophy
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#FAFAFA] tracking-tight">
            A small software studio with an engineering mindset.
          </h1>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            StackWorks was built to offer modern businesses a credible alternative to bloated agencies and fragmented freelance engagements.
          </p>
        </div>

        {/* Narrative & Positioning Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6 text-base text-[#A1A1AA] leading-relaxed">
            <h2 className="text-2xl font-semibold text-[#FAFAFA] tracking-tight">
              Craftsmanship, speed, and business context.
            </h2>
            <p>
              StackWorks is an independent software engineering studio focused on designing and building custom web applications, SaaS platforms, AI systems, and business automation software.
            </p>
            <p>
              We believe great software is the result of combining deep technical competence with clear business understanding. We write clean, maintainable code, design intuitive user interfaces, and deploy architectures that scale reliably under real-world load.
            </p>
            <p>
              Because we operate as a focused studio, you work directly with senior engineering expertise on every milestone—ensuring direct communication, fast decision-making, and zero corporate overhead.
            </p>

            {/* Subtle Founder Note */}
            <div className="p-6 rounded-xl bg-[#111113] border border-[#27272A] space-y-3 mt-8">
              <span className="text-xs font-mono text-[#A3E635] uppercase">Leadership Note</span>
              <p className="text-sm text-[#FAFAFA] italic leading-relaxed">
                Founded and led by an independent software engineer with experience across full-stack development, cloud infrastructure, search engines, and AI-powered applications.
              </p>
            </div>
          </div>

          {/* Right Highlights Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-xl bg-[#111113] border border-[#27272A] space-y-6">
              <h3 className="text-xs font-mono text-[#FAFAFA] uppercase tracking-wider border-b border-[#27272A] pb-3">
                Why Companies Partner With Us
              </h3>
              <ul className="space-y-4">
                {[
                  "Direct engineering access with zero account manager abstraction",
                  "TypeScript-first codebase for maintainability and safety",
                  "Production-grade security, rate-limiting, and schema validation",
                  "Serverless deployment models targeting Vercel & Neon PostgreSQL",
                  "Transparent milestone reporting with staging previews",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs text-[#A1A1AA]">
                    <CheckCircle2 className="w-4 h-4 text-[#A3E635] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Studio Principles Section */}
        <div className="space-y-10 border-t border-[#27272A] pt-16">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
              Core Principles
            </span>
            <h2 className="text-3xl font-semibold text-[#FAFAFA] tracking-tight">
              Our Operating Standards.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((item, idx) => (
              <div
                key={item.title}
                className="p-8 rounded-xl bg-[#111113] border border-[#27272A] space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs text-[#71717A]">0{idx + 1}</span>
                  <h3 className="text-xl font-semibold text-[#FAFAFA] tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs font-mono text-[#A3E635] uppercase">{item.subtitle}</p>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <FinalCTA />
      </div>
    </div>
  );
}
