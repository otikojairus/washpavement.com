type Crumb = { name: string; path: string };

import { SITE } from "@/lib/site";

export function JsonLdBreadcrumbs({ items, domain }: { items: Crumb[]; domain: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item:
        item.path === "/"
          ? `https://${domain}/`
          : `https://${domain}${item.path}`,
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function JsonLdFaq({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function JsonLdLocalService({
  name,
  description,
  area,
  url,
  telephone,
}: {
  name: string;
  description: string;
  area: string;
  url: string;
  telephone: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    areaServed: { "@type": "City", name: area },
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name,
      telephone,
      url,
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
