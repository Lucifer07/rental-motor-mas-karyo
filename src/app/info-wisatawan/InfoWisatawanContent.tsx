"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { MapPin } from "lucide-react";

interface TouristInfoRow {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

const floatingEmojis = [
  { emoji: "🗺️", x: "15%", y: "25%", delay: 0 },
  { emoji: "🧭", x: "78%", y: "20%", delay: 1 },
  { emoji: "📍", x: "82%", y: "70%", delay: 2 },
  { emoji: "🏖️", x: "10%", y: "65%", delay: 0.5 },
  { emoji: "🗺️", x: "45%", y: "12%", delay: 1.5 },
];

export default function InfoWisatawanContent({
  touristInfos,
}: {
  touristInfos: TouristInfoRow[];
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#16213e] py-20 lg:py-28">
        {floatingEmojis.map((s, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl"
            style={{ left: s.x, top: s.y }}
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              y: [0, -25, -50, -80],
              rotate: [-20, 0, 10, 0],
            }}
            transition={{
              duration: 6,
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
              transition={{ duration: 0.5 }}
              className="inline-block rounded-full bg-orange-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30"
            >
              Info Wisatawan 🗺️
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Info{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Wisatawan
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-lg text-gray-300"
            >
              Temukan informasi wisata menarik di Solo dan sekitarnya. Jelajahi
              Kota Bengawan dengan motor rental dari Mas Karyo!
            </motion.p>
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {touristInfos.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {touristInfos.map((info, index) => (
                <AnimatedSection key={info.id} delay={index * 0.1}>
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 to-orange-500" />
                    {info.image ? (
                      <div className="relative h-56 w-full overflow-hidden">
                        <img
                          src={info.image}
                          alt={info.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    ) : (
                      <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                        <MapPin className="h-12 w-12 text-white/40" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-orange-500">
                        {info.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-md text-center">
              <MapPin className="mx-auto h-16 w-16 text-gray-300" />
              <p className="mt-4 text-lg text-gray-500">
                Informasi wisata akan segera tersedia. Nantikan update terbaru dari
                kami!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
