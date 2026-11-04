import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="container section" style={{ maxWidth: 560 }}>
        <span className="kicker muted">404</span>
        <h1>Page not found</h1>
        <p className="lead">
          That URL is not on our site. Pick a service or city from the home page, or call
          dispatch for help finding the right page.
        </p>
        <Link className="jadoo-btn-primary" href="/" style={{ marginTop: 16, display: "inline-flex" }}>
          Go to home
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
