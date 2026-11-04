import type { MouseEvent } from "react";

export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = hash.replace(/^#/, "");
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior, block: "start" });
}

/** When already on the home page, Next.js Link to /#id often won't scroll. */
export function handleHomeHashNavClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (!href.startsWith("/#")) return;
  if (typeof window === "undefined" || window.location.pathname !== "/") return;
  event.preventDefault();
  const id = href.slice(2);
  window.history.pushState(null, "", `/#${id}`);
  scrollToHash(`#${id}`);
}
