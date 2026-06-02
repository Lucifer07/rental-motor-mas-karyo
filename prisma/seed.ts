import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@maskaryo.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@maskaryo.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  const advantages = [
    { title: "Buka 24 Jam", description: "Butuh motor kapan saja? Kami siap melayani Anda tanpa batas waktu.", icon: "clock", order: 1 },
    { title: "Admin Super Fast Response", description: "Tim kami selalu tanggap dan ramah untuk membantu kebutuhan Anda.", icon: "headphones", order: 2 },
    { title: "Proses Mudah & Cepat", description: "Pesan motor tanpa ribet, cukup hubungi kami, dan motor siap digunakan.", icon: "zap", order: 3 },
  ];

  for (const adv of advantages) {
    await prisma.advantage.upsert({
      where: { id: `adv-${adv.order}` },
      update: adv,
      create: { id: `adv-${adv.order}`, ...adv },
    });
  }

  const motorcycles = [
    { name: "Honda BeAT New", slug: "honda-beat-new", description: "Motor matic ringan dan irit bahan bakar, ideal untuk kebutuhan sehari-hari dengan desain modern dan praktis.", category: "matic", order: 1 },
    { name: "Honda BeAT Street", slug: "honda-beat-street", description: "Varian sporty dari Honda BeAT dengan handlebar naked yang trendi, cocok untuk pengendara muda.", category: "matic", order: 2 },
    { name: "Yamaha Fazzio", slug: "yamaha-fazzio", description: "Tampil trendi dengan Yamaha Fazzio. Motor hybrid yang irit BBM, nyaman, dan cocok untuk jalan-jalan di Solo.", category: "matic", order: 3 },
    { name: "Honda Scoopy", slug: "honda-scoopy", description: "Skuter matic klasik dengan sentuhan modern, hemat bahan bakar, dan desain stylish untuk kebutuhan harian.", category: "matic", order: 4 },
    { name: "Honda Scoopy New", slug: "honda-scoopy-new", description: "Desain ikonik dengan sentuhan lebih fresh, fitur canggih, dan mesin irit BBM.", category: "matic", order: 5 },
    { name: "Honda Vario 125", slug: "honda-vario-125", description: "Motor matic stylish dengan mesin 125cc yang tangguh, irit bahan bakar, dan dilengkapi fitur modern.", category: "matic", order: 6 },
    { name: "Honda Vario 160", slug: "honda-vario-160", description: "Motor matic sporty dengan mesin 160cc yang powerful dan teknologi modern untuk performa optimal.", category: "sport", order: 7 },
    { name: "Yamaha NMax V2", slug: "yamaha-nmax-v2", description: "Versi sebelumnya dari NMax dengan desain elegan dan fitur andal, tetap menjadi pilihan bagi pencinta kenyamanan.", category: "sport", order: 8 },
    { name: "Honda PCX 160", slug: "honda-pcx-160", description: "Dengan desain premium, mesin 160cc yang bertenaga, Honda PCX 160 siap menemani perjalanan Anda di Solo.", category: "sport", order: 9 },
    { name: "Yamaha NMax V3", slug: "yamaha-nmax-v3", description: "Skuter premium generasi terbaru, menawarkan kenyamanan maksimal, fitur canggih, dan performa bertenaga.", category: "premium", order: 10 },
    { name: "Honda New PCX 160", slug: "honda-new-pcx-160", description: "Desain lebih gagah, fitur lebih canggih, dan mesin 160cc yang makin bertenaga.", category: "premium", order: 11 },
    { name: "Vespa Sprint S", slug: "vespa-sprint-s", description: "Vespa Sprint S hadir dengan desain sporty dan teknologi modern. Cocok untuk liburan atau gaya harian anda.", category: "premium", order: 12 },
  ];

  const mahasiswaPrices: Record<string, [number, number]> = {
    "honda-beat-new": [65000, 80000],
    "honda-beat-street": [65000, 80000],
    "yamaha-fazzio": [75000, 95000],
    "honda-scoopy": [75000, 95000],
    "honda-scoopy-new": [85000, 105000],
    "honda-vario-125": [85000, 105000],
    "honda-vario-160": [95000, 125000],
    "yamaha-nmax-v2": [110000, 140000],
    "honda-pcx-160": [110000, 140000],
    "yamaha-nmax-v3": [130000, 155000],
    "honda-new-pcx-160": [130000, 155000],
    "vespa-sprint-s": [170000, 220000],
  };

  const wisatawanPrices: Record<string, [number, number]> = {
    "honda-beat-new": [70000, 85000],
    "honda-beat-street": [70000, 85000],
    "yamaha-fazzio": [80000, 100000],
    "honda-scoopy": [80000, 100000],
    "honda-scoopy-new": [90000, 110000],
    "honda-vario-125": [90000, 110000],
    "honda-vario-160": [100000, 130000],
    "yamaha-nmax-v2": [120000, 150000],
    "honda-pcx-160": [120000, 150000],
    "yamaha-nmax-v3": [135000, 160000],
    "honda-new-pcx-160": [135000, 160000],
    "vespa-sprint-s": [175000, 225000],
  };

  for (const moto of motorcycles) {
    const motorcycle = await prisma.motorcycle.upsert({
      where: { slug: moto.slug },
      update: moto,
      create: {
        ...moto,
        image: `/images/rental/${moto.slug}.png`,
      },
    });

    const mhsPrice = mahasiswaPrices[moto.slug];
    if (mhsPrice) {
      await prisma.price.upsert({
        where: { motorcycleId_category: { motorcycleId: motorcycle.id, category: "mahasiswa" } },
        update: { price12h: mhsPrice[0], price24h: mhsPrice[1] },
        create: { motorcycleId: motorcycle.id, category: "mahasiswa", price12h: mhsPrice[0], price24h: mhsPrice[1] },
      });
    }

    const wisPrice = wisatawanPrices[moto.slug];
    if (wisPrice) {
      await prisma.price.upsert({
        where: { motorcycleId_category: { motorcycleId: motorcycle.id, category: "wisatawan" } },
        update: { price12h: wisPrice[0], price24h: wisPrice[1] },
        create: { motorcycleId: motorcycle.id, category: "wisatawan", price12h: wisPrice[0], price24h: wisPrice[1] },
      });
    }
  }

  const testimonials = [
    { id: "t-1", name: "Alin Awwalin", role: "Customer", avatar: "/images/testimoni/alin.jpg", rating: 5.0, comment: "Unitnya baru dan bagus, pelayanannya cepat dan ramah, kondisi helm masih baru dan harum. Sama sekali tidak menyesal sewa motor di tempat ini.", order: 1 },
    { id: "t-2", name: "Deviana Nadya", role: "Customer", avatar: "/images/testimoni/deviana.jpg", rating: 5.0, comment: "Pelayanannya ramah memudahkan orang pendatang pokoknya ga nyesel samsek rental disini motornya juga masih bagus bagus fasilitas oke harganya juga termasuk murah.", order: 2 },
    { id: "t-3", name: "Herdina Rizki C.", role: "Customer", avatar: "/images/testimoni/herdina.jpg", rating: 5.0, comment: "Sewa motor yg oke di Solo. Motor lumayan baru, helm ga kotor, dapat jas hujan juga. Titik antar & jemput motor bisa request juga.", order: 3 },
    { id: "t-4", name: "Widi Arianto", role: "Customer", avatar: "/images/testimoni/widi.jpg", rating: 5.0, comment: "Udah motor baru, dianterin dan di jemput pula. Rekomendasi sih kalau dinas atau liburan sekitaran solo untuk rental disini.", order: 4 },
    { id: "t-5", name: "Andri Nugie", role: "Customer", avatar: "/images/testimoni/andri.jpg", rating: 5.0, comment: "Mantap, harga terjangkau, admin nya fast respon, dan antar jemput kendaraan tepat waktu, recommended!", order: 5 },
    { id: "t-6", name: "Azizah A H", role: "Customer", avatar: "/images/testimoni/azizah.jpg", rating: 5.0, comment: "Puas bgt sama pelayanan, harga, motor, waktu. Semuanya alhamdulillah best. Admin dan kurirnya ramah dan sabar bgt.", order: 6 },
    { id: "t-7", name: "Nindia Setyaningrum", role: "Customer", avatar: "/images/testimoni/nindia.jpg", rating: 5.0, comment: "Admin super ramah, waktu antar jemput flexible banget, cocok buat yg lagi mau wisata ke solo.", order: 7 },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: t,
      create: t,
    });
  }

  const faqs = [
    { id: "faq-1", question: "Bagaimana jika terjadi kerusakan atau kecelakaan selama masa sewa?", answer: "Jika terjadi kerusakan atau kecelakaan, segera hubungi tim kami. Kami akan membantu menyelesaikan masalah sesuai dengan syarat dan ketentuan yang berlaku.", order: 1 },
    { id: "faq-2", question: "Apakah bisa menyewa motor untuk jangka waktu lebih dari satu bulan?", answer: "Tentu saja! Kami menyediakan layanan penyewaan jangka panjang dengan harga spesial untuk kebutuhan Anda. Hubungi kami untuk informasi lebih lanjut.", order: 2 },
    { id: "faq-3", question: "Apa fasilitas yang didapat saat menyewa motor?", answer: "Setiap penyewaan motor sudah termasuk 2 helm SNI dan 2 jas hujan gratis untuk kenyamanan berkendara Anda.", order: 3 },
    { id: "faq-4", question: "Apakah motor bisa diantar ke lokasi penyewa?", answer: "Ya, kami menyediakan layanan antar-jemput motor langsung ke lokasi Anda, sehingga Anda tidak perlu repot datang ke tempat kami.", order: 4 },
    { id: "faq-5", question: "Apa saja syarat untuk menyewa motor di Mas Karyo?", answer: "Anda hanya perlu menyiapkan identitas asli, seperti E-KTP, SIM, atau kartu mahasiswa, sesuai dengan opsi jaminan yang tersedia.", order: 5 },
  ];

  for (const faq of faqs) {
    await prisma.faq.upsert({
      where: { id: faq.id },
      update: faq,
      create: faq,
    });
  }

  const clients = [
    { id: "cl-1", name: "UNS - Universitas Sebelas Maret", logo: "/images/client/uns.png", order: 1 },
    { id: "cl-2", name: "STIE Surakarta", logo: "/images/client/stie.png", order: 2 },
    { id: "cl-3", name: "Universitas Duta Bangsa", logo: "/images/client/udb.png", order: 3 },
    { id: "cl-4", name: "UIN Raden Mas Said", logo: "/images/client/uin.png", order: 4 },
    { id: "cl-5", name: "Universitas Aisyiyah", logo: "/images/client/unisa.png", order: 5 },
    { id: "cl-6", name: "UMS Surakarta", logo: "/images/client/ums.png", order: 6 },
    { id: "cl-7", name: "Poltekkes Surakarta", logo: "/images/client/poltekkes.png", order: 7 },
  ];

  for (const c of clients) {
    await prisma.client.upsert({
      where: { id: c.id },
      update: c,
      create: c,
    });
  }

  const settings = [
    { key: "site_name", value: "Mas Karyo" },
    { key: "logo_url", value: "" },
    { key: "site_description", value: "Layanan rental motor terpercaya di Kota Solo yang siap menemani perjalanan Anda." },
    { key: "address", value: "Jl. Nusa Indah VIII, Punggawan, Kec. Banjarsari, Kota Surakarta, Jawa Tengah 57139" },
    { key: "phone", value: "+6282115008181" },
    { key: "email", value: "admin@maskaryo.com" },
    { key: "whatsapp_number", value: "+6282115008181" },
    { key: "facebook_url", value: "https://www.facebook.com/share/1A5wQShWxH/" },
    { key: "instagram_url", value: "https://www.instagram.com/sewamotorsolo.maskaryo" },
    { key: "youtube_url", value: "https://www.youtube.com/" },
    { key: "twitter_url", value: "https://twitter.com/" },
    { key: "hero_title", value: "Pelayanan Ramah, Tarif Terjangkau Bersama Mas Karyo!" },
    { key: "hero_subtitle", value: "Pelayanan Ramah, Tarif Terjangkau" },
    { key: "hero_description", value: "Keliling Solo jadi lebih praktis dengan sewa motor dari Mas Karyo. Lokasi dekat Stasiun Balapan, bisa antar jemput ke hotel atau bandara, unit lengkap dan siap digunakan." },
    { key: "about_description", value: "Kami adalah layanan rental motor terpercaya di Kota Solo yang siap menemani perjalanan Anda. Dengan komitmen untuk memberikan pelayanan terbaik, kami menyediakan motor dalam kondisi prima, tarif yang terjangkau, serta berbagai fasilitas tambahan seperti helm dan jas hujan gratis." },
    { key: "hero_image", value: "https://images.unsplash.com/photo-1770802675122-baf6cab22839?w=900&q=85" },
    { key: "terms_content", value: "<h3>Syarat & Ketentuan Sewa Motor</h3><p>1. Penyewa wajib menyerahkan identitas asli (E-KTP/SIM/Kartu Mahasiswa).</p><p>2. Deposit sesuai ketentuan yang berlaku.</p><p>3. Motor harus dikembalikan dalam kondisi yang sama saat disewakan.</p><p>4. Denda keterlambatan pengembalian sesuai kesepakatan.</p><p>5. Kerusakan akibat kelalaian penyewa menjadi tanggung jawab penyewa.</p>" },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
