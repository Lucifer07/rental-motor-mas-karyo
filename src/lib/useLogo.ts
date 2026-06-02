"use client";

import { useEffect, useState, useCallback } from "react";

interface LogoData {
  logo_url: string;
  site_name: string;
}

export function useLogo() {
  const [data, setData] = useState<LogoData>({ logo_url: "", site_name: "Mas Karyo" });

  const fetchSettings = useCallback(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((items: Array<{ key: string; value: string }>) => {
        const map: Record<string, string> = {};
        for (const item of items) map[item.key] = item.value;
        setData({
          logo_url: map.logo_url || "",
          site_name: map.site_name || "Mas Karyo",
        });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchSettings();
    window.addEventListener("focus", fetchSettings);
    return () => window.removeEventListener("focus", fetchSettings);
  }, [fetchSettings]);

  return data;
}
