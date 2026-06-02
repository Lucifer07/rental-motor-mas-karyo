"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Bike } from "lucide-react";

interface NavbarProps {
  settings?: {
    logo_url?: string;
  };
}

const navLinks = [
  { label: "Beranda", href: "#" },
  { label: "Motor", href: "#motor" },
  { label: "Cara Sewa", href: "#cara-sewa" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [1, 0.85]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.95]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => {
      setIsScrolled(v > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ opacity }}
    >
      <motion.div
        className="absolute inset-0 border-b backdrop-blur-xl"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(10,10,10,${v})`),
          borderColor: isScrolled ? "rgba(255,255,255,0.06)" : "transparent",
        }}
      />

      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          {settings?.logo_url ? (
            <img
              src={settings.logo_url}
              alt="Mas Karyo"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-neon-pink/30"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neon-pink/20 ring-2 ring-neon-pink/30">
              <Bike className="h-5 w-5 text-neon-pink" />
            </div>
          )}
          <span className="text-sm font-bold tracking-wider text-white font-accent">
            Mas Karyo Rent
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm font-medium text-muted transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-neon-pink transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#booking"
          className="hidden rounded-full bg-neon-pink px-5 py-2 text-xs font-bold text-white uppercase tracking-wider transition-all hover:bg-neon-pink/90 sm:inline-flex items-center gap-2 font-accent"
        >
          Booking
        </a>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="overflow-hidden border-t border-white/5 bg-background/95 backdrop-blur-xl md:hidden"
      >
        <div className="space-y-1 px-4 py-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setIsOpen(false)}
            className="mt-4 flex items-center justify-center rounded-full bg-neon-pink px-5 py-3 text-sm font-bold text-white uppercase tracking-wider font-accent"
          >
            Booking
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
