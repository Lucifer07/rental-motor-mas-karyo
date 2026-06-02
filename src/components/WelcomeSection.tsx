"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface WelcomeSectionProps {
  settings?: { whatsapp_number?: string };
}

export default function WelcomeSection({ settings }: WelcomeSectionProps) {
  const whatsappNumber = settings?.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const waLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Halo%20Mas%20Karyo%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20sewa%20motor.`;

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-bl from-orange-500/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-orange-500/5 to-transparent blur-3xl" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 h-8 w-8 rounded-full border-2 border-orange-500/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 h-8 w-8 border-2 border-orange-500/10"
          style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <div className="inline-flex flex-col items-center gap-3">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400"
            >
              Selamat Datang di Sewa Motor Mas Karyo
            </motion.span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-[3px] w-16 origin-left rounded-full bg-gradient-to-r from-orange-500 to-orange-300"
            />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl"
          >
            <span className="bg-gradient-to-r from-[#1a1a2e] via-orange-600 to-orange-500 bg-clip-text text-transparent">
              Solusi Transportasi Terbaik untuk Anda di Kota Solo!
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-lg leading-relaxed text-gray-500"
          >
            Mas Karyo adalah penyedia layanan sewa motor terpercaya di Solo yang telah melayani
            ribuan pelanggan. Dengan armada terawat, harga bersaing, dan layanan 24 jam, kami
            siap menemani perjalanan Anda di Kota Solo baik untuk keperluan kuliah, wisata,
            maupun aktivitas harian.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >
            <motion.a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-colors hover:bg-orange-600"
            >
              Hubungi Kami
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
