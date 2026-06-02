"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs.length) return null;

  return (
    <section id="faq" className="relative overflow-hidden bg-surface py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/3 h-72 w-72 rounded-full bg-neon-yellow/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 lg:px-8">
        <AnimatedSection className="text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-neon-pink uppercase font-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-pink" />
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl font-display">
            Ada{" "}
            <span className="bg-gradient-to-r from-neon-pink to-neon-yellow bg-clip-text text-transparent">
              Pertanyaan?
            </span>
          </h2>
        </AnimatedSection>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className={`group overflow-hidden rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-neon-pink/30 bg-neon-pink/5"
                    : "border-white/5 bg-background hover:border-white/10"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span
                    className={`text-sm font-semibold transition-colors duration-300 ${
                      isOpen ? "text-white" : "text-muted group-hover:text-white"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-colors ${
                        isOpen ? "text-neon-pink" : "text-muted"
                      }`}
                    />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-muted">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
