"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { MapPin, Phone, Mail, Clock, Shield, Heart } from "lucide-react";

interface Props {
  companyName: string;
  companyDescription: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyOperatingHours: string;
}

const floatingEmojis = ["🏍️", "✨", "🔥", "💪", "🏆", "⭐"];

const highlights = [
  {
    icon: Shield,
    title: "Terpercaya",
    description: "Telah melayani ribuan pelanggan dengan reputasi terbaik di Solo.",
  },
  {
    icon: Clock,
    title: "Layanan 24 Jam",
    description: "Kami siap melayani Anda kapan saja, termasuk hari libur dan akhir pekan.",
  },
  {
    icon: Heart,
    title: "Armada Terawat",
    description: "Semua motor kami dirawat secara berkala untuk kenyamanan dan keamanan Anda.",
  },
];

const cardAccents = [
  { border: "border-l-orange-500", bg: "bg-orange-50/50" },
  { border: "border-l-blue-500", bg: "bg-blue-50/50" },
  { border: "border-l-emerald-500", bg: "bg-emerald-50/50" },
];

export default function AboutClient({
  companyName,
  companyDescription,
  companyAddress,
  companyPhone,
  companyEmail,
  companyOperatingHours,
}: Props) {
  const contactItems = [
    { icon: MapPin, label: "Alamat", value: companyAddress },
    { icon: Phone, label: "Telepon", value: companyPhone },
    { icon: Mail, label: "Email", value: companyEmail },
    { icon: Clock, label: "Jam Operasional", value: companyOperatingHours },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          {floatingEmojis.map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute select-none text-4xl opacity-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.25, 0.15],
                scale: [0, 1.2, 0.8, 1],
                y: [0, -30, 0],
                x: [0, i % 2 === 0 ? 20 : -20, 0],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
              style={{
                top: `${12 + i * 13}%`,
                left: `${8 + i * 14}%`,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <motion.span
              className="inline-block rounded-full bg-orange-500/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-orange-400 backdrop-blur-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              ✦ Tentang Kami
            </motion.span>
            <motion.h1
              className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Kenali{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                {companyName}
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg leading-relaxed text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {companyDescription}
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <h2 className="text-3xl font-extrabold">
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Mengapa Memilih
                </span>{" "}
                <span className="text-gray-900">{companyName}?</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Kami berkomitmen memberikan layanan sewa motor terbaik di Solo dengan harga
                terjangkau, armada berkualitas, dan pelayanan ramah.
              </p>
              <div className="mt-8 flex flex-col gap-5">
                {highlights.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className={`flex items-start gap-4 rounded-xl border-l-4 ${cardAccents[i].border} ${cardAccents[i].bg} p-5 transition-shadow hover:shadow-lg`}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <item.icon className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    Informasi Kontak
                  </span>
                </h3>
                <div className="mt-6 flex flex-col gap-5">
                  {contactItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.15 }}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100">
                        <item.icon className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-orange-500">{item.label}</p>
                        <p className="mt-0.5 text-sm text-gray-600">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
