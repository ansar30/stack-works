import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#09090B] px-4 py-32">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-xs font-mono text-[#A3E635]">
          <span>404 · PAGE NOT FOUND</span>
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-[#FAFAFA] tracking-tight">
            This page doesn't exist.
          </h1>
          <p className="text-sm text-[#A1A1AA]">
            Let's get you back to something useful.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-md bg-[#FAFAFA] text-[#09090B] hover:bg-white text-xs font-medium tracking-wide transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#09090B]" />
            <span>Back Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
