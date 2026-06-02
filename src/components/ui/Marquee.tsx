"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  text: string;
  speed?: number;
}

export default function Marquee({ text, speed = 20 }: MarqueeProps) {
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-white/[0.02] py-3">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="flex items-center gap-4 px-4 text-sm font-bold uppercase tracking-widest text-white/50 font-accent"
          >
            {text}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/20" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
