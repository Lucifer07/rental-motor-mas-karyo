import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { buildSettings } from "@/lib/settings";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import InfoWisatawanContent from "./InfoWisatawanContent";

export const metadata: Metadata = {
  title: "Info Wisatawan Solo - Mas Karyo",
  description:
    "Informasi wisata di Solo untuk wisatawan. Temukan destinasi wisata menarik dan tips perjalanan di Kota Solo.",
};

interface TouristInfoRow {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

export default async function InfoWisatawanPage() {
  const [touristInfos, settingsRecords] = (await Promise.all([
    prisma.touristInfo.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.setting.findMany(),
  ])) as [TouristInfoRow[], Array<{ key: string; value: string }>];

  const settings = buildSettings(settingsRecords);

  return (
    <>
      <Navbar settings={settings} />
      <main className="flex-1">
        <InfoWisatawanContent touristInfos={touristInfos} />
      </main>
      <Footer settings={settings} />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
