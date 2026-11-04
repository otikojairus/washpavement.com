"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { serviceNavGroups } from "@/lib/service-nav";
import { handleHomeHashNavClick } from "@/lib/hash-nav";
import { SITE_LOGO } from "@/lib/service-images";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#cities", label: "Cities" },
  { href: "/#steps", label: "How it works" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const close = useCallback(() => {
    setOpen(false);
    setServicesOpen(false);
  }, []);

  const navGroups = serviceNavGroups();

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  return (
    <>
      <header className="jadoo-header">
        <div className="container jadoo-nav">
          <Link className="jadoo-logo" href="/" onClick={close}>
            <Image src={SITE_LOGO} alt="" width={36} height={36} className="logo-mark" />
            <span>{SITE.name}</span>
          </Link>
          <nav className="jadoo-links" aria-label="Primary">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  handleHomeHashNavClick(e, l.href);
                  close();
                }}
              >
                {l.label}
              </Link>
            ))}
            <div
              className="jadoo-services-mega"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="jadoo-services-trigger"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen((v) => !v)}
              >
                All services
              </button>
              <div className={`jadoo-services-panel${servicesOpen ? " is-open" : ""}`}>
                {navGroups.map((group) => (
                  <div key={group.category} className="mega-col">
                    <p className="mega-cat">{group.category}</p>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item.slug}>
                          <Link href={`/${item.slug}`} onClick={close}>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </nav>
          <a className="jadoo-btn-call" href={`tel:${SITE.phoneTel}`}>
            Call now
          </a>
          <button
            type="button"
            className={`jadoo-menu-btn${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <div
        className={`jadoo-drawer${open ? " is-open" : ""}`}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-label="Site menu"
      >
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={(e) => {
              handleHomeHashNavClick(e, l.href);
              close();
            }}
          >
            {l.label}
          </Link>
        ))}
        <details className="drawer-accordion">
          <summary>All services</summary>
          <div className="drawer-accordion-body">
            {navGroups.map((group) => (
              <details key={group.category} className="drawer-sub">
                <summary>{group.category}</summary>
                <ul className="drawer-sub-list">
                  {group.items.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/${item.slug}`} onClick={close}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </details>
        <a className="jadoo-btn-call drawer-call" href={`tel:${SITE.phoneTel}`}>
          Call {SITE.phoneDisplay}
        </a>
      </div>
      {open ? <button type="button" className="jadoo-drawer-backdrop" aria-label="Close menu" onClick={close} /> : null}
    </>
  );
}
