"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { FileText, AlertTriangle } from "lucide-react";

interface Props {
  termsValue: string | null;
  staticTerms: Array<{
    title: string;
    items: string[];
  }>;
}

export default function TermsClient({ termsValue, staticTerms }: Props) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: [45, 0, 45] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FileText className="mx-auto h-14 w-14 text-orange-400" />
            </motion.div>
            <motion.h1
              className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Syarat &{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Ketentuan
              </span>
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Harap baca syarat dan ketentuan berikut sebelum melakukan penyewaan motor.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          {termsValue ? (
            <AnimatedSection>
              <div
                className="prose prose-lg max-w-none prose-headings:text-orange-500 prose-strong:text-orange-500"
                dangerouslySetInnerHTML={{ __html: termsValue }}
              />
            </AnimatedSection>
          ) : (
            <div className="flex flex-col gap-8">
              {staticTerms.map((section, index) => (
                <motion.div
                  key={section.title}
                  className="rounded-xl border-l-4 border-orange-500 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                  <ul className="mt-4 flex flex-col gap-3">
                    {section.items.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-gray-600"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.15 + i * 0.1 }}
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          )}

          <AnimatedSection delay={0.4}>
            <motion.div
              className="mt-12 rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
                >
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                </motion.div>
                <div>
                  <p className="font-semibold text-orange-600">Catatan Penting</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Dengan melakukan penyewaan, Anda dianggap telah membaca dan menyetujui seluruh
                    syarat dan ketentuan yang berlaku. Jika ada pertanyaan, silakan hubungi kami.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
