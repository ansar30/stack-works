import { ProjectInquiryForm } from "@/components/contact/ProjectInquiryForm";
import { Mail, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Start a Project | StackWorks",
  description: "Submit your project requirements to StackWorks. We engineer web applications, SaaS platforms, AI systems, and APIs.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4 border-b border-[#27272A] pb-10">
          <span className="text-xs font-mono text-[#A3E635] uppercase tracking-wider">
            Initiate Engagement
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#FAFAFA] tracking-tight">
            Start a Project.
          </h1>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            Tell us about your product goals, technical requirements, and target timeline. We review all submissions directly and reply with initial technical thoughts.
          </p>
        </div>

        {/* Main Grid: Form on Left, Direct Info on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Inquiry Form */}
          <div className="lg:col-span-8 p-8 sm:p-12 rounded-2xl bg-[#111113] border border-[#27272A]">
            <ProjectInquiryForm />
          </div>

          {/* Right Info & Studio Expectations */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-6 rounded-xl bg-[#111113] border border-[#27272A] space-y-6">
              <h2 className="text-xs font-mono text-[#FAFAFA] uppercase tracking-wider border-b border-[#27272A] pb-3">
                Engagement Process
              </h2>

              <div className="space-y-4 text-xs text-[#A1A1AA]">
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-[#A3E635] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#FAFAFA] block">Rapid Tech Review</span>
                    <p className="text-[#71717A] mt-0.5">
                      We analyze your inquiry for technical feasibility and scope alignment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-[#A3E635] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#FAFAFA] block">Direct Communication</span>
                    <p className="text-[#71717A] mt-0.5">
                      No sales representatives. You speak directly with engineering lead.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-4 h-4 text-[#A3E635] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#FAFAFA] block">Confidentiality</span>
                    <p className="text-[#71717A] mt-0.5">
                      We treat all submitted project details and IP as strictly confidential.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Email Card */}
            <div className="p-6 rounded-xl bg-[#111113] border border-[#27272A] space-y-3">
              <span className="text-xs font-mono text-[#71717A] uppercase">Direct Inquiries</span>
              <p className="text-sm text-[#A1A1AA]">
                Prefer to send an email directly? Reach out anytime at:
              </p>
              <a
                href="mailto:hello@stackworks.dev"
                className="inline-flex items-center space-x-1.5 text-sm font-mono text-[#FAFAFA] hover:text-[#A3E635] transition-colors"
              >
                <span>hello@stackworks.dev</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
