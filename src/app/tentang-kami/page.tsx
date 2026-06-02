import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { buildSettings } from "@/lib/settings";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Tentang Kami - Mas Karyo Sewa Motor Solo",
  description:
    "Kenali Mas Karyo, penyedia layanan sewa motor terpercaya di Solo. Armada terawat, pelayanan 24 jam, harga bersaing.",
};

export default async function TentangKamiPage() {
  const settingsRecords = await prisma.setting.findMany();
  const settings = buildSettings(settingsRecords as Array<{ key: string; value: string }>);

  const companyName = settings.site_name;
  const companyDescription = settings.about_description || "Mas Karyo adalah penyedia layanan sewa motor terpercaya di Solo yang telah melayani ribuan pelanggan. Dengan armada terawat, harga bersaing, dan layanan 24 jam, kami siap menemani perjalanan Anda di Kota Solo baik untuk keperluan kuliah, wisata, maupun aktivitas harian.";
  const companyAddress = settings.address || "Jl. Stasiun Balapan No. 123, Solo, Jawa Tengah";
  const companyPhone = settings.phone || "+62 812-3456-7890";
  const companyEmail = settings.email || "info@maskaryo.com";
  const companyOperatingHours = "24 Jam";

  return (
    <>
      <Navbar settings={settings} />
      <main className="flex-1">
        <AboutClient
          companyName={companyName}
          companyDescription={companyDescription}
          companyAddress={companyAddress}
          companyPhone={companyPhone}
          companyEmail={companyEmail}
          companyOperatingHours={companyOperatingHours}
        />
      </main>
      <Footer settings={settings} />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
