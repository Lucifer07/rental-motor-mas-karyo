"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  const [emblaRef] = useEmblaCarousel(
    { align: "start", loop: true, skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  if (!testimonials.length) return null;

  return (
    <section id="testimoni" className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 right-0 h-72 w-72 -translate-y-1/2 rounded-full bg-neon-pink/5 blur-[120px]" />
        <div className="absolute top-1/2 left-0 h-72 w-72 -translate-y-1/2 rounded-full bg-neon-mint/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-neon-pink uppercase font-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-pink" />
            Testimoni
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl font-display">
            Kata{" "}
            <span className="bg-gradient-to-r from-neon-pink to-neon-yellow bg-clip-text text-transparent">
              Mereka
            </span>
          </h2>
        </AnimatedSection>

        <div className="mt-12 -mx-4">
          <div className="overflow-hidden pl-4" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="min-w-0 shrink-0 grow-0 basis-[90%] sm:basis-[50%] lg:basis-[33%]"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group h-full rounded-2xl border border-white/5 bg-surface p-6 transition-all duration-500 hover:border-neon-pink/20 hover:shadow-lg hover:shadow-neon-pink/5"
                  >
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={`h-4 w-4 ${
                            s < t.rating
                              ? "fill-neon-yellow text-neon-yellow"
                              : "fill-white/10 text-white/10"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      &ldquo;{t.comment}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="mt-6 flex items-center gap-3">
                      {t.avatar ? (
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-neon-mint/30"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neon-pink/20 text-sm font-bold text-neon-pink font-accent">
                          {t.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-muted">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
