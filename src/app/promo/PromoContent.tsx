"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Tag } from "lucide-react";
import type { SiteSettings } from "@/lib/settings";

interface PromoRow {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

const sparkles = [
  { emoji: "✨", x: "10%", y: "20%", delay: 0 },
  { emoji: "⭐", x: "80%", y: "15%", delay: 0.8 },
  { emoji: "🌟", x: "85%", y: "65%", delay: 1.6 },
  { emoji: "💫", x: "12%", y: "70%", delay: 2.4 },
  { emoji: "✨", x: "50%", y: "8%", delay: 3.2 },
];

export default function PromoContent({
  promos,
  settings,
}: {
  promos: PromoRow[];
  settings: SiteSettings;
}) {
  const waNumber =
    settings?.whatsapp_number ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "";

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#16213e] py-20 lg:py-28">
        {sparkles.map((s, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl"
            style={{ left: s.x, top: s.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              y: [0, -30, -60, -100],
            }}
            transition={{
              duration: 5,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            {s.emoji}
          </motion.span>
        ))}
        <AnimatedSection className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-block rounded-full bg-orange-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30"
            >
              Promo Spesial ✨
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Hemat Bareng{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Mas Karyo!
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-lg text-gray-300"
            >
              Jangan lewatkan penawaran spesial dari Mas Karyo. Hemat lebih banyak
              dengan promo kami!
            </motion.p>
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {promos.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {promos.map((promo, index) => (
                <AnimatedSection key={promo.id} delay={index * 0.1}>
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 to-orange-500" />
                    {promo.image ? (
                      <div className="relative h-48 w-full overflow-hidden">
                        <img
                          src={promo.image}
                          alt={promo.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-3 left-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                          PROMO
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                        <Tag className="h-12 w-12 text-white/40" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-orange-500">
                        {promo.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {promo.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-md text-center">
              <Tag className="mx-auto h-16 w-16 text-gray-300" />
              <p className="mt-4 text-lg text-gray-500">
                Saat ini belum ada promo yang tersedia. Nantikan penawaran menarik
                dari kami!
              </p>
            </div>
          )}

          <AnimatedSection delay={0.3}>
            <div className="mx-auto mt-16 max-w-xl text-center">
              <p className="text-lg text-gray-600">
                Ada yang ditanyain? Yuk langsung chat aja! 🚀
              </p>
              <motion.a
                href={`https://api.whatsapp.com/send?phone=${waNumber}&text=Halo%20Mas%20Karyo%2C%20saya%20mau%20tanya%20soal%20promo!`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:from-orange-600 hover:to-orange-700"
              >
                Hubungi Kami 🚀
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
