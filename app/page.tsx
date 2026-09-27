import { Hero } from "@/components/sections/Hero";
import { CapabilityStrip } from "@/components/sections/CapabilityStrip";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { InteractiveWorkflowPlayground } from "@/components/sections/InteractiveWorkflowPlayground";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ComparisonMatrix } from "@/components/sections/ComparisonMatrix";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { TechSection } from "@/components/sections/TechSection";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <FeaturedWork />
      <InteractiveWorkflowPlayground />
      <ServicesSection />
      <ProcessSection />
      <ComparisonMatrix />
      <PrinciplesSection />
      <TechSection />
      <AboutPreview />
      <FinalCTA />
    </>
  );
}
