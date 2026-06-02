"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppFloatProps {
  settings?: { whatsapp_number?: string };
}

export default function WhatsAppFloat({ settings }: WhatsAppFloatProps) {
  const whatsappNumber = settings?.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const waLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Halo%20Mas%20Karyo%2C%20saya%20ingin%20bertanya%20tentang%20sewa%20motor.`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      className="fixed right-5 bottom-5 z-50 group"
    >
      <span className="absolute -inset-2 rounded-full bg-green-500 opacity-30 animate-ping" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/30 transition-transform duration-200 hover:scale-110 group-hover:bg-green-600">
        <MessageCircle className="h-7 w-7 text-white" />
      </span>
    </a>
  );
}
