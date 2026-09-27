import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ArrowRight } from "lucide-react";
import { ProductDashboardVisual } from "./ProductDashboardVisual";

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-[#27272A] bg-[#09090B] overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column — Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-xs font-mono text-[#A1A1AA] tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
              <span>{siteConfig.hero.eyebrow}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#FAFAFA] leading-[1.15] sm:leading-[1.1]">
              We build digital products that move businesses forward.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#A1A1AA] max-w-xl leading-relaxed font-normal">
              {siteConfig.hero.description}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href={siteConfig.hero.primaryCta.href}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-md bg-[#FAFAFA] text-[#09090B] hover:bg-white text-sm font-medium tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span>{siteConfig.hero.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={siteConfig.hero.secondaryCta.href}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-md bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-sm font-medium text-[#FAFAFA] tracking-wide transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                <span>{siteConfig.hero.secondaryCta.label}</span>
              </Link>
            </div>
          </div>

          {/* Right Column — Proprietary Product Workspace Visualization */}
          <div className="lg:col-span-6 w-full min-w-0">
            <ProductDashboardVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
