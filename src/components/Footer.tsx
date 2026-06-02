import Link from "next/link";
import { MapPin, Phone, Mail, Bike } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const footerNavigation = [
  { label: "Home", href: "/" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
  { label: "Promo", href: "/promo" },
  { label: "Info Wisatawan", href: "/info-wisatawan" },
];

const footerPricelist = [
  { label: "Pricelist Mahasiswa", href: "/pricelist/mahasiswa" },
  { label: "Pricelist Wisatawan", href: "/pricelist/wisatawan" },
  { label: "Sewa Motor Solo", href: "/sewa-motor-dekat-stasiun-balapan" },
];

interface FooterProps {
  settings?: {
    site_name?: string;
    logo_url?: string;
    whatsapp_number?: string;
    email?: string;
    phone?: string;
    address?: string;
    facebook_url?: string;
    instagram_url?: string;
    twitter_url?: string;
    youtube_url?: string;
  };
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const siteName = settings?.site_name || "Mas Karyo";

  const socialLinks = [
    { Icon: FacebookIcon, href: settings?.facebook_url || "#", label: "Facebook" },
    { Icon: InstagramIcon, href: settings?.instagram_url || "#", label: "Instagram" },
    { Icon: TwitterIcon, href: settings?.twitter_url || "#", label: "Twitter" },
    { Icon: YoutubeIcon, href: settings?.youtube_url || "#", label: "Youtube" },
  ];

  const address = settings?.address || "Jl. Stasiun Balapan No. 123, Solo, Jawa Tengah";
  const phone = settings?.phone || "+62 812-3456-7890";
  const email = settings?.email || "info@maskaryo.com";

  return (
    <footer className="relative overflow-hidden bg-background border-t border-white/5">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-neon-pink/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              {settings?.logo_url ? (
                <img
                  src={settings.logo_url}
                  alt={siteName}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-neon-pink/30"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neon-pink/20 ring-2 ring-neon-pink/30">
                  <Bike className="h-5 w-5 text-neon-pink" />
                </div>
              )}
              <div>
                <p className="text-sm font-bold tracking-wider text-white font-accent">
                  {siteName}
                </p>
                <p className="text-[10px] font-medium text-muted uppercase tracking-widest">
                  Rental Motor Solo
                </p>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Penyedia layanan sewa motor terpercaya di Solo. Melayani 24 jam dengan armada terawat dan harga bersaing.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted transition-all duration-300 hover:border-neon-pink/30 hover:bg-neon-pink/10 hover:text-neon-pink"
                >
                  <social.Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-white uppercase font-accent">
              Navigasi
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerNavigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-all duration-200 hover:translate-x-1 hover:text-neon-pink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricelist */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-white uppercase font-accent">
              Pricelist
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerPricelist.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-all duration-200 hover:translate-x-1 hover:text-neon-mint"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-white uppercase font-accent">
              Hubungi Kami
            </h4>
            <ul className="mt-4 flex flex-col gap-3.5">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neon-yellow" />
                <span className="text-sm text-muted">{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-neon-yellow" />
                <a
                  href={`tel:${phone.replace(/\s|-/g, "")}`}
                  className="text-sm text-muted transition-colors hover:text-neon-yellow"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-neon-yellow" />
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-muted transition-colors hover:text-neon-yellow"
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/5">
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent" />
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 lg:flex-row lg:px-8">
          <p className="text-xs text-muted">
            &copy; {currentYear} {siteName}. Semua hak dilindungi.
          </p>
          <p className="text-xs text-muted">
            Sewa Motor Solo Terpercaya
          </p>
        </div>
      </div>
    </footer>
  );
}
