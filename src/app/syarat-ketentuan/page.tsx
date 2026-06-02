import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { buildSettings } from "@/lib/settings";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan - Mas Karyo Sewa Motor Solo",
  description:
    "Syarat dan ketentuan penyewaan motor di Mas Karyo Solo. Baca sebelum melakukan pemesanan.",
};

const staticTerms = [
  {
    title: "Persyaratan Penyewa",
    items: [
      "Wajib berusia minimal 17 tahun dan memiliki SIM C yang masih berlaku.",
      "Wajib menyerahkan KTP asli (bukan fotokopi) sebagai jaminan.",
      "Untuk mahasiswa: wajib menunjukkan KTM/Kartu Pelajar yang masih berlaku untuk mendapatkan harga khusus.",
      "Penyewa wajib mengisi formulir penyewaan dan menandatangani perjanjian sewa.",
    ],
  },
  {
    title: "Pembayaran",
    items: [
      "Pembayaran dilakukan di awal sebelum motor diserahkan.",
      "Metode pembayaran: tunai atau transfer bank.",
      "Harga yang tertera sudah termasuk asuransi dasar.",
      "Denda keterlambatan pengembalian akan dikenakan biaya tambahan per jam.",
    ],
  },
  {
    title: "Penggunaan Motor",
    items: [
      "Motor hanya boleh digunakan di area Solo dan sekitarnya, kecuali ada perjanjian tertulis.",
      "Dilarang keras memodifikasi, membongkar, atau mengganti bagian motor.",
      "Dilarang menggunakan motor untuk kegiatan illegal atau balap liar.",
      "Penyewa bertanggung jawab penuh atas kerusakan akibat kelalaian.",
    ],
  },
  {
    title: "Pengembalian",
    items: [
      "Motor harus dikembalikan dalam kondisi bersih dan sama seperti saat diserahkan.",
      "Bahan bakar harus dikembalikan dalam kondisi sama seperti saat pengambilan.",
      "Keterlambatan pengembalian lebih dari 1 jam akan dikenakan biaya sewa tambahan.",
      "Jika motor dikembalikan dalam kondisi rusak, penyewa bertanggung jawab atas biaya perbaikan.",
    ],
  },
  {
    title: "Kehilangan atau Kerusakan",
    items: [
      "Jika motor hilang, penyewa wajib mengganti sesuai nilai motor saat ini.",
      "Kerusakan akibat penggunaan normal akan ditanggung oleh Mas Karyo.",
      "Kerusakan akibat kelalaian penyewa menjadi tanggung jawab penyewa sepenuhnya.",
      "Segala klaim harus disertai laporan polisi untuk kehilangan.",
    ],
  },
];

export default async function SyaratKetentuanPage() {
  const settingsRecords = await prisma.setting.findMany();
  const settings = buildSettings(settingsRecords as Array<{ key: string; value: string }>);

  const termsValue = settings.terms_content;

  return (
    <>
      <Navbar settings={settings} />
      <main className="flex-1">
        <TermsClient termsValue={termsValue} staticTerms={staticTerms} />
      </main>
      <Footer settings={settings} />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
