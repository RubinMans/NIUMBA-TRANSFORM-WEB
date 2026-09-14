import { HomeHero } from "@/components/home/home-hero";
import { BrandIdentity } from "@/components/home/brand-identity";
import { ProductHighlights } from "@/components/home/product-highlights";
import { Roadmap } from "@/components/home/roadmap";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <BrandIdentity />
      <ProductHighlights />
      <Roadmap />
      <CtaBanner />
    </>
  );
}