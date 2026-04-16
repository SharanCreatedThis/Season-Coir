import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getOrganizationSchema, getLocalBusinessSchema } from "@/lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seasoncoir.vercel.app"),
  title: "Season Coir — Premium Coir Products from Kerala since 1980",
  description:
    "Season Coir Exports — B2B manufacturer and exporter of eco-friendly, GI-tagged Alleppey coir mats. Supplying UAE, Europe and beyond since 1980.",
  keywords: ["coir mats", "Kerala coir", "Alleppey coir", "eco-friendly mats", "coir exporter India"],
  openGraph: {
    title: "Season Coir — Premium Coir Products from Kerala",
    description: "GI-tagged Alleppey coir. Exported globally since 1980.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema()) }}
        />
      </head>
      <body className="min-h-[100svh] supports-[min-height:100svh]:min-h-[100svh] flex flex-col antialiased pb-[env(safe-area-inset-bottom)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
