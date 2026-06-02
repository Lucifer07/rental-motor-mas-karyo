"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Client {
  name: string;
  logo: string;
}

interface ClientLogosProps {
  clients: Client[];
}

export default function ClientLogos({ clients }: ClientLogosProps) {
  if (!clients.length) return null;

  const duplicated = [...clients, ...clients, ...clients];

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-orange-500">
            Dipercaya Banyak Pelanggan
          </span>
          <h2 className="mt-4 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
            Dipercaya Berbagai Kalangan di Solo
          </h2>
        </AnimatedSection>

        <div className="relative mt-12 overflow-hidden">
          <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

          <motion.div
            className="flex items-center gap-10 lg:gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {duplicated.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex shrink-0 flex-col items-center gap-3"
              >
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-16 w-16 rounded-full object-cover grayscale transition-all duration-500 hover:scale-110 hover:grayscale-0"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-500 transition-all duration-500 hover:scale-110">
                    {client.name.charAt(0)}
                  </div>
                )}
                <span className="text-xs font-medium text-gray-400 transition-colors duration-300 hover:text-orange-500">
                  {client.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
