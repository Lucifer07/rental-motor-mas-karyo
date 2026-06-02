"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Zap,
  Smile,
  Shield,
  HeadphonesIcon,
  Truck,
  type LucideIcon,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Advantage {
  title: string;
  description: string;
  icon: string;
}

interface WhyChooseUsProps {
  advantages: Advantage[];
}

const iconMap: Record<string, LucideIcon> = {
  clock: Clock,
  zap: Zap,
  smile: Smile,
  shield: Shield,
  headphones: HeadphonesIcon,
  truck: Truck,
};

const cardColors = [
  { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600", ring: "ring-blue-200" },
  { bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-600", ring: "ring-amber-200" },
  { bg: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-600", ring: "ring-emerald-200" },
  { bg: "bg-rose-500", light: "bg-rose-50", text: "text-rose-600", ring: "ring-rose-200" },
  { bg: "bg-violet-500", light: "bg-violet-50", text: "text-violet-600", ring: "ring-violet-200" },
  { bg: "bg-cyan-500", light: "bg-cyan-50", text: "text-cyan-600", ring: "ring-cyan-200" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function WhyChooseUs({ advantages }: WhyChooseUsProps) {
  return (
    <AnimatedSection className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-gray-900 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            Keunggulan Kami
          </span>
          <h2 className="mt-6 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
            Kenapa Harus Memilih Sewa Motor di{" "}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-rose-500 bg-clip-text text-transparent">
              Mas Karyo?
            </span>
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {advantages.map((item, index) => {
            const IconComponent = iconMap[item.icon] ?? Clock;
            const color = cardColors[index % cardColors.length];
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 h-1 w-full" style={{ backgroundColor: color.bg === 'bg-blue-500' ? '#3b82f6' : color.bg === 'bg-amber-500' ? '#f59e0b' : color.bg === 'bg-emerald-500' ? '#10b981' : color.bg === 'bg-rose-500' ? '#f43f5e' : color.bg === 'bg-violet-500' ? '#8b5cf6' : '#06b6d4' }} />

                <div className="absolute top-0 right-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150" style={{ backgroundColor: color.bg === 'bg-blue-500' ? '#3b82f6' : color.bg === 'bg-amber-500' ? '#f59e0b' : color.bg === 'bg-emerald-500' ? '#10b981' : color.bg === 'bg-rose-500' ? '#f43f5e' : color.bg === 'bg-violet-500' ? '#8b5cf6' : '#06b6d4' }} />

                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color.light} ${color.text} ring-1 ${color.ring} transition-all duration-300 group-hover:scale-110`}>
                  <IconComponent className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-500">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
