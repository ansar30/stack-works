import { principles } from "@/data/principles";

export function PrinciplesSection() {
  return (
    <section className="py-24 border-b border-[#27272A] bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
            Studio Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#FAFAFA] tracking-tight">
            Built for the real world.
          </h2>
          <p className="text-base text-[#A1A1AA]">
            We operate as an extension of your technical leadership—delivering production software without fluff or artificial complexity.
          </p>
        </div>

        {/* Minimal Split Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
          {principles.map((item, idx) => (
            <div key={item.title} className="space-y-3 border-l-2 border-[#27272A] pl-6 hover:border-[#A3E635] transition-colors">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs text-[#71717A]">0{idx + 1}</span>
                <h3 className="text-xl font-semibold text-[#FAFAFA] tracking-tight">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
                {item.subtitle}
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
