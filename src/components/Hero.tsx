"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";

const HERO_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1770802675122-baf6cab22839?w=900&q=85";

interface HeroProps {
  settings?: {
    whatsapp_number?: string;
    hero_title?: string;
    hero_subtitle?: string;
    hero_description?: string;
    hero_image?: string;
  };
}

export default function Hero({ settings }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const whatsappNumber =
    settings?.whatsapp_number ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "";
  const waLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Halo%20Mas%20Karyo%2C%20saya%20tertarik%20untuk%20sewa%20motor.`;

  const heroSubtitle =
    settings?.hero_subtitle || "Layanan Prima, Tarif Terjangkau";
  const heroTitle =
    settings?.hero_title || "Nyaman, Cepat, dan Hemat Bersama Mas Karyo Rent!";
  const heroDescription =
    settings?.hero_description ||
    "Sewa motor terpercaya di Solo dengan harga terjangkau. Nikmati perjalanan Anda dengan armada terawat dan pelayanan 24 jam tanpa ribet.";

  const titleWords = heroTitle.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.04, delayChildren: 0.3 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as const },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-background"
      style={{ opacity }}
    >
      {/* Parallax decorative background */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-neon-pink/5 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-neon-mint/5 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 lg:px-8">
        <div className="grid min-h-screen items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text Content */}
          <div className="py-20 text-center lg:py-0 lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5"
            >
              <span className="h-2 w-2 rounded-full bg-white/40 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-white/60 uppercase font-accent">
                {heroSubtitle}
              </span>
            </motion.div>

            {/* Stagger animated title */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl font-display"
            >
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block mr-[0.2em] text-white"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted sm:text-base lg:mx-0"
            >
              {heroDescription}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
            >
              <motion.a
                href="#motor"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-neon-pink px-7 py-3 text-sm font-bold text-white uppercase tracking-wider transition-all duration-300 hover:bg-neon-pink/90 font-accent"
              >
                <span className="absolute inset-0 rounded-full animate-neon-pulse opacity-50 group-hover:opacity-75" />
                <span className="relative z-10 flex items-center gap-2">
                  Lihat Motor
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.a>

              <motion.a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-bold text-white uppercase tracking-wider backdrop-blur-sm transition-all duration-300 hover:bg-white/10 font-accent"
              >
                <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Hubungi Kami
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="mt-10 flex flex-wrap items-center gap-6 text-xs text-muted"
            >
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-mint" />
                Armada Terawat
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-pink" />
                Pelayanan 24 Jam
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-yellow" />
                Harga Bersaing
              </span>
            </motion.div>
          </div>

          {/* Right: Motorcycle Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative hidden h-[80vh] lg:block"
          >
            {/* Image container with decorative frame */}
            <div className="sticky top-24 h-full w-full overflow-hidden rounded-3xl border border-white/5">
              <motion.div
                className="h-full w-full"
                style={{ y: backgroundY }}
              >
                <img
                  src={settings?.hero_image || HERO_IMAGE_FALLBACK}
                  alt="Happy customer - Sewa Motor Mas Karyo"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-background/30 via-transparent to-transparent" />

              {/* Neon accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-pink via-neon-mint to-neon-yellow" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-white/30" />
          </motion.div>
          <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase font-accent">
            Scroll untuk lihat motor
          </span>
        </div>
      </motion.div>
    </motion.section>
  );
}
