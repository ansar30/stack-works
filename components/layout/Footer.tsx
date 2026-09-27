import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#27272A] bg-[#09090B] text-[#A1A1AA] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#27272A]">
          {/* Brand & Summary */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-[#FAFAFA] font-semibold text-xl tracking-tight">
              <span className="w-2 h-2 rounded-full bg-[#A3E635]" />
              <span>StackWorks</span>
            </Link>
            <p className="text-sm text-[#71717A] max-w-md leading-relaxed font-normal">
              {siteConfig.footer.summary}
            </p>
            <div className="inline-flex items-center space-x-2 text-xs text-[#A1A1AA] pt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3E635] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A3E635]"></span>
              </span>
              <span className="font-mono text-xs text-[#71717A]">Available for Q4 project engineering</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono tracking-wider text-[#FAFAFA] uppercase">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.footer.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#FAFAFA] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono tracking-wider text-[#FAFAFA] uppercase">Connect</h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.footer.socials.map((social) => (
                <li key={social.label}>
                  {social.external ? (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 hover:text-[#FAFAFA] transition-colors"
                    >
                      <span>{social.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#71717A]" />
                    </a>
                  ) : (
                    <a href={social.href} className="hover:text-[#FAFAFA] transition-colors">
                      {social.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Studio Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#71717A] space-y-4 sm:space-y-0">
          <p>{siteConfig.footer.copyright}</p>
          <p className="font-mono text-[11px] text-[#71717A]">
            Digital products, engineered.
          </p>
        </div>
      </div>
    </footer>
  );
}
