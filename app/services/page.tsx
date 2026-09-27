import Link from "next/link";
import { getServices } from "@/data/services";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = {
  title: "Services & Engineering Capabilities | StackWorks",
  description: "End-to-end software engineering capabilities including web products, SaaS platforms, AI systems, and APIs.",
};

export const revalidate = 0; // Dynamic route

export default async function ServicesPage() {
  const servicesList = await getServices();

  return (
    <div className="pt-32 pb-20 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4 border-b border-[#27272A] pb-10">
          <span className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
            Capabilities Overview
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#FAFAFA] tracking-tight">
            Software Engineering Capabilities.
          </h1>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            We partner with business owners and founders to build web applications, SaaS platforms, AI-powered tools, and backend automation designed for production scale.
          </p>
        </div>

        {/* Detailed Services Breakdown */}
        <div className="space-y-16">
          {servicesList.map((service, index) => (
            <div
              key={service.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-12 rounded-2xl bg-[#111113] border border-[#27272A] hover:border-[#3F3F46] transition-colors"
            >
              {/* Left Column: Number & Title */}
              <div className="lg:col-span-5 space-y-4">
                <span className="font-mono text-xs text-[#A3E635]">0{index + 1} / SERVICE</span>
                <h2 className="text-3xl font-semibold text-[#FAFAFA] tracking-tight">
                  {service.title}
                </h2>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {service.description}
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-md bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-xs font-medium text-[#FAFAFA]"
                  >
                    <span>Inquire About {service.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A3E635]" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Capabilities & Stack */}
              <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-[#27272A] lg:pl-8">
                <div className="space-y-3">
                  <h3 className="text-xs font-mono text-[#FAFAFA] uppercase tracking-wider">
                    Core Capabilities
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start space-x-2 text-xs text-[#A1A1AA]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#27272A]/80 space-y-2">
                  <h3 className="text-[11px] font-mono text-[#71717A] uppercase">
                    Primary Technologies & Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.techHighlight.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-[#FAFAFA] bg-[#18181B] border border-[#27272A] px-2.5 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <FinalCTA />
      </div>
    </div>
  );
}
