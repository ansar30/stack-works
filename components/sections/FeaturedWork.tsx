import Link from "next/link";
import { getProjects } from "@/data/projects";
import { ArrowUpRight, Lock } from "lucide-react";

export async function FeaturedWork() {
  const allProjects = await getProjects();
  const featuredProjects = allProjects.filter((p) => p.featured);

  return (
    <section className="py-16 sm:py-24 border-b border-[#27272A] bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#27272A] pb-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
              Selected Work
            </span>
            <h2 className="text-2xl sm:text-4xl font-semibold text-[#FAFAFA] tracking-tight">
              Products and software systems engineered by StackWorks.
            </h2>
          </div>
          <div>
            <Link
              href="/work"
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-4 h-4 text-[#A3E635]" />
            </Link>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-xl border border-[#27272A] bg-[#111113] hover:border-[#3F3F46] transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 sm:p-8 space-y-5 sm:space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.isConfidential && (
                    <span className="inline-flex items-center space-x-1 text-[10px] sm:text-[11px] font-mono text-[#71717A] bg-[#18181B] px-2.5 py-1 rounded border border-[#27272A]">
                      <Lock className="w-3 h-3 text-amber-500/80 shrink-0" />
                      <span>Confidential Specs</span>
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#FAFAFA] tracking-tight group-hover:text-white transition-colors">
                    <Link href={`/work/${project.slug}`} className="focus:outline-none">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-normal">
                    {project.summary}
                  </p>
                </div>

                {project.confidentialityNote && (
                  <p className="text-xs text-[#71717A] italic border-l border-[#27272A] pl-3 py-0.5 font-mono">
                    {project.confidentialityNote}
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] sm:text-xs font-mono text-[#A1A1AA] bg-[#18181B] border border-[#27272A] px-2.5 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-6 sm:px-8 py-4 bg-[#18181B]/50 border-t border-[#27272A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-medium text-[#FAFAFA]">
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center space-x-1.5 group-hover:text-[#A3E635] transition-colors"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
                <span className="font-mono text-[#71717A] text-[11px] truncate max-w-full">
                  {project.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
