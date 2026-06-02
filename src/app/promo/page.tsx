import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { buildSettings } from "@/lib/settings";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PromoContent from "./PromoContent";

export const metadata: Metadata = {
  title: "Promo Sewa Motor Solo - Mas Karyo",
  description:
    "Cek promo dan diskon terbaru sewa motor di Mas Karyo Solo. Penawaran spesial untuk mahasiswa dan wisatawan.",
};

interface PromoRow {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

export default async function PromoPage() {
  const [promos, settingsRecords] = (await Promise.all([
    prisma.promo.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.setting.findMany(),
  ])) as [PromoRow[], Array<{ key: string; value: string }>];

  const settings = buildSettings(settingsRecords);

  return (
    <>
      <Navbar settings={settings} />
      <main className="flex-1">
        <PromoContent promos={promos} settings={settings} />
      </main>
      <Footer settings={settings} />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
