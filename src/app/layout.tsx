import type { Metadata } from "next";
import { Syne, DM_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mas Karyo - Sewa Motor Solo",
  description:
    "Sewa motor terpercaya di Solo dengan harga terjangkau. Armada terawat, pelayanan 24 jam. Melayani mahasiswa dan wisatawan.",
  keywords: [
    "sewa motor solo",
    "rental motor solo",
    "sewa motor murah solo",
    "sewa motor dekat stasiun balapan",
    "mas karyo",
  ],
  openGraph: {
    title: "Mas Karyo - Sewa Motor Solo",
    description:
      "Sewa motor terpercaya di Solo dengan harga terjangkau. Armada terawat, pelayanan 24 jam.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${syne.variable} ${dmSans.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
