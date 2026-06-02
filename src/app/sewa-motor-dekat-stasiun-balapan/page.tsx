import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { buildSettings } from "@/lib/settings";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BalapanContent from "./BalapanContent";

export const metadata: Metadata = {
  title: "Sewa Motor Dekat Stasiun Balapan Solo - Mas Karyo",
  description:
    "Sewa motor murah dekat Stasiun Balapan Solo. Lokasi strategis, armada terawat, harga terjangkau. Mas Karyo - rental motor terpercaya.",
  keywords: [
    "sewa motor dekat stasiun balapan",
    "rental motor stasiun balapan",
    "sewa motor solo",
    "sewa motor murah solo",
  ],
};

interface PriceRow {
  category: string;
  price12h: number;
  price24h: number;
}

interface MotorcycleRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  prices: PriceRow[];
}

export default async function SewaMotorStasiunBalapanPage() {
  const [motorcyclesRaw, settingsRecords] = await Promise.all([
    prisma.motorcycle.findMany({
      where: { isActive: true },
      include: { prices: { where: { isActive: true } } },
      orderBy: { order: "asc" },
    }),
    prisma.setting.findMany(),
  ]);

  const settings = buildSettings(
    settingsRecords as Array<{ key: string; value: string }>
  );

  const motorcycles = motorcyclesRaw as MotorcycleRow[];

  const serializedBikes: MotorcycleRow[] = motorcycles.map((bike) => ({
    ...bike,
    prices: bike.prices.map((p) => ({
      category: p.category,
      price12h: Number(p.price12h),
      price24h: Number(p.price24h),
    })),
  }));

  return (
    <>
      <Navbar settings={settings} />
      <main className="flex-1">
        <BalapanContent
          serializedBikes={serializedBikes}
          settings={settings}
        />
      </main>
      <Footer settings={settings} />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
