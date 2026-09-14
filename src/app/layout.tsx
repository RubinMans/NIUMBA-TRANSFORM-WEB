import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig, siteUrl } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${siteConfig.companyName} — Industrie & marque ${siteConfig.brandName}`,
    template: `%s · ${siteConfig.companyName}`,
  },
  description: `${siteConfig.companyName}: entreprise industrielle congolaise de transformation locale. Découvrez la marque ${siteConfig.brandName}, nettoyage, hygiène et assainissement fabriqués en RDC.`,
  applicationName: siteConfig.companyName,
  keywords: [
    "NIUMBA TRANSFORM",
    "BUKHETE",
    "Made in RDC",
    "Kinshasa",
    "nettoyage",
    "hygiène",
    "assainissement",
    "industrie congolaise",
  ],
  openGraph: {
    type: "website",
    locale: "fr_CD",
    siteName: siteConfig.companyName,
    title: siteConfig.companyName,
    description:
      "Entreprise industrielle congolaise — marque BUKHETE de produits de nettoyage, d’hygiène et d’assainissement.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface text-ink">{children}</body>
    </html>
  );
}