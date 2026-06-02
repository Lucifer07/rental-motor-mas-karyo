import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { buildSettings } from "@/lib/settings";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export const dynamic = "force-dynamic";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MotorcycleCard from "@/components/MotorcycleCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PricelistHeroClient from "@/components/pricelist/PricelistHeroClient";
import StaggerGrid from "@/components/pricelist/StaggerGrid";

interface PriceRow {
  category: string;
  price12h: number;
  price24h: number;
}

interface MotorcycleRow {
  id: string;
  name: string;
  description: string;
  image: string;
  prices: PriceRow[];
}

export const metadata: Metadata = {
  title: "Pricelist Sewa Motor Wisatawan - Mas Karyo",
  description:
    "Daftar harga sewa motor untuk wisatawan dan umum di Solo. Eksplorasi Solo dengan motor rental terpercaya.",
};

export default async function PricelistWisatawanPage() {
  const [motorcycles, settingsRecords] = await Promise.all([
    prisma.motorcycle.findMany({
      where: { isActive: true },
      include: {
        prices: {
          where: { isActive: true, category: { equals: "wisatawan", mode: "insensitive" } },
        },
      },
      orderBy: { order: "asc" },
    }),
    prisma.setting.findMany(),
  ]);

  const settings = buildSettings(settingsRecords as Array<{ key: string; value: string }>);
  const bikes = (motorcycles as MotorcycleRow[]).filter((m) => m.prices.length > 0);

  return (
    <>
      <Navbar settings={settings} />
      <main className="flex-1 bg-white">
        <PricelistHeroClient
          badge="Pricelist Wisatawan &amp; Umum"
          title="Harga Sewa Motor Wisatawan &amp; Umum"
          description="Eksplorasi Solo dengan nyaman menggunakan motor dari Mas Karyo. Harga transparan tanpa biaya tersembunyi."
        />

        <AnimatedSection direction="up" className="mx-auto max-w-7xl px-4 pb-20 lg:pb-28">
          <StaggerGrid className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {bikes.map((bike) => {
              const priceEntry = bike.prices[0];
              return (
                <MotorcycleCard
                  key={bike.id}
                  name={bike.name}
                  description={bike.description}
                  image={bike.image}
                  price12h={Number(priceEntry.price12h)}
                  price24h={Number(priceEntry.price24h)}
                  category="Wisatawan"
                  settings={settings}
                />
              );
            })}
          </StaggerGrid>

          {bikes.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-12 text-center text-gray-500"
            >
              Belum ada motor tersedia untuk kategori wisatawan.
            </motion.p>
          )}
        </AnimatedSection>
      </main>
      <Footer settings={settings} />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
