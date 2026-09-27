"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

export function ProjectInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Web Application",
    budgetRange: "$5,000–$10,000",
    timeline: "Within 1 month",
    description: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const projectTypes = [
    "Web Application",
    "SaaS Product",
    "AI Application",
    "Business Automation",
    "API / Backend",
    "MVP",
    "Other",
  ];

  const budgetRanges = [
    "Under $1,000",
    "$1,000–$5,000",
    "$5,000–$10,000",
    "$10,000+",
    "Not sure yet",
  ];

  const timelines = [
    "Immediate (1-2 weeks)",
    "Within 1 month",
    "1–3 months",
    "Flexible",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          data.error || data.message || "Failed to submit project inquiry. Please check inputs."
        );
        return;
      }

      setStatus("success");
    } catch (err: unknown) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Network connection error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="p-8 sm:p-12 rounded-xl bg-[#111113] border border-[#27272A] space-y-6 animate-in fade-in duration-200">
        <div className="w-12 h-12 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/30 flex items-center justify-center text-[#A3E635]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-[#FAFAFA] tracking-tight">
            Thanks — your project details are in.
          </h3>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            Your inquiry has been stored directly in our database. We'll review the request and get back to you promptly.
          </p>
        </div>
        <div className="pt-4 border-t border-[#27272A]">
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setFormData({
                name: "",
                email: "",
                company: "",
                projectType: "Web Application",
                budgetRange: "$5,000–$10,000",
                timeline: "Within 1 month",
                description: "",
              });
            }}
            className="text-xs font-mono text-[#A3E635] hover:underline"
          >
            Submit Another Inquiry →
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="p-4 rounded-lg bg-red-950/50 border border-red-800/60 text-red-200 text-xs flex items-start space-x-3">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-red-300">Form Error:</span>
            <p className="text-red-200/90">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-mono text-[#FAFAFA] uppercase tracking-wider">
            Your Name <span className="text-[#A3E635]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Sarah Jenkins"
            className="w-full px-4 py-3 rounded-md bg-[#09090B] border border-[#27272A] text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635] transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-mono text-[#FAFAFA] uppercase tracking-wider">
            Work Email <span className="text-[#A3E635]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="sarah@company.com"
            className="w-full px-4 py-3 rounded-md bg-[#09090B] border border-[#27272A] text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635] transition-colors"
          />
        </div>
      </div>

      {/* Company */}
      <div className="space-y-1.5">
        <label htmlFor="company" className="block text-xs font-mono text-[#FAFAFA] uppercase tracking-wider">
          Company / Organization <span className="text-[#71717A]">(Optional)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          placeholder="Acme Corp"
          className="w-full px-4 py-3 rounded-md bg-[#09090B] border border-[#27272A] text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635] transition-colors"
        />
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-1.5">
          <label htmlFor="projectType" className="block text-xs font-mono text-[#FAFAFA] uppercase tracking-wider">
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-3 py-3 rounded-md bg-[#09090B] border border-[#27272A] text-sm text-[#FAFAFA] focus:outline-none focus:border-[#A3E635] transition-colors"
          >
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-[#09090B] text-[#FAFAFA]">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="budgetRange" className="block text-xs font-mono text-[#FAFAFA] uppercase tracking-wider">
            Budget Range
          </label>
          <select
            id="budgetRange"
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleChange}
            className="w-full px-3 py-3 rounded-md bg-[#09090B] border border-[#27272A] text-sm text-[#FAFAFA] focus:outline-none focus:border-[#A3E635] transition-colors"
          >
            {budgetRanges.map((range) => (
              <option key={range} value={range} className="bg-[#09090B] text-[#FAFAFA]">
                {range}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="timeline" className="block text-xs font-mono text-[#FAFAFA] uppercase tracking-wider">
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-3 py-3 rounded-md bg-[#09090B] border border-[#27272A] text-sm text-[#FAFAFA] focus:outline-none focus:border-[#A3E635] transition-colors"
          >
            {timelines.map((time) => (
              <option key={time} value={time} className="bg-[#09090B] text-[#FAFAFA]">
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label htmlFor="description" className="block text-xs font-mono text-[#FAFAFA] uppercase tracking-wider">
          Project Description <span className="text-[#A3E635]">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          value={formData.description}
          onChange={handleChange}
          placeholder="Briefly describe what you're looking to build..."
          className="w-full px-4 py-3 rounded-md bg-[#09090B] border border-[#27272A] text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635] transition-colors"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-md bg-[#FAFAFA] text-[#09090B] hover:bg-white text-sm font-medium tracking-wide transition-colors disabled:opacity-50 focus:outline-none"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#09090B]" />
              <span>Sending Inquiry...</span>
            </>
          ) : (
            <>
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4 text-[#09090B]" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
