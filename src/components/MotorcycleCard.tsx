"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface MotorcycleCardProps {
  name: string;
  description: string;
  image: string;
  price12h: number;
  price24h: number;
  category: string;
  settings?: { whatsapp_number?: string };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID").format(price);
}

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function MotorcycleCard({
  name,
  description,
  image,
  price12h,
  price24h,
  category,
  settings,
}: MotorcycleCardProps) {
  const whatsappNumber = settings?.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const message = `Halo%20Mas%20Karyo%2C%20saya%20ingin%20memesan%20${encodeURIComponent(name)}%20(${encodeURIComponent(category)}).`;
  const waLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;

  return (
    <motion.div variants={cardVariants} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-100 to-gray-200">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#1a1a2e]">
            <span className="text-3xl font-bold text-gray-300">{name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 right-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
          {category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <span className="rounded-xl border border-orange-200 bg-orange-50 px-3.5 py-2 text-sm">
            <span className="font-bold text-orange-500">Rp {formatPrice(price12h)}</span>{" "}
            <span className="font-medium text-gray-600">/ 12 Jam</span>
          </span>
          <span className="rounded-xl border border-orange-200 bg-orange-50 px-3.5 py-2 text-sm">
            <span className="font-bold text-orange-500">Rp {formatPrice(price24h)}</span>{" "}
            <span className="font-medium text-gray-600">/ 24 Jam</span>
          </span>
        </div>

        <motion.a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-colors hover:bg-orange-600"
        >
          <MessageCircle className="h-4 w-4" />
          Book Sekarang
        </motion.a>
      </div>
    </motion.div>
  );
}
