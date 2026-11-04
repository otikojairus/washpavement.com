"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container" style={{ padding: "96px 16px", maxWidth: 560 }}>
      <span className="kicker">Something went wrong</span>
      <h1>We could not load this page</h1>
      <p style={{ color: "var(--text)", lineHeight: 1.65 }}>
        If you are in local development, stop the dev server, run{" "}
        <code>rm -rf .next</code>, then <code>npm run dev</code> again. Stale build
        cache often causes this after big updates.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
        <button type="button" className="jadoo-btn-primary" onClick={() => reset()}>
          Try again
        </button>
        <Link className="jadoo-btn-ghost" href="/">
          Back to home
        </Link>
      </div>
    </main>
  );
}
