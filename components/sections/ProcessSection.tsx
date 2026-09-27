import { processSteps } from "@/data/process";

export function ProcessSection() {
  return (
    <section className="py-16 sm:py-24 border-b border-[#27272A] bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="max-w-xl space-y-3">
          <span className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
            Methodology
          </span>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#FAFAFA] tracking-tight">
            From idea to production.
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA]">
            A disciplined, engineering-led process designed to ship working software predictably.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {processSteps.map((step, idx) => (
            <div
              key={step.number}
              className="relative space-y-4 p-6 rounded-lg bg-[#111113] border border-[#27272A] hover:border-[#3F3F46] transition-colors flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
                  <span className="font-mono text-2xl font-bold text-[#FAFAFA]">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-mono text-[#A3E635] uppercase tracking-wider">
                    Step 0{idx + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#FAFAFA] tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#27272A]/60 space-y-1">
                <span className="text-[10px] font-mono text-[#71717A] uppercase">
                  Key Output:
                </span>
                <p className="text-xs font-mono text-[#A1A1AA] truncate">
                  {step.deliverables[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
