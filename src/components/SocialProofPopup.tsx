"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ProofItem {
  name: string;
  city: string;
  motor: string;
  minutesAgo: number;
}

const proofData: ProofItem[] = [
  { name: "Andi S.", city: "Solo", motor: "Honda Vario", minutesAgo: 3 },
  { name: "Rina W.", city: "Yogyakarta", motor: "Yamaha NMAX", minutesAgo: 7 },
  { name: "Budi P.", city: "Semarang", motor: "Honda Beat", minutesAgo: 12 },
  { name: "Sari M.", city: "Surabaya", motor: "Scoopy", minutesAgo: 5 },
  { name: "Dian K.", city: "Jakarta", motor: "Honda PCX", minutesAgo: 9 },
  { name: "Fajar R.", city: "Solo", motor: "Yamaha Aerox", minutesAgo: 2 },
];

const SHOW_DURATION_MS = 5000;
const CYCLE_INTERVAL_MS = 8000;
const INITIAL_DELAY_MS = 3000;

export default function SocialProofPopup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const showNext = useCallback(() => {
    setIsVisible(true);
    const hideTimer = setTimeout(() => setIsVisible(false), SHOW_DURATION_MS);
    return () => clearTimeout(hideTimer);
  }, []);

  useEffect(() => {
    setHasMounted(true);
    const initialTimer = setTimeout(() => {
      showNext();
    }, INITIAL_DELAY_MS);

    const cycleTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % proofData.length);
      showNext();
    }, CYCLE_INTERVAL_MS);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(cycleTimer);
    };
  }, [showNext]);

  if (!hasMounted) return null;

  const proof = proofData[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={currentIndex}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed left-5 bottom-5 z-40 max-w-xs"
        >
          <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/80 p-4 shadow-xl backdrop-blur-xl">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
              {proof.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-orange-500">
                {proof.name} - {proof.city}
              </p>
              <p className="truncate text-xs text-gray-500">
                telah memesan {proof.motor} {proof.minutesAgo} menit yang lalu
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="ml-1 shrink-0 text-gray-400 transition-colors hover:text-gray-600"
              aria-label="Tutup notifikasi"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
