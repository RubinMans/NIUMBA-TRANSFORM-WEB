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

function buildIconUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  const base = siteUrl();
  return path.startsWith("http") ? path : `${base}${path}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const assets = await getBrandAssets();

  const faviconUrl = buildIconUrl(assets.faviconPath);
  const logoUrl = buildIconUrl(assets.logoPath);
  const logoSquareUrl = buildIconUrl(assets.logoSquarePath);

  const iconUrl = faviconUrl ?? logoSquareUrl ?? logoUrl;
  const shortcutUrl = faviconUrl ?? logoSquareUrl ?? logoUrl ?? "/favicon.ico";
  const appleUrl = faviconUrl ?? logoSquareUrl ?? logoUrl;

  const ogImageUrl = logoUrl ?? logoSquareUrl ?? faviconUrl;

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
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: `${siteConfig.companyName} — ${siteConfig.brandName}`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      site: "@niumbatransform",
      creator: "@niumbatransform",
      title: siteConfig.companyName,
      description:
        "Entreprise industrielle congolaise — marque BUKHETE de produits de nettoyage, d'hygiène et d'assainissement.",
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    icons: {
      icon: iconUrl ?? "/favicon.ico",
      shortcut: shortcutUrl,
      apple: appleUrl ?? "/apple-touch-icon.png",
    },
    manifest: `${siteUrl()}/manifest.webmanifest`,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface text-ink">{children}</body>
    </html>
  );
}