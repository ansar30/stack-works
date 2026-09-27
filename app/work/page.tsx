import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/data/projects";
import { ArrowUpRight, Lock } from "lucide-react";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Selected Work | StackWorks",
  description: "Explore selected software products, SaaS platforms, and AI systems engineered by StackWorks.",
};

export const revalidate = 0; // Dynamic route

export default async function WorkPage() {
  const projectsList = await getProjects();

  return (
    <div className="pt-32 pb-20 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4 border-b border-[#27272A] pb-10">
          <span className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
            Project Directory
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#FAFAFA] tracking-tight">
            Selected Work & System Case Studies.
          </h1>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            A selection of software platforms, SaaS products, and automated workflows engineered for production environments.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsList.map((project) => (
            <div
              key={project.id}
              className="group rounded-xl border border-[#27272A] bg-[#111113] hover:border-[#3F3F46] transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.isConfidential && (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-mono text-[#71717A] bg-[#18181B] px-2.5 py-1 rounded border border-[#27272A]">
                      <Lock className="w-3 h-3 text-amber-500/80" />
                      <span>Confidential Specs</span>
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-[#FAFAFA] tracking-tight group-hover:text-white transition-colors">
                    <Link href={`/work/${project.slug}`} className="focus:outline-none">
                      {project.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed font-normal">
                    {project.summary}
                  </p>
                </div>

                {project.confidentialityNote && (
                  <p className="text-xs text-[#71717A] italic border-l border-[#27272A] pl-3 py-0.5 font-mono">
                    {project.confidentialityNote}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-[#A1A1AA] bg-[#18181B] border border-[#27272A] px-2.5 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-8 py-4 bg-[#18181B]/50 border-t border-[#27272A] flex items-center justify-between text-xs font-medium text-[#FAFAFA]">
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center space-x-1.5 group-hover:text-[#A3E635] transition-colors"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <span className="font-mono text-[#71717A] text-[11px]">{project.outcome}</span>
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
