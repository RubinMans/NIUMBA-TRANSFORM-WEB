import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { FactoryIcon, MapPinIcon, RecyclingIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DemoForm } from "@/components/site/forms/demo-form";

export const metadata: Metadata = {
  title: "Devenir distributeur",
  description:
    "Rejoignez le réseau de distribution BUKHETE en République démocratique du Congo : envoyez votre candidature NIUMBA TRANSFORM.",
};

const advantages = [
  {
    icon: FactoryIcon,
    title: "Production locale",
    text: "L’accès à la production BUKHETE assurée par une entreprise congolaise.",
  },
  {
    icon: MapPinIcon,
    title: "Couverture nationale",
    text: "Construction progressive d’un réseau de distribution sur tout le territoire.",
  },
  {
    icon: RecyclingIcon,
    title: "Marque en croissance",
    text: "Une gamme en développement constant, adaptée aux réalités locales.",
  },
] as const;

export default function DevenirDistributeurPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-primary via-primary-dark to-primary-deep text-white">
        <Container className="pb-12 pt-14 md:pb-16 md:pt-20">
          <Badge variant="accent">Partenariat</Badge>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl md:leading-[1.1]">
            Devenir distributeur {siteConfig.brandName}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-soft md:text-lg">
            Rejoignez le réseau de distribution de la marque {siteConfig.brandName}
            et participez au développement d’une industrie congolaise de
            l’hygiène et de l’entretien.
          </p>
        </Container>
      </section>

      <section className="bg-surface-subtle py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="grid grid-cols-1 gap-4">
                {advantages.map((advantage) => (
                  <div
                    key={advantage.title}
                    className="flex items-start gap-4 rounded-2xl border border-border-soft bg-surface p-5"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-secondary">
                      <advantage.icon width={22} height={22} />
                    </span>
                    <div>
                      <p className="text-base font-bold text-ink">{advantage.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                        {advantage.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-border-soft bg-surface p-6 shadow-sm md:p-8">
                <DemoForm
                  submitLabel="Envoyer ma candidature"
                  note="Prévisualisation : votre candidature ne sera enregistrée qu'à l'activation du backend (mission dédiée)."
                  fields={[
                    { name: "nom", label: "Nom complet", type: "text", placeholder: "Votre nom", required: true },
                    { name: "entreprise", label: "Entreprise / magasin", type: "text", placeholder: "Raison sociale" },
                    { name: "telephone", label: "Téléphone", type: "tel", placeholder: "+243 …", required: true },
                    { name: "whatsapp", label: "Numéro WhatsApp", type: "tel", placeholder: "+243 …" },
                    { name: "adresse", label: "Adresse", type: "text", placeholder: "Adresse physique" },
                    { name: "localite", label: "Localité", type: "text", placeholder: "Ville, commune, quartier", required: true },
                    { name: "activite", label: "Activité principale", type: "text", placeholder: "Ex. : épicerie, supermarché, grossiste…" },
                    { name: "zone", label: "Zone de distribution souhaitée", type: "text", placeholder: "Province, ville, commune…", required: true },
                    { name: "message", label: "Message", type: "textarea", placeholder: "Présentez votre projet de distribution…" },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="/contact" variant="ghost">
              Contacter l’entreprise
            </Button>
            <Button href="/catalogue" variant="ghost">
              Découvrir le catalogue
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}