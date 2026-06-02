"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Bike,
  Star,
  HelpCircle,
  Building2,
  Award,
  Tag,
  MapPin,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useLogo } from "@/lib/useLogo";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Motorcycles", icon: Bike, href: "/admin/motorcycles" },
  { label: "Testimonials", icon: Star, href: "/admin/testimonials" },
  { label: "FAQs", icon: HelpCircle, href: "/admin/faqs" },
  { label: "Clients", icon: Building2, href: "/admin/clients" },
  { label: "Advantages", icon: Award, href: "/admin/advantages" },
  { label: "Promos", icon: Tag, href: "/admin/promos" },
  { label: "Tourist Info", icon: MapPin, href: "/admin/tourist-infos" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logo_url, site_name } = useLogo();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  const NavLinks = ({ onItemClick }: { onItemClick?: () => void }) => (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <button
            key={item.href}
            onClick={() => {
              router.push(item.href);
              onItemClick?.();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active
                ? "bg-orange-500 text-white"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#1a1a2e] text-white p-2 rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#1a1a2e] flex flex-col z-50 transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            {logo_url ? (
              <img src={logo_url} alt={site_name} className="h-9 w-9 rounded-full object-cover" />
            ) : (
              <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
                <Bike className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-white font-bold text-sm">{site_name}</h1>
              <p className="text-gray-400 text-xs">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <NavLinks onItemClick={() => setMobileOpen(false)} />

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
