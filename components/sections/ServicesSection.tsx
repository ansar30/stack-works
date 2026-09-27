import { getServices } from "@/data/services";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export async function ServicesSection() {
  const servicesList = await getServices();

  return (
    <section className="py-16 sm:py-24 border-b border-[#27272A] bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
            Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#FAFAFA] tracking-tight">
            What we build.
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            We partner with business owners and founders to engineer digital products, backend architectures, and AI integrations designed for production scale.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {servicesList.map((service, index) => (
            <div
              key={service.id}
              className="p-6 sm:p-8 rounded-xl bg-[#111113] border border-[#27272A] hover:border-[#3F3F46] transition-colors flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#A3E635]">0{index + 1}</span>
                  <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">
                    Core Capability
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#FAFAFA] tracking-tight">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-2 border-t border-[#27272A]/80 space-y-2">
                  <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider block">
                    Deliverables:
                  </span>
                  <ul className="space-y-1.5">
                    {service.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="text-xs text-[#A1A1AA] flex items-center space-x-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635] shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#27272A] flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-mono text-[#71717A] text-[11px] truncate max-w-full">
                  Stack: {service.techHighlight.join(" · ")}
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-1 text-[#FAFAFA] hover:text-[#A3E635] transition-colors shrink-0"
                >
                  <span>Discuss</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
