"use client";

import { useState, useEffect } from "react";
import {
  Bike,
  Star,
  HelpCircle,
  Tag,
  Building2,
  Award,
  MapPin,
  TrendingUp,
} from "lucide-react";

interface StatCard {
  label: string;
  count: number;
  icon: React.ElementType;
  color: string;
  bg: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatCard[]>([
    { label: "Total Motorcycles", count: 0, icon: Bike, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Total Testimonials", count: 0, icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
    { label: "Total FAQs", count: 0, icon: HelpCircle, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Promos", count: 0, icon: Tag, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Clients", count: 0, icon: Building2, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Total Advantages", count: 0, icon: Award, color: "text-pink-600", bg: "bg-pink-50" },
    { label: "Tourist Infos", count: 0, icon: MapPin, color: "text-teal-600", bg: "bg-teal-50" },
    { label: "Active Promos", count: 0, icon: TrendingUp, color: "text-red-600", bg: "bg-red-50" },
  ]);

  useEffect(() => {
    const endpoints = [
      { url: "/api/motorcycles", index: 0 },
      { url: "/api/testimonials", index: 1 },
      { url: "/api/faqs", index: 2 },
      { url: "/api/promos", index: 3 },
      { url: "/api/clients", index: 4 },
      { url: "/api/advantages", index: 5 },
      { url: "/api/tourist-infos", index: 6 },
    ];

    Promise.all(
      endpoints.map(({ url }) =>
        fetch(url)
          .then((r) => (r.ok ? r.json() : []))
          .catch(() => [])
      )
    ).then((results) => {
      setStats((prev) =>
        prev.map((s, i) => {
          if (i === 7) {
            return { ...s, count: results[3]?.filter?.((p: { isActive: boolean }) => p.isActive)?.length ?? 0 };
          }
          return { ...s, count: results[i]?.length ?? 0 };
        })
      );
    });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to Mas Karyo admin panel</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
