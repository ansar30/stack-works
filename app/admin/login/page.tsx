"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, ArrowRight, Loader2, AlertTriangle } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Authentication failed.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Network error during login attempt.");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-4 py-32">
      <div className="max-w-md w-full p-8 rounded-2xl bg-[#111113] border border-[#27272A] space-y-6 shadow-2xl">
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#18181B] border border-[#27272A] text-[#A3E635] mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-semibold text-[#FAFAFA] tracking-tight">
            StackWorks Admin Login
          </h1>
          <p className="text-xs text-[#A1A1AA]">
            Restricted access management portal. Please sign in with studio credentials.
          </p>
        </div>

        {status === "error" && (
          <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-800/60 text-red-200 text-xs flex items-center space-x-2.5">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-[#FAFAFA] uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-3 rounded-md bg-[#09090B] border border-[#27272A] text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-[#FAFAFA] uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-md bg-[#09090B] border border-[#27272A] text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full inline-flex items-center justify-center space-x-2 py-3.5 rounded-md bg-[#FAFAFA] text-[#09090B] hover:bg-white text-sm font-medium tracking-wide transition-colors focus:outline-none disabled:opacity-50 mt-2"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#09090B]" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin</span>
                <ArrowRight className="w-4 h-4 text-[#09090B]" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#27272A] text-center">
          <p className="text-[11px] font-mono text-[#71717A]">
            StackWorks Studio • Restricted Portal v2.4
          </p>
        </div>
      </div>
    </div>
  );
}
