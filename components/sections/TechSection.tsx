import { techStack } from "@/data/technologies";

export function TechSection() {
  return (
    <section className="py-16 sm:py-20 border-b border-[#27272A] bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#27272A] pb-6">
          <div className="space-y-1 max-w-xl">
            <span className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
              Engineering Stack
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#FAFAFA] tracking-tight">
              Built with modern technology.
            </h2>
          </div>
          <p className="text-xs font-mono text-[#71717A] max-w-xs">
            Chosen for performance, type-safety, and cloud maintainability.
          </p>
        </div>

        {/* Grouped Minimal Tech Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {techStack.map((group) => (
            <div key={group.category} className="space-y-3">
              <h3 className="text-xs font-mono text-[#FAFAFA] uppercase tracking-wider border-b border-[#27272A] pb-2 truncate">
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-xs font-mono text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#A3E635] shrink-0" />
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
