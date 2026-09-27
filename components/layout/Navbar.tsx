"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled || isOpen
          ? "bg-[#09090B]/95 backdrop-blur-md border-b border-[#27272A] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="group flex items-center space-x-2.5 text-zinc-100 font-medium text-lg tracking-tight focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 rounded-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#A3E635] inline-block group-hover:scale-125 transition-transform" />
            <span className="font-semibold text-[#FAFAFA] text-lg sm:text-xl tracking-tight">
              StackWorks
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors ${
                    isActive
                      ? "text-[#FAFAFA] font-medium"
                      : "text-[#A1A1AA] hover:text-[#FAFAFA]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-md bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-xs font-medium text-[#FAFAFA] tracking-wide transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-400"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#A3E635]" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-[#18181B] focus:outline-none focus:ring-1 focus:ring-zinc-400"
            aria-expanded={isOpen}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bg-[#09090B] border-b border-[#27272A] px-6 py-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
          <div className="flex flex-col space-y-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-medium py-1 transition-colors ${
                  pathname === item.href
                    ? "text-[#FAFAFA]"
                    : "text-[#A1A1AA] hover:text-[#FAFAFA]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#27272A]">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-md bg-[#18181B] border border-[#27272A] text-sm font-medium text-[#FAFAFA]"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 text-[#A3E635]" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
