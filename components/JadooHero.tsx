import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  kicker: string;
  title: ReactNode;
  lead: string;
  imageSrc: string;
  imageAlt: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  beforeTitle?: ReactNode;
};

export function JadooHero({
  kicker,
  title,
  lead,
  imageSrc,
  imageAlt,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  beforeTitle,
}: Props) {
  return (
    <section className="hero-jadoo">
      <div className="blob blob-a" aria-hidden />
      <div className="blob blob-b" aria-hidden />
      <div className="hero-deco hero-deco-a" aria-hidden>
        💧
      </div>
      <div className="hero-deco hero-deco-b" aria-hidden>
        ✨
      </div>
      <div className="container hero-jadoo-grid">
        <div className="hero-copy">
          {beforeTitle}
          <span className="kicker">{kicker}</span>
          <h1>{title}</h1>
          <p className="hero-seo-lead">{lead}</p>
          <div className="hero-actions">
            <a className="jadoo-btn-primary" href={primaryHref}>
              {primaryLabel}
            </a>
            {secondaryHref && secondaryLabel ? (
              <Link className="jadoo-btn-play" href={secondaryHref}>
                <span className="play-dot" aria-hidden />
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-blob" aria-hidden />
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={520}
            height={480}
            priority
            className="hero-photo round-img"
          />
        </div>
      </div>
    </section>
  );
}
