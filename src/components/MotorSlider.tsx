"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

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

interface MotorSliderProps {
  motorcycles: Motorcycle[];
  settings?: { whatsapp_number?: string };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID").format(price);
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-out",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
}

export default function MotorSlider({ motorcycles, settings }: MotorSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      skipSnaps: false,
      dragFree: true,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (!motorcycles.length) return null;

  const whatsappNumber = settings?.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

  return (
    <section id="motor" className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-96 w-96 bg-neon-mint/5 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 bg-neon-pink/5 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedSection className="flex items-end justify-between">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-white/60 uppercase font-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
              Pilihan Motor
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl font-display">
              Pilih Motor Favoritmu
            </h2>
            <p className="mt-3 max-w-lg text-muted">
              Dari skuter harian sampai sport touring, semua siap menemani perjalananmu.
            </p>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={scrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neon-pink/30 bg-neon-pink/10 text-neon-pink transition-all hover:bg-neon-pink/20 hover:border-neon-pink/50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neon-pink/30 bg-neon-pink/10 text-neon-pink transition-all hover:bg-neon-pink/20 hover:border-neon-pink/50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </AnimatedSection>

        <div className="mt-12 -mx-4">
          <div className="overflow-hidden pl-4" ref={emblaRef}>
            <div className="flex gap-6">
              {motorcycles.map((motor, index) => {
                const primaryPrice = motor.prices[0];
                return (
                  <div
                    key={motor.id}
                    className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[45%] lg:basis-[30%] xl:basis-[25%]"
                  >
                    <TiltCard className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all duration-500 hover:border-neon-pink/30">
                      {/* Image */}
                      <div className="relative h-52 w-full overflow-hidden">
                        {motor.image ? (
                          <img
                            src={motor.image}
                            alt={motor.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <img
                            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80"
                            alt={motor.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

                        {/* Category badge */}
                        {primaryPrice && (
                          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-neon-yellow/30 bg-neon-yellow/10 px-3 py-1 backdrop-blur-sm">
                            <span className="text-[10px] font-bold tracking-wider text-neon-yellow uppercase font-accent">
                              {primaryPrice.category}
                            </span>
                          </div>
                        )}

                        {/* Rating badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
                          <Star className="h-3 w-3 fill-neon-yellow text-neon-yellow" />
                          <span className="text-[11px] font-bold text-white font-accent">4.9</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-white font-display">{motor.name}</h3>
                        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
                          {motor.description}
                        </p>

                        {/* Price */}
                        {primaryPrice && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-neon-mint/20 bg-neon-mint/5 px-3 py-1.5">
                              <span className="text-[10px] font-bold tracking-wider text-neon-mint uppercase font-accent">
                                12 Jam
                              </span>
                              <span className="text-sm font-bold text-white font-accent">
                                Rp{formatPrice(primaryPrice.price12h)}
                              </span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-neon-pink/20 bg-neon-pink/5 px-3 py-1.5">
                              <span className="text-[10px] font-bold tracking-wider text-neon-pink uppercase font-accent">
                                24 Jam
                              </span>
                              <span className="text-sm font-bold text-white font-accent">
                                Rp{formatPrice(primaryPrice.price24h)}
                              </span>
                            </span>
                          </div>
                        )}

                        {/* Book button */}
                        <a
                          href={`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Halo%20Mas%20Karyo%2C%20saya%20ingin%20memesan%20${encodeURIComponent(motor.name)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-neon-pink/10 border border-neon-pink/30 py-3 text-sm font-bold text-neon-pink uppercase tracking-wider transition-all duration-300 hover:bg-neon-pink/20 font-accent"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Booking Sekarang
                        </a>
                      </div>
                    </TiltCard>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
