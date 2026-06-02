"use client";

import { motion } from "framer-motion";

interface Props {
  badge: string;
  title: string;
  description: string;
}

const floatConfigs = [
  { emoji: "🏍️", top: "top-16", left: "left-[8%]", text: "text-5xl lg:text-7xl", dur: 4, delay: 0 },
  { emoji: "💨", top: "top-32", left: "right-[10%]", text: "text-4xl lg:text-6xl", dur: 5, delay: 0.5 },
  { emoji: "🔥", top: "bottom-20", left: "left-[15%]", text: "text-3xl lg:text-5xl", dur: 6, delay: 1 },
  { emoji: "⚡", top: "bottom-28", left: "right-[18%]", text: "text-4xl lg:text-6xl", dur: 4.5, delay: 0.3 },
  { emoji: "✨", top: "top-1/3", left: "left-[5%]", text: "text-2xl lg:text-4xl", dur: 7, delay: 1.5 },
  { emoji: "🌟", top: "top-1/4", left: "right-[5%]", text: "text-3xl lg:text-5xl", dur: 5.5, delay: 0.8 },
];

export default function PricelistHeroClient({ badge, title, description }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] px-4 pb-24 pt-20 lg:pb-32 lg:pt-28">
      {floatConfigs.map((item) => (
        <motion.div
          key={item.emoji}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1, delay: item.delay }}
          className={`pointer-events-none absolute ${item.top} ${item.left}`}
        >
          <motion.span
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: item.dur,
              ease: "easeInOut",
              delay: item.delay,
            }}
            className={`inline-block ${item.text}`}
          >
            {item.emoji}
          </motion.span>
        </motion.div>
      ))}

      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full border border-orange-500/20 lg:h-96 lg:w-96"
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.05, 0.15, 0.05] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full border border-orange-500/10 lg:h-[30rem] lg:w-[30rem]"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.1, 0.03] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/5 lg:h-[40rem] lg:w-[40rem]"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block rounded-full bg-orange-500/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
            {badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          {title}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute -bottom-3 left-1/2 block h-1.5 w-2/3 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400"
            style={{ transformOrigin: "center" }}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-gray-300 lg:text-lg"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
