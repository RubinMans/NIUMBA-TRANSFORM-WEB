import { WhatsAppIcon } from "@/lib/icons";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CtaBanner() {
  return (
    <section className="bg-primary text-white">
      <Container className="flex flex-col items-center gap-6 py-16 text-center md:flex-row md:justify-between md:py-20 md:text-left">
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary-soft">
            Le projet se construit mission par mission
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            Prêt à découvrir le catalogue {siteConfig.brandName} ?
          </h2>
          <p className="mt-3 leading-relaxed text-primary-soft">
            Les produits seront progressivement présentés avec leurs photographies et
            informations officielles.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/catalogue" variant="accent" size="lg" withArrow>
            Voir le catalogue
          </Button>
          <Button
            href={siteConfig.whatsappLink}
            variant="whatsapp"
            size="lg"
            className="border border-white/20"
          >
            <WhatsAppIcon width={18} height={18} />
            Nous écrire
          </Button>
        </div>
      </Container>
    </section>
  );
}