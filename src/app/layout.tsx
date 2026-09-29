import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig, siteUrl } from "@/lib/site";
import { getBrandAssets } from "@/services/site-settings";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const assets = await getBrandAssets();
  const faviconPath = assets.faviconPath ?? "/favicon.ico";
  const iconPath = assets.logoSquarePath ?? assets.logoPath ?? "/icon.svg";

  return {
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
        "Entreprise industrielle congolaise — marque BUKHETE de produits de nettoyage, d'hygiène et d'assainissement.",
    },
    icons: {
      icon: iconPath,
      shortcut: faviconPath,
      apple: iconPath,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface text-ink">{children}</body>
    </html>
  );
}