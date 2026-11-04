import pagesData from "@/data/pages.json";
import { citySlugSuffix } from "@/lib/cities";
import { FEATURED_SLUGS } from "@/lib/site";

export type SeoPage = {
  num: number | string;
  title: string;
  slug: string;
  primary_kw: string;
  secondary_kw: string;
  area: string;
  vol: number | null;
  kd: number | null;
  cpc: number | null;
  category: string;
};

type Payload = { pages: SeoPage[]; cities: string[] };
const payload = pagesData as Payload;

export const allPages = payload.pages;
export const cityAreas = [
  ...new Set(allPages.map((p) => p.area).filter((a) => a && !a.includes("National"))),
].sort();
export const citySuffixes = cityAreas.map(citySlugSuffix);
export const featuredNationalSlugs = FEATURED_SLUGS;

export function getPageBySlug(slug: string): SeoPage | undefined {
  return allPages.find((p) => p.slug === slug);
}

export function mobilePageSlugForCity(city: string): string {
  const slug = `commercial-pressure-washing-services-${citySlugSuffix(city)}`;
  return allPages.some((p) => p.slug === slug) ? slug : slug;
}
