"use client";

import { scrollToHash } from "@/lib/hash-nav";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const run = () => {
      if (typeof window === "undefined" || !window.location.hash) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToHash(window.location.hash));
      });
    };

    run();

    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  return null;
}
