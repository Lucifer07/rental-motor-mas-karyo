import { prisma } from "@/lib/prisma";
import { buildSettings } from "@/lib/settings";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/ui/Marquee";

export const dynamic = "force-dynamic";
import MotorSlider from "@/components/MotorSlider";
import HowItWorks from "@/components/HowItWorks";
import StatsBanner from "@/components/StatsBanner";
import TestimonialSection from "@/components/TestimonialSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

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

interface TestimonialRow {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

interface FaqRow {
  question: string;
  answer: string;
}

interface AdvantageRow {
  title: string;
  description: string;
  icon: string;
}

export default async function Home() {
  const [motorcycles, testimonials, faqs, settingsRecords] = await Promise.all([
    prisma.motorcycle.findMany({
      where: { isActive: true },
      include: { prices: { where: { isActive: true } } },
      orderBy: { order: "asc" },
    }),
    prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.faq.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.setting.findMany(),
  ]);

  const serializedMotorcycles: MotorcycleRow[] = (motorcycles as MotorcycleRow[]).map((m) => ({
    ...m,
    prices: m.prices.map((p) => ({
      ...p,
      price12h: Number(p.price12h),
      price24h: Number(p.price24h),
    })),
  }));

  const serializedTestimonials: TestimonialRow[] = (testimonials as TestimonialRow[]).map((t) => ({
    ...t,
    rating: Number(t.rating),
  }));

  const serializedFaqs: FaqRow[] = (faqs as FaqRow[]).map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  const settings = buildSettings(settingsRecords as Array<{ key: string; value: string }>);

  return (
    <>
      <Navbar settings={settings} />
      <Hero settings={settings} />
      <Marquee text="SEWA MOTOR SEKARANG • BEBAS NGEBUT • EKSPLORASI SEMUA TEMPAT •" speed={25} />
      <MotorSlider motorcycles={serializedMotorcycles} settings={settings} />
      <HowItWorks />
      <StatsBanner />
      <TestimonialSection testimonials={serializedTestimonials} />
      <FAQSection faqs={serializedFaqs} />
      <Footer settings={settings} />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
