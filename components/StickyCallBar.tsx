"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

export function StickyCallBar() {
  const [visible, setVisible] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!mobile) return;
    const onScroll = () => setVisible(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobile]);

  if (!mobile) return null;

  return (
    <div className={`mobile-call-bar${visible ? " is-visible" : ""}`}>
      <a href={`tel:${SITE.phoneTel}`}>Call {SITE.phoneDisplay}</a>
    </div>
  );
}
