import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLdBreadcrumbs, JsonLdFaq } from "@/components/JsonLd";
import { JadooHero } from "@/components/JadooHero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  cityAreas,
  featuredNationalSlugs,
  mobilePageSlugForCity,
} from "@/lib/pages";
import { HERO_HOME_IMAGE, serviceIllustration } from "@/lib/service-images";
import { SERVICE_CARD_LINES, SERVICE_CARD_TITLES } from "@/lib/services";
import { SITE } from "@/lib/site";

const HOME_FAQ = [
  {
    question: "Do you pressure wash commercial properties only?",
    answer:
      "Yes — our crews focus on retail, industrial, strata, and institutional exteriors: lots, sidewalks, awnings, and cladding.",
  },
  {
    question: "Can you work after our tenants close?",
    answer:
      "Night and early-morning windows are common. Call with your hours and we propose a schedule that limits disruption.",
  },
  {
    question: "How do I get a quote?",
    answer: `Call ${SITE.phoneDisplay}. We ask for photos or a walk-through, surface types, and square footage, then send a clear scope.`,
  },
];

export const metadata: Metadata = {
  title: { absolute: `Commercial Pressure Washing Canada | ${SITE.name}` },
  description:
    "Exterior pressure washing for Canadian commercial sites — plazas, plants, parking lots, awnings, and buildings. Call 24/7.",
  alternates: { canonical: `https://${SITE.domain}/` },
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
};

export default function HomePage() {
  const services = featuredNationalSlugs.map((slug) => ({
      slug,
      title: SERVICE_CARD_TITLES[slug],
      line: SERVICE_CARD_LINES[slug],
      image: serviceIllustration(slug),
      href: `/${slug}`,
  }));

  const heroLead = `Gum-stained sidewalks, tired awnings, and salt-crusted lots send the wrong message to tenants, shoppers, and inspectors. ${SITE.name} matches pressure, heat, and chemistry to each commercial surface — brick, EIFS, asphalt, fabric, and cladding — with insured crews that respect after-hours rules and certificate requests. From single plazas to multi-city portfolios, one dispatch line handles scope, scheduling, and photo documentation when you need it. Call ${SITE.phoneDisplay} any time; we are ${SITE.hours.toLowerCase()}.`;

  return (
    <>
      <JsonLdBreadcrumbs items={[{ name: "Home", path: "/" }]} domain={SITE.domain} />
      <JsonLdFaq faqs={HOME_FAQ} />
      <SiteHeader />
      <JadooHero
        kicker="COMMERCIAL EXTERIOR CARE · CANADA"
        title={
          <>
            Wash, <span className="hero-accent">restore</span> and protect your curb appeal
          </>
        }
        lead={heroLead}
        imageSrc={HERO_HOME_IMAGE}
        imageAlt="Commercial pressure washing crew cleaning a storefront plaza"
        primaryHref={`tel:${SITE.phoneTel}`}
        primaryLabel={`Call ${SITE.phoneDisplay}`}
        secondaryHref="#services"
        secondaryLabel="Explore services"
      />

      <section className="section category-jadoo" id="services">
        <div className="category-deco" aria-hidden />
        <div className="container center-head">
          <span className="kicker muted">CATEGORY</span>
          <h2>We offer best-in-class washing</h2>
          <p className="lead">Five core services — each with national guides and city scheduling.</p>
        </div>
        <div className="container service-cards-jadoo">
          {services.map((s, i) => (
            <article key={s.slug} className={i === 1 ? "svc-card featured" : "svc-card"}>
              <span className="svc-art">
                <Image src={s.image} alt="" width={120} height={120} className="svc-art-img" />
              </span>
              <h3>{s.title}</h3>
              <p>{s.line}</p>
              <Link href={s.href}>Learn more →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-cream cities-section" id="cities">
        <div className="container center-head">
          <span className="kicker muted">SERVICE AREAS</span>
          <h2>Cities we serve across Canada</h2>
          <p className="lead">
            Commercial exterior washing in {cityAreas.length} markets — select your city for local
            scheduling and scope details.
          </p>
        </div>
        <nav className="container city-index" aria-label="Cities we serve">
          {cityAreas.map((city) => (
            <Link key={city} href={`/${mobilePageSlugForCity(city)}`} className="city-index-item">
              <span>{city}</span>
              <span className="city-index-arrow" aria-hidden>
                →
              </span>
            </Link>
          ))}
        </nav>
      </section>

      <section className="section" id="steps">
        <div className="container steps-grid">
          <div>
            <span className="kicker muted">EASY AND FAST</span>
            <h2>Book your next wash in 3 easy steps</h2>
            <ol className="steps-list">
              <li>
                <span className="step-icon yellow">📋</span>
                <div>
                  <strong>Call dispatch</strong>
                  <p>Share city, site type, and photos if you have them.</p>
                </div>
              </li>
              <li>
                <span className="step-icon coral">💳</span>
                <div>
                  <strong>Site walk & quote</strong>
                  <p>We confirm surfaces, drains, and timing before mobilizing.</p>
                </div>
              </li>
              <li>
                <span className="step-icon violet">🚐</span>
                <div>
                  <strong>Crew completes & report</strong>
                  <p>Before/after photos on request for your records.</p>
                </div>
              </li>
            </ol>
          </div>
          <div className="steps-visual round-img">
            <Image
              src={HERO_HOME_IMAGE}
              alt=""
              width={420}
              height={520}
            />
          </div>
        </div>
      </section>

      <section className="section section-cream" id="about">
        <div className="container testimonial-jadoo">
          <div className="testimonial-copy">
            <span className="kicker muted">TESTIMONIALS</span>
            <h2>What property managers say about us.</h2>
            <div className="testimonial-dots" aria-hidden>
              <span className="active" />
              <span />
              <span />
            </div>
          </div>
          <blockquote className="testimonial-card">
            <p>
              “They washed our plaza overnight — stripes intact, drains clear, and the board got photos
              by morning.”
            </p>
            <footer>
              <strong>Facilities lead</strong>
              <span>Ontario retail portfolio</span>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="subscribe-band">
        <div className="container subscribe-inner">
          <h2>Ready for a cleaner curb appeal?</h2>
          <p>No forms — call {SITE.phoneDisplay} and talk to dispatch now.</p>
          <a className="jadoo-btn-primary" href={`tel:${SITE.phoneTel}`}>
            Call {SITE.phoneDisplay}
          </a>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container faq-home">
          <h2>FAQ</h2>
          {HOME_FAQ.map((f) => (
            <div key={f.question}>
              <h3>{f.question}</h3>
              <p>{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
