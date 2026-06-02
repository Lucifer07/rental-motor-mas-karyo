"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Motor Siap Pakai" },
  { value: 10000, suffix: "+", label: "Pelanggan Puas" },
  { value: 24, suffix: "/7", label: "Layanan Nonstop" },
  { value: 5, suffix: " Bintang", label: "Rating Pelanggan" },
];

function CountUp({ value, suffix, isActive }: { value: number; suffix?: string; isActive: boolean }) {
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isActive || hasStarted.current) return;
    hasStarted.current = true;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isActive, value]);

  return (
    <span className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl font-accent">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-surface py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-full w-1/2 bg-gradient-to-r from-neon-pink/5 via-neon-mint/5 to-neon-yellow/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
              className="text-center"
            >
              <CountUp value={stat.value} suffix={stat.suffix} isActive={isInView} />
              <p className="mt-2 text-sm font-medium text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
