export interface SiteSettings {
  site_name: string;
  logo_url: string;
  whatsapp_number: string;
  phone: string;
  email: string;
  address: string;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  youtube_url: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  about_description: string;
  terms_content: string;
  site_description: string;
  hero_image: string;
}

export function buildSettings(records: Array<{ key: string; value: string }>): SiteSettings {
  const map: Record<string, string> = {};
  for (const r of records) map[r.key] = r.value;
  return {
    site_name: map.site_name || "Mas Karyo",
    logo_url: map.logo_url || "",
    whatsapp_number: map.whatsapp_number || "",
    phone: map.phone || "",
    email: map.email || "",
    address: map.address || "",
    facebook_url: map.facebook_url || "#",
    instagram_url: map.instagram_url || "#",
    twitter_url: map.twitter_url || "#",
    youtube_url: map.youtube_url || "#",
    hero_title: map.hero_title || "",
    hero_subtitle: map.hero_subtitle || "",
    hero_description: map.hero_description || "",
    about_description: map.about_description || "",
    terms_content: map.terms_content || "",
    site_description: map.site_description || "",
    hero_image: map.hero_image || "",
  };
}
