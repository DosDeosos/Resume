import { locales } from "@/i18n/routing";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost:3000";
  const lastModified = new Date();
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${origin}/${locale}`]),
  );

  return locales.map((locale) => ({
    url: `${origin}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
