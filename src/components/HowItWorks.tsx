"use client";

import { motion } from "framer-motion";
import { Search, CalendarCheck, Bike } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const steps = [
  {
    icon: Search,
    title: "Pilih Motor",
    description: "Lihat koleksi motor kami dan pilih yang paling cocok dengan gaya dan kebutuhanmu.",
    border: "rgba(255,51,102,0.2)",
    bg: "rgba(255,51,102,0.1)",
    text: "#ff3366",
    glow: "#ff3366",
  },
  {
    icon: CalendarCheck,
    title: "Booking Online",
    description: "Pesan langsung via WhatsApp — cepat, mudah, tanpa ribet. Kami respon dalam hitungan menit.",
    border: "rgba(0,255,170,0.2)",
    bg: "rgba(0,255,170,0.1)",
    text: "#00ffaa",
    glow: "#00ffaa",
  },
  {
    icon: Bike,
    title: "Gas Pol!",
    description: "Ambil motor di lokasi kami atau minta diantar. Siap-siap buat petualangan seru di Solo!",
    border: "rgba(255,215,0,0.2)",
    bg: "rgba(255,215,0,0.1)",
    text: "#ffd700",
    glow: "#ffd700",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const },
  },
};

export default function HowItWorks() {
  return (
    <section id="cara-sewa" className="relative overflow-hidden bg-surface py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-yellow/3 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-neon-yellow uppercase font-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-yellow" />
            Cara Sewa
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl font-display">
            Gas aja,{" "}
            <span className="bg-gradient-to-r from-neon-yellow to-neon-pink bg-clip-text text-transparent">
              3 Langkah Mudah
            </span>
          </h2>
          <p className="mt-3 text-muted">
            Dari scroll sampe gas pol, semua bisa kamu lakukan dalam hitungan menit.
          </p>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={stepVariants}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-background p-8 transition-all duration-500 hover:border-white/10"
            >
              {/* Number */}
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-surface text-lg font-bold text-white font-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="h-[1px] flex-1" style={{ background: `linear-gradient(to right, ${step.text}80, transparent)` }} />
              </div>

              {/* Icon */}
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl border"
                style={{ backgroundColor: step.bg, borderColor: step.border }}
              >
                <step.icon className="h-7 w-7" style={{ color: step.text }} />
              </div>

              {/* Text */}
              <h3 className="mt-6 text-xl font-bold text-white font-display">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{step.description}</p>

              {/* Decorative corner */}
              <div
                className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-20 group-hover:scale-150"
                style={{ backgroundColor: step.glow }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
