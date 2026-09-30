import type { MetadataRoute } from "next";
import {
  footerNavigation,
  footerLegalLinks,
  mainNavigation,
} from "@/data/navigation";
import { categories, products } from "@/data/catalogue";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const routes = new Set([
    "/",
    ...mainNavigation.map((item) => item.href),
    ...footerNavigation.map((item) => item.href),
    ...footerLegalLinks.map((item) => item.href),
    "/cgu",
    "/politique-confidentialite",
    ...categories.map((category) => `/categorie/${category.slug}`),
    ...products.map((product) => `/produit/${product.slug}`),
  ]);

  return [...routes].map((route) => ({
    url: `${base}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.6,
  }));
}