import { linkLabel } from "@/lib/internal-links";
import { allPages, cityAreas, mobilePageSlugForCity, type SeoPage } from "@/lib/pages";
import { SERVICE_TITLES } from "@/lib/services";
import { getCitySeoFacts } from "@/lib/city-seo";

export type ServiceNavGroup = {
  category: string;
  items: { slug: string; label: string }[];
};

const CATEGORY_ORDER = [
  "Core Commercial Pressure / Power Washing",
  "Industrial Pressure Washing",
  "Parking Lot Pressure Washing",
  "Commercial Awning & Fabric",
  "Building Exterior Washing",
  "Local commercial washing",
] as const;

/** National pillar pages grouped for navigation; local pages grouped by city hub. */
export function serviceNavGroups(): ServiceNavGroup[] {
  const national = allPages.filter((p) => p.area.includes("National"));
  const byCategory = new Map<string, SeoPage[]>();

  for (const page of national) {
    const cat = normalizeNationalCategory(page);
    const list = byCategory.get(cat) ?? [];
    list.push(page);
    byCategory.set(cat, list);
  }

  const groups: ServiceNavGroup[] = [];

  for (const category of CATEGORY_ORDER) {
    if (category === "Local commercial washing") {
      groups.push(localCityGroup());
      continue;
    }
    const pages = byCategory.get(category);
    if (!pages?.length) continue;
    groups.push({
      category,
      items: pages
        .sort((a, b) => a.slug.localeCompare(b.slug))
        .map((p) => ({
          slug: p.slug,
          label: SERVICE_TITLES[p.slug] ?? linkLabel(p),
        })),
    });
  }

  return groups;
}

function normalizeNationalCategory(page: SeoPage): string {
  if (page.slug === "commercial-awning-cleaning") return "Commercial Awning & Fabric";
  if (page.slug === "building-exterior-pressure-washing") return "Building Exterior Washing";
  if (page.slug === "parking-lot-pressure-washing") return "Parking Lot Pressure Washing";
  return page.category;
}

function localCityGroup(): ServiceNavGroup {
  const items = cityAreas.map((city) => {
    const slug = mobilePageSlugForCity(city);
    return {
      slug,
      label: `Commercial washing ${getCitySeoFacts(city).displayName}`,
    };
  });
  return { category: "Local commercial washing", items };
}
