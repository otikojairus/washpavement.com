import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoServicePage } from "@/components/SeoServicePage";
import { SiteFooter } from "@/components/SiteFooter";
import { slugBase } from "@/lib/content";
import { buildMetaDescription, buildPageTitle } from "@/lib/page-seo-content";
import { allPages, citySuffixes, getPageBySlug } from "@/lib/pages";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) return {};
  const isLocal = !page.area.includes("National");
  const base = slugBase(page.slug, citySuffixes);
  return {
    title: { absolute: buildPageTitle(page, base, isLocal) },
    description: buildMetaDescription(page, base, isLocal),
    alternates: { canonical: `https://${SITE.domain}/${slug}` },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) notFound();
  return (
    <>
      <SeoServicePage page={page} isLocal={!page.area.includes("National")} />
      <SiteFooter />
    </>
  );
}
