/**
 * Pre-launch SEO audit — run: npm run seo:audit
 */
import { slugBase } from "../lib/content";
import {
  cityPagesForService,
  otherServicesInCity,
} from "../lib/internal-links";
import {
  buildIntro,
  buildMetaDescription,
  buildPageTitle,
  estimatePageWordCount,
  pageH1,
} from "../lib/page-seo-content";
import { SERVICE_BLURBS } from "../lib/site";
import { SERVICE_CARD_LINES, SERVICE_TITLES } from "../lib/services";
import { SERVICE_IMAGES } from "../lib/service-images";
import {
  allPages,
  cityAreas,
  citySuffixes,
  featuredNationalSlugs,
  mobilePageSlugForCity,
  type SeoPage,
} from "../lib/pages";

const inbound = new Map<string, number>();

function bump(slug: string) {
  inbound.set(slug, (inbound.get(slug) ?? 0) + 1);
}

for (const slug of featuredNationalSlugs) bump(slug);
for (const city of cityAreas) bump(mobilePageSlugForCity(city));

const titles = new Map<string, string[]>();
const h1s = new Map<string, string[]>();
const intros = new Map<string, string[]>();

for (const page of allPages) {
  const isLocal = !page.area.includes("National");
  const serviceBase = slugBase(page.slug, citySuffixes);

  const title = buildPageTitle(page, serviceBase, isLocal);
  const h1 = pageH1(page, serviceBase, isLocal);
  const intro = buildIntro(page, serviceBase, isLocal);
  const desc = buildMetaDescription(page, serviceBase, isLocal);
  const words = estimatePageWordCount(page, serviceBase, isLocal);

  for (const [map, val] of [
    [titles, title],
    [h1s, h1],
    [intros, intro],
  ] as const) {
    const list = map.get(val) ?? [];
    list.push(page.slug);
    map.set(val, list);
  }

  if (title.length > 60) console.warn("TITLE >60:", page.slug, title.length);
  if (desc.length > 160) console.warn("META >160:", page.slug, desc.length);
  const introWords = intro.split(/\s+/).filter(Boolean).length;
  if (introWords < 80) console.warn("INTRO <80:", page.slug, introWords);
  const min = isLocal ? 400 : 800;
  if (words < min) console.warn(`WORDS <${min}:`, page.slug, words);

  if (!isLocal) {
    for (const c of cityPagesForService(serviceBase)) bump(c.slug);
  } else {
    bump(serviceBase);
    for (const o of otherServicesInCity(page)) bump(o.slug);
    const hub = mobilePageSlugForCity(page.area);
    if (hub !== page.slug) bump(hub);
  }
}

const orphans = allPages.filter((p) => (inbound.get(p.slug) ?? 0) === 0);

console.log("\n=== washpavement.com SEO audit ===\n");
console.log("Pages:", allPages.length);
console.log("Orphan slugs:", orphans.length);
if (orphans.length > 0 && orphans.length <= 25) {
  console.log(orphans.map((p: SeoPage) => p.slug).join("\n"));
}

const dup = (m: Map<string, string[]>) => [...m.values()].filter((s) => s.length > 1).length;
console.log("Duplicate titles:", dup(titles));
console.log("Duplicate H1s:", dup(h1s));
console.log("Duplicate full intros:", dup(intros));

console.log("\nService catalog:");
for (const slug of featuredNationalSlugs) {
  const miss: string[] = [];
  if (!SERVICE_TITLES[slug]) miss.push("TITLES");
  if (!SERVICE_BLURBS[slug]) miss.push("BLURBS");
  if (!SERVICE_CARD_LINES[slug]) miss.push("LINES");
  if (!SERVICE_IMAGES[slug]) miss.push("IMAGES");
  if (miss.length) console.warn("MISSING", slug, miss.join(", "));
}

console.log("\nDone.\n");
