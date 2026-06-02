"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import MotorcycleCard from "./MotorcycleCard";

interface Motorcycle {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  prices: Array<{
    category: string;
    price12h: number;
    price24h: number;
  }>;
}

interface PricingSectionProps {
  motorcycles: Motorcycle[];
  settings?: { whatsapp_number?: string };
}

type TabKey = "mahasiswa" | "wisatawan";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function PricingSection({ motorcycles, settings }: PricingSectionProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("mahasiswa");

  const whatsappNumber = settings?.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const waLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Halo%20Mas%20Karyo%2C%20saya%20ingin%20bertanya%20tentang%20harga%20sewa%20motor.`;

  const mahasiswaBikes = motorcycles.filter((m) =>
    m.prices.some((p) => p.category.toLowerCase().includes("mahasiswa"))
  );

  const wisatawanBikes = motorcycles.filter((m) =>
    m.prices.some((p) => p.category.toLowerCase().includes("wisatawan"))
  );

  const activeBikes = activeTab === "mahasiswa" ? mahasiswaBikes : wisatawanBikes;
  const categoryFilter = activeTab === "mahasiswa" ? "Mahasiswa" : "Wisatawan";

  const tabs: { key: TabKey; label: string }[] = [
    { key: "mahasiswa", label: "Mahasiswa" },
    { key: "wisatawan", label: "Wisatawan & Umum" },
  ];

  return (
    <section id="layanan" className="bg-gradient-to-b from-gray-50 to-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-gray-900">
            Pricelist Sewa Motor
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-orange-500 sm:text-4xl">
            Pilih Motor Sesuai{" "}
            <span className="text-gray-900">Kebutuhan Anda</span>
          </h2>
        </AnimatedSection>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex gap-2 rounded-full bg-gray-100 p-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`relative rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {activeBikes.map((bike) => {
                const priceEntry = bike.prices.find(
                  (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
                ) ?? bike.prices[0];
                return (
                  <MotorcycleCard
                    key={bike.id}
                    name={bike.name}
                    description={bike.description}
                    image={bike.image}
                    price12h={priceEntry?.price12h ?? 0}
                    price24h={priceEntry?.price24h ?? 0}
                    category={priceEntry?.category ?? categoryFilter}
                    settings={settings}
                  />
                );
              })}
            </motion.div>

            {activeBikes.length === 0 && (
              <p className="mt-12 text-center text-gray-500">
                Belum ada motor tersedia untuk kategori ini.
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatedSection delay={0.2} className="mt-12 text-center">
          <motion.a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-colors hover:bg-orange-600"
          >
            <MessageCircle className="h-4 w-4" />
            Book Sekarang
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  );
}
