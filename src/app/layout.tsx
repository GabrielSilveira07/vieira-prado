import type { Metadata, Viewport } from "next";
import { Manrope, Spectral } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const serif = Spectral({ weight: ["200", "300"], style: ["normal", "italic"], subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Manrope({ weight: ["300", "400", "500"], subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")),
  title: `${site.legalName} · ${site.city}`,
  description: site.description,
  openGraph: { title: site.legalName, description: site.description, images: ["/img/brises.jpg"], locale: "pt_BR", type: "website" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#FAF8F4" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
