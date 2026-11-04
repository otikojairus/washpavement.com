import type { MetadataRoute } from "next";
import { allPages } from "@/lib/pages";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${SITE.domain}`;
  return [
    { url: base, priority: 1 },
    ...allPages.map((p) => ({
      url: `${base}/${p.slug}`,
      priority: p.area.includes("National") ? 0.9 : 0.7,
    })),
  ];
}
