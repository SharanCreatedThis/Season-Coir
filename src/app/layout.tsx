import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
