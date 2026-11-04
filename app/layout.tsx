import type { Metadata } from "next";
import { Volkhov, Poppins } from "next/font/google";
import "./globals.css";
import { HashScroll } from "@/components/HashScroll";
import { StickyCallBar } from "@/components/StickyCallBar";
import { SITE } from "@/lib/site";

const volkhov = Volkhov({ weight: ["700"], subsets: ["latin"], variable: "--font-display" });
const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: `${SITE.name} | Commercial Pressure Washing Canada`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Commercial exterior pressure washing across Canada — storefronts, lots, awnings, and building exteriors. Call 24/7.",
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${volkhov.variable} ${poppins.variable}`}>
      <body>
        <HashScroll />
        {children}
        <StickyCallBar />
      </body>
    </html>
  );
}
