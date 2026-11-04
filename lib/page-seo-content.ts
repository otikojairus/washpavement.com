import { getCitySeoFacts } from "@/lib/city-seo";
import { SERVICE_TITLES } from "@/lib/services";
import type { SeoPage } from "@/lib/pages";
import { SERVICE_BLURBS, SITE } from "@/lib/site";

export type FaqItem = { question: string; answer: string };

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function titleCase(kw: string): string {
  return kw.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function buildPageTitle(page: SeoPage, serviceBase: string, isLocal: boolean): string {
  const brand = SITE.name;
  const service = SERVICE_TITLES[serviceBase] ?? titleCase(page.primary_kw);
  if (isLocal) {
    const city = getCitySeoFacts(page.area).displayName;
    let candidate = `${service} ${city} | ${brand}`;
    if (candidate.length > 60) {
      const room = 60 - (` ${city} | ${brand}`).length;
      candidate = `${service.slice(0, Math.max(12, room)).trim()} ${city} | ${brand}`;
    }
    return candidate;
  }
  const candidate = `${titleCase(page.primary_kw || service)} Canada | ${brand}`;
  return candidate.length <= 60 ? candidate : candidate.slice(0, 57) + "…";
}

export function buildMetaDescription(
  page: SeoPage,
  serviceBase: string,
  isLocal: boolean,
): string {
  const service = SERVICE_TITLES[serviceBase] ?? page.primary_kw;
  const h = hash(page.slug + (page.secondary_kw || ""));
  if (isLocal) {
    const facts = getCitySeoFacts(page.area);
    const city = facts.displayName;
    const variants = [
      `${service} in ${city} — retail, industrial & strata sites. Insured crews, clear quotes. Call ${SITE.phoneDisplay} today.`,
      `${city} ${service.toLowerCase()} near ${facts.landmark}. After-hours scheduling. Call ${SITE.phoneDisplay} for a site visit.`,
      `Need ${service.toLowerCase()} in ${city}? Safe PSI for your surfaces. Call ${SITE.phoneDisplay} — open 24/7.`,
    ];
    const d = variants[h % variants.length];
    return d.length <= 160 ? d : d.slice(0, 157) + "…";
  }
  const variants = [
    `${service} across Canada — storefronts, lots, awnings & cladding. Call ${SITE.phoneDisplay} for scope and scheduling.`,
    `Canada-wide ${service.toLowerCase()} for commercial portfolios. Insured exterior crews. Call ${SITE.phoneDisplay} now.`,
    `${service} nationwide. We match pressure to the substrate. Call ${SITE.phoneDisplay} to book.`,
  ];
  const d = variants[h % variants.length];
  return d.length <= 160 ? d : d.slice(0, 157) + "…";
}

export function pageH1(page: SeoPage, serviceBase: string, isLocal: boolean): string {
  const service = SERVICE_TITLES[serviceBase] ?? titleCase(page.primary_kw);
  if (isLocal) {
    return `${service} in ${getCitySeoFacts(page.area).displayName}`;
  }
  return `${service} in Canada`;
}

export function buildHeroLead(page: SeoPage, serviceBase: string, isLocal: boolean): string {
  const blurb = SERVICE_BLURBS[serviceBase] ?? "";
  const service = SERVICE_TITLES[serviceBase] ?? page.primary_kw;
  if (isLocal) {
    const city = getCitySeoFacts(page.area).displayName;
    return `${service} for commercial properties in ${city}. ${blurb} Call ${SITE.phoneDisplay} for a site walk and clear scope.`;
  }
  return `${service} for retail, industrial, and strata sites across Canada. ${blurb} Call ${SITE.phoneDisplay} — ${SITE.hours.toLowerCase()}.`;
}

export function buildIntro(page: SeoPage, serviceBase: string, isLocal: boolean): string {
  const blurb = SERVICE_BLURBS[serviceBase] ?? "";
  const service = SERVICE_TITLES[serviceBase] ?? page.primary_kw;
  const h = hash(page.slug);

  if (isLocal) {
    const facts = getCitySeoFacts(page.area);
    const openers = [
      `When ${service.toLowerCase()} cannot wait until your next tenant walk-through in ${facts.displayName}, you need crews who understand commercial access rules — not a residential truck in a loading zone.`,
      `Property teams across ${facts.displayName} call us after ${facts.climate} leaves salt, algae, and tire marks on lots and entries.`,
      `If you manage sites near ${facts.landmark} or around ${facts.neighbourhood}, grime on sidewalks and cladding shows up fast in photos and slip-risk audits.`,
    ];
    const closers = [
      `Tell us square footage and surface types — we quote before mobilizing.`,
      `Share gate codes and after-hours rules; we schedule around your tenants.`,
      `Call ${SITE.phoneDisplay} — dispatch is ${SITE.hours.toLowerCase()}.`,
    ];
    return (
      `${openers[h % openers.length]} ` +
      `${service} in ${facts.displayName} — ${facts.population}; ${facts.climate} ` +
      `makes regular exterior cleaning part of asset care, not vanity. ${blurb} ` +
      `We walk drains, stripes, and signage first, then match pressure and chemistry. ` +
      `${closers[(h + serviceBase.length) % closers.length]}`
    );
  }

  const openers = [
    `Canadian portfolio managers choose ${SITE.name} when ${service.toLowerCase()} must be documented, insured, and done without etching the wrong substrate.`,
    `From Atlantic salt to prairie dust, ${service.toLowerCase()} needs regional scheduling and surface-specific methods — not one tip for every wall.`,
    `${SITE.name} coordinates ${service.toLowerCase()} for single sites and multi-province lists with one dispatch line.`,
  ];
  return (
    `${openers[h % openers.length]} ${blurb} ` +
    `We separate concrete, asphalt, brick, EIFS, metal, and fabric awning methods under the same service name — because PSI that works on a lot can ruin stucco. ` +
    `Hot water, reclaim, and night crews are available when specs require them. ` +
    `National pillars on this site link to city-specific ${service.toLowerCase()} pages with local landmarks and cross-service links for your market. ` +
    `Call ${SITE.phoneDisplay} with your city and building type; a coordinator confirms coverage and sends a scope before work starts.`
  );
}

export function buildBodySections(
  page: SeoPage,
  serviceBase: string,
  isLocal: boolean,
): { heading: string; paragraphs: string[] }[] {
  const service = SERVICE_TITLES[serviceBase] ?? page.primary_kw;
  const h = hash(page.slug + serviceBase);

  const slugNote =
    page.secondary_kw && page.secondary_kw.length > 4
      ? `Teams also search for ${page.secondary_kw.split(";")[0]?.trim() ?? page.secondary_kw} — the scope we quote matches the surfaces on your site, not generic residential rates.`
      : `Every quote ties ${service.toLowerCase()} to your actual square footage, access, and substrate mix — not a flat residential rate card.`;

  const common = [
    {
      heading: "What we assess on site",
      paragraphs: [
        `Before ${service.toLowerCase()}, we note surface type, slope to drains, tenant hours, fragile signage, and landscaping buffers.`,
        `Pre-clean photos are available when boards, insurers, or asset managers need a paper trail.`,
        slugNote,
      ],
    },
    {
      heading: "How scheduling works",
      paragraphs: [
        `Share address, approximate square footage, and preferred window — nights and weekends are routine for retail and food service.`,
        `We confirm water access, hose length, hot-water needs, and whether reclaim is required before trucks roll.`,
        `If weather shifts, we reschedule without surprise mobilization fees when you approve the new window.`,
      ],
    },
    {
      heading: "Safety and surface care",
      paragraphs: [
        `Tip size, standoff distance, and detergent choice change by substrate — high PSI on the wrong material causes permanent etching.`,
        `We protect door seals, electrical fixtures, and fresh line paint while still removing gum, grease, and organic growth.`,
        `Crews wear commercial PPE, cordon wet zones, and post wet-floor awareness where foot traffic continues during partial cleans.`,
      ],
    },
  ];

  if (isLocal) {
    const facts = getCitySeoFacts(page.area);
    const local = {
      heading: `Serving ${facts.displayName} and nearby routes`,
      paragraphs: [
        `We reach properties near ${facts.landmark} and communities such as ${facts.neighbourhood}. ${facts.climate} pushes salt and moisture into porous concrete — regular ${service.toLowerCase()} reduces slip calls and tenant complaints.`,
        `Whether you manage one plaza or a regional list in ${facts.displayName}, tell us where crews should enter and we confirm ${service.toLowerCase()} coverage before dispatch.`,
        `${facts.population} means high foot traffic on entries and pads — we stage hoses and signage so retail tenants stay open while we work perimeter zones first.`,
      ],
    };
    const surfaces = {
      heading: `Typical ${facts.displayName} exterior surfaces`,
      paragraphs: [
        `Plazas mix poured concrete, interlock, stucco accents, and metal cladding — ${service.toLowerCase()} plans separate each zone so runoff stays out of storm drains that already carry winter salt.`,
        `If your portfolio includes parkades or loading docks, mention ceiling height and drain sumps when you call ${SITE.phoneDisplay}; we bring extension wands and degreasers sized for commercial traffic.`,
      ],
    };
    const focus = serviceSpecificSection(serviceBase, service, true);
    const order =
      h % 3 === 0
        ? [local, surfaces, focus, ...common]
        : h % 3 === 1
          ? [surfaces, local, focus, ...common]
          : [focus, ...common, local, surfaces];
    return order;
  }

  const national = {
    heading: "Coast-to-coast commercial coverage",
    paragraphs: [
      `We schedule ${service.toLowerCase()} for retail, industrial, strata, and institutional clients across provinces.`,
      `National accounts receive consistent methods and reporting; single-site owners get the same walk-through and quote process.`,
      `Use the city links below to jump to ${service.toLowerCase()} in your market — each page lists local landmarks, climate notes, and cross-links to related exterior services.`,
    ],
  };
  const depth = {
    heading: `What ${service.toLowerCase()} includes on your property`,
    paragraphs: [
      `Every portfolio uses different mixes of concrete, asphalt, brick, cladding, and fabric — we treat ${service.toLowerCase()} as a scope, not a single machine setting.`,
      `If a test patch fails, we adjust chemistry or pressure before continuing — you approve changes before extra work proceeds.`,
      `After completion, we note what was cleaned, what to monitor, and when to re-book based on traffic and weather.`,
      `Standard scopes cover accessible vertical and horizontal surfaces agreed in writing — we do not surprise you with add-ons unless you approve a change order on site.`,
    ],
  };
  const planning = {
    heading: "Planning your wash window",
    paragraphs: [
      `Have photos, site maps, and tenant hour restrictions ready when you call — they speed quoting for ${service.toLowerCase()}.`,
      `Spring and fall are peak for salt and pollen removal; book early if you need a fixed date before inspections or lease events.`,
      `Multi-site lists can be phased by province so one coordinator owns scheduling, invoicing, and method notes across your portfolio.`,
    ],
  };
  const reporting = {
    heading: "Documentation for owners and insurers",
    paragraphs: [
      `When ${service.toLowerCase()} supports a claim or capital plan, we can provide before-and-after photos with date stamps and scope notes.`,
      `Tell us if your lender or strata council needs a written summary — we describe surfaces cleaned, products used, and any areas left dry by design.`,
      `Recurring programs can share the same photo format each visit so year-over-year comparisons are easy for asset managers and third-party inspectors.`,
    ],
  };
  const serviceFocus = serviceSpecificSection(serviceBase, service, false);
  const provinces = {
    heading: "Provincial scheduling and weather windows",
    paragraphs: [
      `Atlantic and Pacific coast properties often need salt and algae control on entries and cladding; interior prairies see dust and mud on lots after thaw.`,
      `We align ${service.toLowerCase()} with your inspection calendar — not just the first dry weekend — so boards and insurers see consistent results.`,
      `When multiple provinces are on one work order, a single coordinator tracks crew arrival, water restrictions, and any site-specific PPE rules.`,
      `Holiday retail peaks and summer construction season both compress available wash windows — call early if you need a fixed date on a national list.`,
    ],
  };
  return [national, depth, planning, reporting, serviceFocus, provinces, ...common];
}

function serviceSpecificSection(
  serviceBase: string,
  service: string,
  isLocal: boolean,
): { heading: string; paragraphs: string[] } {
  const place = isLocal ? "your property" : "Canadian commercial sites";
  if (serviceBase.includes("parking")) {
    return {
      heading: "Parking lot and garage focus",
      paragraphs: [
        `${service} on ${place} targets oil migration, tire marks, and chewing gum without blasting through sealcoat or fresh striping.`,
        `We work from the perimeter inward, keep reclaim where required, and flag drains that need pre-sweeping before water hits the lot.`,
      ],
    };
  }
  if (serviceBase.includes("awning")) {
    return {
      heading: "Awning and canopy care",
      paragraphs: [
        `${service} for ${place} uses low-pressure passes on fabric, vinyl, and painted metal — not the same setup as flatwork.`,
        `We test a hem or back corner first, then clean visible customer-facing panels so branding stays crisp for street sightlines.`,
      ],
    };
  }
  if (serviceBase.includes("industrial")) {
    return {
      heading: "Industrial yards and equipment pads",
      paragraphs: [
        `${service} in industrial zones respects escort rules, lockout tags, and hot surfaces near production lines.`,
        `Degreasers and hot water may be specified for forklift paths and loading bays — scope those areas separately from office cladding.`,
      ],
    };
  }
  if (serviceBase.includes("building-exterior")) {
    return {
      heading: "Cladding and façade methods",
      paragraphs: [
        `${service} on ${place} separates EIFS, brick, glass-adjacent frames, and metal panels — each needs a different fan and standoff.`,
        `We avoid forcing water behind siding or into weep holes while still removing pollution staining and organic growth.`,
      ],
    };
  }
  return {
    heading: "Storefront and plaza readiness",
    paragraphs: [
      `${service} for ${place} keeps sidewalks, entries, and dumpster pads presentable for customers and delivery drivers.`,
      `Night crews can hit entries after close, then return for lot work at dawn when traffic is lighter.`,
    ],
  };
}

function faqPool(serviceBase: string, isLocal: boolean, page: SeoPage): FaqItem[] {
  const service = SERVICE_TITLES[serviceBase] ?? "pressure washing";
  const facts = isLocal ? getCitySeoFacts(page.area) : null;
  const city = facts?.displayName ?? "your city";

  const base: FaqItem[] = [
    {
      question: `Do you offer ${service.toLowerCase()} after business hours?`,
      answer: isLocal
        ? `Yes — many ${city} clients prefer overnight or early-morning crews near ${facts?.landmark ?? city}. Call ${SITE.phoneDisplay} with your hours.`
        : `Yes — we schedule nationally around tenant hours. Call ${SITE.phoneDisplay} with your constraints.`,
    },
    {
      question: "Are your crews insured for commercial sites?",
      answer:
        "We carry commercial liability for third-party property. Tell us if your portfolio needs additional certificates — we provide them when required.",
    },
    {
      question: "Will pressure washing damage paint or signage?",
      answer:
        "We test a small area first and choose tip, pressure, and detergent accordingly. Awnings and stripes get lower PSI and wider fans.",
    },
    {
      question: "Do you bring water or use on-site taps?",
      answer:
        "Most sites use municipal or well water on property; we confirm flow and hose length at quote. Industrial jobs may specify reclaim or hot-water units.",
    },
    {
      question: "How soon can you start after I call?",
      answer: isLocal
        ? `Lead times in ${city} depend on season — call ${SITE.phoneDisplay} with your deadline and we give an honest window.`
        : `We route by region — call ${SITE.phoneDisplay} with your city and urgency.`,
    },
  ];

  if (serviceBase.includes("parking")) {
    base.push({
      question: "Will lot striping be damaged?",
      answer:
        "We use fan tips and standoff on painted lines, and we avoid aggressive zero-degree nozzles on fresh stripe work.",
    });
  }
  if (serviceBase.includes("awning")) {
    base.push({
      question: "Can you clean fabric awnings safely?",
      answer:
        "Yes — fabric and vinyl use low pressure and awning-safe chemistry, not the same setup as concrete lots.",
    });
  }
  if (serviceBase.includes("industrial")) {
    base.push({
      question: "Do you follow site safety orientations?",
      answer:
        "Industrial clients often require PPE rules, escorts, and lockout awareness — tell us your requirements when booking.",
    });
  }

  const start = hash(page.slug) % Math.max(1, base.length - 2);
  const slice = base.slice(start, start + 3);
  return slice.length >= 3 ? slice : base.slice(0, 3);
}

export function buildFaqs(page: SeoPage, serviceBase: string, isLocal: boolean): FaqItem[] {
  const pool = faqPool(serviceBase, isLocal, page);
  const start = hash(page.slug) % Math.max(1, pool.length - 2);
  const picked = pool.slice(start, start + 4);
  if (picked.length >= 3) return picked.slice(0, 4);
  return pool.slice(0, 3);
}

export function totalWordCount(parts: string[]): number {
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}

export function estimatePageWordCount(
  page: SeoPage,
  serviceBase: string,
  isLocal: boolean,
): number {
  const intro = buildIntro(page, serviceBase, isLocal);
  const sections = buildBodySections(page, serviceBase, isLocal);
  const faqs = buildFaqs(page, serviceBase, isLocal);
  return totalWordCount([
    intro,
    ...sections.flatMap((s) => [s.heading, ...s.paragraphs]),
    ...faqs.flatMap((f) => [f.question, f.answer]),
  ]);
}

export function breadcrumbItems(
  page: SeoPage,
  serviceBase: string,
  isLocal: boolean,
): { name: string; path: string }[] {
  const items = [{ name: "Home", path: "/" }];
  const service = SERVICE_TITLES[serviceBase] ?? "Services";
  if (isLocal) {
    items.push({ name: `${service} Canada`, path: `/${serviceBase}` });
    items.push({
      name: getCitySeoFacts(page.area).displayName,
      path: `/${page.slug}`,
    });
  } else {
    items.push({ name: service, path: `/${page.slug}` });
  }
  return items;
}
