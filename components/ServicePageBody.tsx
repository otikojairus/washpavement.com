import Image from "next/image";
import Link from "next/link";
import type { SeoPage } from "@/lib/pages";
import { linkLabel } from "@/lib/internal-links";
import { serviceIllustration } from "@/lib/service-images";
import { SERVICE_CARD_LINES, SERVICE_HIGHLIGHTS, SERVICE_TITLES } from "@/lib/services";
import { FEATURED_SLUGS, SITE } from "@/lib/site";

type Section = { heading: string; paragraphs: string[] };
type Faq = { question: string; answer: string };

const TRUST_ITEMS = [
  { label: "24/7 dispatch", detail: "Call anytime" },
  { label: "Insured crews", detail: "Commercial exterior focus" },
  { label: "Surface-safe methods", detail: "Substrate-specific PSI" },
  { label: "Photo reports", detail: "Before/after on request" },
];

const PROCESS_STEPS = [
  {
    tone: "yellow",
    title: "Share site details",
    text: "City, square footage, surface types, and photos if you have them.",
  },
  {
    tone: "coral",
    title: "Walk-through & quote",
    text: "We confirm drains, access, tenant hours, and method before mobilizing.",
  },
  {
    tone: "violet",
    title: "Crew completes work",
    text: "Documented clean with optional photos for boards and asset managers.",
  },
];

type Props = {
  page: SeoPage;
  serviceBase: string;
  isLocal: boolean;
  intro: string;
  sections: Section[];
  faqs: Faq[];
  cityLinks: SeoPage[];
  crossLinks: SeoPage[];
  pillar?: SeoPage;
  hubPage?: SeoPage;
  areaLabel?: string;
};

export function ServicePageBody({
  page,
  serviceBase,
  isLocal,
  intro,
  sections,
  faqs,
  cityLinks,
  crossLinks,
  pillar,
  hubPage,
  areaLabel,
}: Props) {
  const highlights = SERVICE_HIGHLIGHTS[serviceBase] ?? [];
  const illustration = serviceIllustration(serviceBase);
  const otherServices = FEATURED_SLUGS.filter((s) => s !== serviceBase);

  return (
    <>
      <section className="service-trust" aria-label="Why teams call us">
        <div className="container service-trust-grid">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="service-trust-item">
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section service-overview">
        <div className="container service-overview-grid">
          <div className="service-overview-copy">
            <span className="kicker muted">OVERVIEW</span>
            <h2>What this service covers</h2>
            <p className="service-intro-text">{intro}</p>
          </div>
          <aside className="service-quote-card">
            <div className="service-quote-card-head">
              <Image src={illustration} alt="" width={72} height={72} className="service-quote-thumb" />
              <div>
                <p className="service-quote-label">Ready to quote</p>
                <p className="service-quote-line">
                  {SERVICE_CARD_LINES[serviceBase] ?? "Commercial exterior scope tailored to your site."}
                </p>
              </div>
            </div>
            <ul className="service-checklist">
              {highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <a className="jadoo-btn-primary full" href={`tel:${SITE.phoneTel}`}>
              Call {SITE.phoneDisplay}
            </a>
            <p className="side-hours">{SITE.hours}</p>
          </aside>
        </div>
      </section>

      <section className="section section-cream service-process">
        <div className="container">
          <span className="kicker muted">HOW IT WORKS</span>
          <h2>From first call to finished site</h2>
          <ol className="service-process-steps">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.title}>
                <span className={`step-icon ${step.tone}`}>{i + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {sections.map((s, i) => (
        <section
          key={`${s.heading}-${i}`}
          className={`section service-detail-block${i % 2 === 1 ? " section-cream" : ""}`}
        >
          <div className="container service-detail-grid">
            <div className="service-detail-index" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="service-detail-content">
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p, pi) => (
                <p key={`${i}-${pi}`}>{p}</p>
              ))}
            </div>
            {i === 0 ? (
              <div className="service-detail-visual">
                <Image src={illustration} alt="" width={280} height={280} className="service-detail-img" />
              </div>
            ) : null}
          </div>
        </section>
      ))}

      {isLocal && pillar ? (
        <section className="section service-pillar-band">
          <div className="container service-pillar-inner">
            <div>
              <span className="kicker">NATIONAL GUIDE</span>
              <h2>Canada-wide scope for this service</h2>
              <p>
                See methods, planning windows, and documentation standards on our national{" "}
                {SERVICE_TITLES[serviceBase]?.toLowerCase() ?? "service"} page.
              </p>
            </div>
            <Link className="jadoo-btn-primary" href={`/${pillar.slug}`}>
              {linkLabel(pillar)}
            </Link>
          </div>
        </section>
      ) : null}

      {!isLocal && otherServices.length > 0 ? (
        <section className="section section-cream">
          <div className="container center-head">
            <span className="kicker muted">RELATED</span>
            <h2>Other exterior services</h2>
          </div>
          <div className="container service-related-grid">
            {otherServices.map((slug) => (
              <Link key={slug} href={`/${slug}`} className="service-related-card">
                <Image
                  src={serviceIllustration(slug)}
                  alt=""
                  width={64}
                  height={64}
                  className="service-related-img"
                />
                <span>{SERVICE_TITLES[slug]}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {isLocal && crossLinks.length > 0 ? (
        <section className="section section-cream">
          <div className="container center-head">
            <span className="kicker muted">IN YOUR MARKET</span>
            <h2>Other services in {areaLabel}</h2>
          </div>
          <nav className="container service-related-grid">
            {crossLinks.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="service-related-card">
                <span>{linkLabel(p)}</span>
              </Link>
            ))}
          </nav>
        </section>
      ) : null}

      {isLocal && hubPage && hubPage.slug !== page.slug ? (
        <section className="section">
          <div className="container service-pillar-inner">
            <p>
              <Link href={`/${hubPage.slug}`} className="service-hub-link">
                {linkLabel(hubPage)} →
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      <section className="section service-faq" id="faq">
        <div className="container service-faq-grid">
          <div>
            <span className="kicker muted">FAQ</span>
            <h2>Common questions</h2>
            <p className="lead">Quick answers — call dispatch for site-specific scope.</p>
            <a className="jadoo-btn-primary service-faq-call" href={`tel:${SITE.phoneTel}`}>
              Call {SITE.phoneDisplay}
            </a>
          </div>
          <div className="service-faq-list">
            {faqs.map((f) => (
              <details key={f.question} className="service-faq-item">
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {!isLocal && cityLinks.length > 0 ? (
        <section className="section section-cream" id="cities">
          <div className="container center-head">
            <span className="kicker muted">SERVICE AREAS</span>
            <h2>{SERVICE_TITLES[serviceBase] ?? "This service"} by city</h2>
            <p className="lead">Jump to local scheduling, landmarks, and cross-service links.</p>
          </div>
          <nav className="container city-index" aria-label="Cities for this service">
            {cityLinks.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="city-index-item">
                <span>{linkLabel(p)}</span>
                <span className="city-index-arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </nav>
        </section>
      ) : null}

      <section className="service-page-cta">
        <div className="container service-page-cta-inner">
          <h2>Book {SERVICE_TITLES[serviceBase]?.toLowerCase() ?? "this service"}</h2>
          <p>No forms — talk to dispatch and get a scope for your site.</p>
          <a className="footer-cta-phone" href={`tel:${SITE.phoneTel}`}>
            {SITE.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
