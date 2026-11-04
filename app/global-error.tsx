"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-CA">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: 48, margin: 0 }}>
        <h1 style={{ fontSize: "1.5rem" }}>Application error</h1>
        <p style={{ color: "#5e6282", maxWidth: 480, lineHeight: 1.6 }}>
          Stop the dev server, delete the <code>.next</code> folder, and run{" "}
          <code>npm run dev</code> again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            marginTop: 16,
            padding: "12px 20px",
            background: "#df6951",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
