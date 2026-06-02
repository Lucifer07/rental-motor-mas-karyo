"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Bike, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLogo } from "@/lib/useLogo";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { logo_url, site_name } = useLogo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/admin";
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      {/* Background decorative blurs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-neon-pink/10 blur-[150px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-neon-mint/10 blur-[150px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent" />

          <div className="p-8 sm:p-10">
            {/* Logo & Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 flex flex-col items-center"
            >
              <div className="relative mb-5">
                {logo_url ? (
                  <img
                    src={logo_url}
                    alt={site_name}
                    className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-pink to-neon-mint shadow-lg shadow-neon-pink/20">
                    <Bike className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
              <h1 className="text-xl font-bold text-white font-display">
                {site_name}
              </h1>
              <p className="mt-1 text-sm text-white/40 font-accent tracking-wider uppercase">
                Admin Dashboard
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 backdrop-blur-sm"
                >
                  {error}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <label className="mb-2 block text-xs font-bold tracking-wider text-white/50 uppercase font-accent">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/20 focus:border-neon-pink/40 focus:bg-white/[0.07] focus:ring-1 focus:ring-neon-pink/30"
                  placeholder="admin@example.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <label className="mb-2 block text-xs font-bold tracking-wider text-white/50 uppercase font-accent">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/20 focus:border-neon-pink/40 focus:bg-white/[0.07] focus:ring-1 focus:ring-neon-pink/30"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-neon-pink to-neon-pink/80 px-4 py-3 text-sm font-bold text-white uppercase tracking-wider transition-all duration-300 hover:from-neon-pink/90 hover:to-neon-pink/70 disabled:opacity-50"
                >
                  <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="absolute inset-0 animate-neon-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </span>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {loading ? "Signing in..." : "Sign In"}
                  </span>
                </button>
              </motion.div>
            </form>
          </div>
        </div>

        {/* Bottom text */}
        <p className="mt-6 text-center text-xs text-white/20 font-accent tracking-wider uppercase">
          Sewa Motor Mas Karyo &mdash; Admin Panel
        </p>
      </motion.div>
    </div>
  );
}
