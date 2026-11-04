import Link from "next/link";
import { JsonLdBreadcrumbs, JsonLdFaq, JsonLdLocalService } from "@/components/JsonLd";
import { JadooHero } from "@/components/JadooHero";
import { ServicePageBody } from "@/components/ServicePageBody";
import { SiteHeader } from "@/components/SiteHeader";
import {
  cityPagesForService,
  otherServicesInCity,
  pillarPageFor,
  serviceBaseFromPage,
} from "@/lib/internal-links";
import { getCitySeoFacts } from "@/lib/city-seo";
import {
  breadcrumbItems,
  buildBodySections,
  buildFaqs,
  buildHeroLead,
  buildIntro,
  pageH1,
} from "@/lib/page-seo-content";
import { getPageBySlug, mobilePageSlugForCity, type SeoPage } from "@/lib/pages";
import { serviceImage } from "@/lib/service-images";
import { SITE } from "@/lib/site";

export function SeoServicePage({ page, isLocal }: { page: SeoPage; isLocal: boolean }) {
  const serviceBase = serviceBaseFromPage(page);
  const h1 = pageH1(page, serviceBase, isLocal);
  const intro = buildIntro(page, serviceBase, isLocal);
  const heroLead = buildHeroLead(page, serviceBase, isLocal);
  const sections = buildBodySections(page, serviceBase, isLocal);
  const faqs = buildFaqs(page, serviceBase, isLocal);
  const crumbs = breadcrumbItems(page, serviceBase, isLocal);
  const img = serviceImage(serviceBase);
  const imageAlt = `${h1} — commercial exterior cleaning crew on site`;
  const pillar = pillarPageFor(page);
  const cityLinks = isLocal ? [] : cityPagesForService(serviceBase);
  const cross = isLocal ? otherServicesInCity(page) : [];
  const hubPage = isLocal ? getPageBySlug(mobilePageSlugForCity(page.area)) : undefined;
  const areaLabel = isLocal ? getCitySeoFacts(page.area).displayName : undefined;

  return (
    <>
      <JsonLdBreadcrumbs items={crumbs} domain={SITE.domain} />
      <JsonLdFaq faqs={faqs} />
      {isLocal ? (
        <JsonLdLocalService
          name={h1}
          description={intro.slice(0, 240)}
          area={getCitySeoFacts(page.area).displayName}
          url={`https://${SITE.domain}/${page.slug}`}
          telephone={SITE.phoneTel}
        />
      ) : null}
      <SiteHeader />
      <JadooHero
        kicker={page.category.toUpperCase()}
        title={h1}
        lead={heroLead}
        imageSrc={img}
        imageAlt={imageAlt}
        primaryHref={`tel:${SITE.phoneTel}`}
        primaryLabel={`Call ${SITE.phoneDisplay}`}
        secondaryHref="#faq"
        secondaryLabel="View FAQ"
        beforeTitle={
          <nav className="crumbs crumbs-light" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.path}>
                {i > 0 ? " / " : ""}
                {i < crumbs.length - 1 ? <Link href={c.path}>{c.name}</Link> : c.name}
              </span>
            ))}
          </nav>
        }
      />
      <ServicePageBody
        page={page}
        serviceBase={serviceBase}
        isLocal={isLocal}
        intro={intro}
        sections={sections}
        faqs={faqs}
        cityLinks={cityLinks}
        crossLinks={cross}
        pillar={pillar}
        hubPage={hubPage}
        areaLabel={areaLabel}
      />
    </>
  );
}
