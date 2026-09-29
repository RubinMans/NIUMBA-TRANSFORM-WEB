import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirections permanentes (308) — architecture officielle § 6.
  // La page du catalogue BUKHETE est canonique à /catalogue ; l'ancienne
  // route /produits y redirige (SEO, unicité H1 / canonique / sitemap).
  async redirects() {
    return [
      {
        source: "/produits",
        destination: "/catalogue",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;