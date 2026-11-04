import Image from "next/image";
import Link from "next/link";
import { cityAreas, mobilePageSlugForCity } from "@/lib/pages";
import { SITE_LOGO } from "@/lib/service-images";
import { FEATURED_SLUGS, SITE } from "@/lib/site";
import { SERVICE_TITLES } from "@/lib/services";

export function SiteFooter() {
  const previewCities = cityAreas.slice(0, 10);

  return (
    <footer className="summit-footer">
      <div className="footer-wave" aria-hidden />
      <div className="footer-cta-strip">
        <div className="container footer-cta-inner">
          <div>
            <p className="footer-cta-kicker">24/7 dispatch</p>
            <p className="footer-cta-title">One call schedules crews anywhere we serve.</p>
          </div>
          <a className="footer-cta-phone" href={`tel:${SITE.phoneTel}`}>
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>
      <div className="footer-body">
        <div className="container footer-summit-grid">
          <div className="footer-brand-block">
            <Link href="/" className="footer-brand-link">
              <Image src={SITE_LOGO} alt="" width={44} height={44} className="footer-logo-img" />
              <span className="footer-brand-name">{SITE.name}</span>
            </Link>
            <p className="footer-brand-tag">{SITE.tagline}</p>
            <p className="footer-brand-hours">{SITE.hours}</p>
          </div>
          <div>
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-link-list">
              {FEATURED_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link href={`/${slug}`}>{SERVICE_TITLES[slug]}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">On this site</h4>
            <ul className="footer-link-list">
              <li>
                <Link href="/#services">Service categories</Link>
              </li>
              <li>
                <Link href="/#cities">Cities we serve</Link>
              </li>
              <li>
                <Link href="/#steps">How booking works</Link>
              </li>
              <li>
                <Link href="/#faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">Service areas</h4>
            <ul className="footer-city-list">
              {previewCities.map((city) => (
                <li key={city}>
                  <Link href={`/${mobilePageSlugForCity(city)}`}>{city}</Link>
                </li>
              ))}
            </ul>
            <Link href="/#cities" className="footer-all-cities">
              View all {cityAreas.length} cities →
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <p>© 2026 {SITE.name}</p>
          <p>{SITE.hoursNote}</p>
        </div>
      </div>
    </footer>
  );
}
