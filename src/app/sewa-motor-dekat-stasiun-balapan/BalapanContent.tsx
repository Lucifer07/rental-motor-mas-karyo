"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import MotorcycleCard from "@/components/MotorcycleCard";
import {
  MapPin,
  Clock,
  Shield,
  Phone,
  HelpCircle,
} from "lucide-react";
import type { SiteSettings } from "@/lib/settings";

interface PriceRow {
  category: string;
  price12h: number;
  price24h: number;
}

interface MotorcycleRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  prices: PriceRow[];
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID").format(price);
}

const motorcycleEmojis = [
  { emoji: "🏍️", x: "10%", y: "15%", delay: 0 },
  { emoji: "🛵", x: "85%", y: "20%", delay: 1 },
  { emoji: "🏍️", x: "80%", y: "65%", delay: 2 },
  { emoji: "🛵", x: "15%", y: "70%", delay: 0.5 },
  { emoji: "🏁", x: "50%", y: "5%", delay: 1.5 },
];

const features = [
  {
    icon: MapPin,
    title: "Lokasi Strategis",
    description: "Hanya beberapa menit dari Stasiun Balapan Solo.",
    gradient: "from-orange-400 to-orange-500",
  },
  {
    icon: Clock,
    title: "Layanan 24 Jam",
    description: "Ambil dan kembalikan motor kapan saja.",
    gradient: "from-blue-400 to-blue-500",
  },
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    description: "Armada terawat dengan asuransi dasar.",
    gradient: "from-emerald-400 to-emerald-500",
  },
  {
    icon: Phone,
    title: "Respon Cepat",
    description: "Hubungi kami via WhatsApp untuk pemesanan instan.",
    gradient: "from-purple-400 to-purple-500",
  },
];

const faqs = [
  {
    q: "Seberapa dekat lokasi rental dari Stasiun Balapan?",
    a: "Lokasi Mas Karyo hanya sekitar 5-10 menit jalan kaki dari Stasiun Balapan. Kami juga menyediakan layanan antar jemput gratis!",
  },
  {
    q: "Apakah ada persyaratan khusus untuk sewa motor?",
    a: "Cukup bawa KTP asli dan SIM C yang masih berlaku. Untuk mahasiswa, kami juga menyediakan harga spesial dengan menunjukkan kartu mahasiswa.",
  },
  {
    q: "Apakah motor bisa dikembalikan di luar jam operasional?",
    a: "Bisa! Dengan layanan 24 jam kami, Anda bisa mengatur waktu pengambilan dan pengembalian dengan fleksibel.",
  },
  {
    q: "Gimana cara pesan dari Stasiun Balapan?",
    a: "Langsung chat WhatsApp kami, nanti kita siapkan motor dan bisa diantar ke stasiun. Gampang banget!",
  },
];

export default function BalapanContent({
  serializedBikes,
  settings,
}: {
  serializedBikes: MotorcycleRow[];
  settings: SiteSettings;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#16213e] py-20 lg:py-28">
        {motorcycleEmojis.map((s, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl"
            style={{ left: s.x, top: s.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              x: [0, 20, -10, 0],
              y: [0, -20, -40, -60],
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
              transition={{ duration: 0.5 }}
              className="inline-block rounded-full bg-orange-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30"
            >
              Sewa Motor Solo 🏍️
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Sewa Motor Dekat{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Stasiun Balapan
              </span>{" "}
              Solo
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-lg leading-relaxed text-gray-300"
            >
              Butuh sewa motor di dekat Stasiun Balapan Solo? Mas Karyo
              menyediakan armada motor terawat dengan harga terjangkau. Lokasi
              kami sangat mudah dijangkau dari Stasiun Balapan — cocok untuk
              wisatawan, mahasiswa, dan Anda yang membutuhkan transportasi
              praktis di Solo.
            </motion.p>
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="group rounded-2xl bg-white p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div
                    className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-bold text-orange-500">
                Pilihan Motor 🏍️
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                Semua{" "}
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  Motor Tersedia
                </span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {serializedBikes.map((bike) => {
              const mahasiswaPrice = bike.prices.find(
                (p) => p.category.toLowerCase() === "mahasiswa"
              );
              const wisatawanPrice = bike.prices.find(
                (p) => p.category.toLowerCase() === "wisatawan"
              );
              const defaultPrice =
                mahasiswaPrice ?? wisatawanPrice ?? bike.prices[0];
              return (
                <AnimatedSection key={bike.id}>
                  <MotorcycleCard
                    name={bike.name}
                    description={bike.description}
                    image={bike.image}
                    price12h={defaultPrice?.price12h ?? 0}
                    price24h={defaultPrice?.price24h ?? 0}
                    category={defaultPrice?.category ?? "Umum"}
                    settings={settings}
                  />
                </AnimatedSection>
              );
            })}
          </div>

          {serializedBikes.length === 0 && (
            <p className="mt-12 text-center text-gray-500">
              Belum ada motor tersedia saat ini.
            </p>
          )}
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-extrabold text-gray-900">
                Daftar Harga Lengkap{" "}
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  Sewa Motor
                </span>{" "}
                Dekat Stasiun Balapan
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-gray-100 shadow-lg">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e]">
                    <th className="px-6 py-4 font-bold text-white">Motor</th>
                    <th className="px-6 py-4 font-bold text-orange-400">
                      Kategori
                    </th>
                    <th className="px-6 py-4 font-bold text-orange-400">
                      12 Jam
                    </th>
                    <th className="px-6 py-4 font-bold text-orange-400">
                      24 Jam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {serializedBikes.flatMap((bike) =>
                    bike.prices.map((price, pi) => (
                      <motion.tr
                        key={`${bike.id}-${price.category}`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: pi * 0.05 }}
                        className="border-b border-gray-50 transition-colors hover:bg-orange-50"
                      >
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {bike.name}
                        </td>
                        <td className="px-6 py-4 capitalize text-gray-600">
                          {price.category}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          Rp {formatPrice(price.price12h)}
                        </td>
                        <td className="px-6 py-4 font-semibold text-orange-500">
                          Rp {formatPrice(price.price24h)}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          {serializedBikes.length === 0 && (
            <p className="mt-12 text-center text-gray-500">
              Belum ada data harga tersedia.
            </p>
          )}
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-bold text-orange-500">
                Lokasi Kami 📍
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Dekat Stasiun{" "}
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  Balapan
                </span>
              </h2>
              <p className="mt-4 text-gray-500">
                Hanya 5 menit jalan kaki dari Stasiun Balapan. Gampang ditemukan!
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl shadow-lg">
              <div className="flex h-80 w-full items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                <div className="text-center">
                  <MapPin className="mx-auto h-12 w-12 text-orange-400" />
                  <p className="mt-4 text-lg font-bold text-white">
                    Mas Karyo Rental Motor
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    Dekat Stasiun Balapan, Solo
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-bold text-orange-500">
                FAQ ❓
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Pertanyaan{" "}
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  Seputar Lokasi
                </span>
              </h2>
            </div>
          </AnimatedSection>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                    <HelpCircle className="h-5 w-5 text-orange-500" />
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-gray-500">{faq.a}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
