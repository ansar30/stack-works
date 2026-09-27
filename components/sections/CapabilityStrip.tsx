import { siteConfig } from "@/data/site";

export function CapabilityStrip() {
  return (
    <section className="border-b border-[#27272A] bg-[#111113] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 md:gap-8 text-xs font-mono text-[#A1A1AA] tracking-wider uppercase">
          {siteConfig.capabilities.map((cap, idx) => (
            <div key={cap} className="flex items-center space-x-4">
              <span className="hover:text-[#FAFAFA] transition-colors">{cap}</span>
              {idx < siteConfig.capabilities.length - 1 && (
                <span className="text-[#27272A] hidden md:inline">•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
