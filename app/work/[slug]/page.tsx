import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjects } from "@/data/projects";
import { ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { FinalCTA } from "@/components/sections/FinalCTA";

interface CaseStudyProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 0; // Dynamic route

export async function generateMetadata({ params }: CaseStudyProps) {
  const resolvedParams = await params;
  const projectsList = await getProjects();
  const project = projectsList.find((p) => p.slug === resolvedParams.slug);
  if (!project) return { title: "Project Not Found | StackWorks" };

  return {
    title: `${project.title} — Case Study | StackWorks`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const resolvedParams = await params;
  const projectsList = await getProjects();
  const project = projectsList.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
    return null;
  }

  return (
    <div className="pt-32 pb-20 bg-[#09090B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back navigation */}
        <div>
          <Link
            href="/work"
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Selected Work</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <div className="space-y-6 border-b border-[#27272A] pb-10">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
              {project.category}
            </span>
            {project.isConfidential && (
              <span className="inline-flex items-center space-x-1 text-[11px] font-mono text-[#71717A] bg-[#18181B] px-2.5 py-0.5 rounded border border-[#27272A]">
                <Lock className="w-3 h-3 text-amber-500/80" />
                <span>Confidential Architecture</span>
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-[#FAFAFA] tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#A1A1AA] leading-relaxed font-normal">
            {project.summary}
          </p>

          {project.confidentialityNote && (
            <div className="p-4 rounded-md bg-[#111113] border border-[#27272A] text-xs text-[#71717A] font-mono leading-relaxed">
              <span className="text-[#A1A1AA] font-semibold">Confidentiality Note: </span>
              {project.confidentialityNote}
            </div>
          )}

          {/* Key Tech Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono text-[#FAFAFA] bg-[#18181B] border border-[#27272A] px-3 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Deep Dive Breakdown */}
        <div className="space-y-12">
          {/* Problem Statement */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
              01. The Problem & Challenge
            </h2>
            <p className="text-base text-[#FAFAFA] leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Approach & Strategy */}
          <div className="space-y-3 border-t border-[#27272A] pt-8">
            <h2 className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
              02. Architectural Approach
            </h2>
            <p className="text-base text-[#A1A1AA] leading-relaxed">
              {project.approach}
            </p>
          </div>

          {/* Solution */}
          <div className="space-y-3 border-t border-[#27272A] pt-8">
            <h2 className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
              03. Implemented Solution
            </h2>
            <p className="text-base text-[#A1A1AA] leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Technical Architecture Highlights */}
          <div className="space-y-4 border-t border-[#27272A] pt-8">
            <h2 className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
              04. System Architecture Specs
            </h2>
            <ul className="space-y-3">
              {project.architecture.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-3 text-sm text-[#A1A1AA] bg-[#111113] p-4 rounded-lg border border-[#27272A]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#A3E635] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcome */}
          <div className="p-6 rounded-xl bg-[#111113] border border-[#27272A] space-y-2">
            <span className="text-xs font-mono text-[#71717A] uppercase">Key Outcome Metric</span>
            <p className="text-lg font-semibold text-[#FAFAFA]">{project.outcome}</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <FinalCTA />
      </div>
    </div>
  );
}
