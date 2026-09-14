import type { Metadata } from "next";
import { products, toConfirm } from "@/data/catalogue";
import { siteConfig } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DemoForm } from "@/components/site/forms/demo-form";

export const metadata: Metadata = {
  title: "Passer une commande",
  description:
    "Commandez les produits BUKHETE : produits, quantités et coordonnées. Transmission simple et rapide vers l'entreprise.",
};

const readyProducts = products.filter((product) => product.status === "Publié");

const steps = [
  { title: "Choisissez vos produits", text: "Sélectionnez un ou plusieurs produits BUKHETE." },
  { title: "Précisez les quantités", text: "Quantités, localité de livraison, commentaires." },
  { title: "Transmission officielle", text: "Envoi de la commande via WhatsApp (à activer)." },
] as const;

export default function CommanderPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-primary via-primary-dark to-primary-deep text-white">
        <Container className="pb-12 pt-14 md:pb-16 md:pt-20">
          <Badge variant="accent">Commande</Badge>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl md:leading-[1.1]">
            Passer une commande {siteConfig.brandName}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-soft md:text-lg">
            Commandez en quelques étapes : produits, quantités, coordonnées. La
            transmission officielle sera effective dès confirmation des coordonnées
            de l’entreprise.
          </p>
        </Container>
      </section>

      <section className="bg-surface-subtle py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <ol className="flex flex-col gap-5">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-base font-bold text-ink">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 rounded-2xl border border-border-soft bg-surface p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                  Coordonnées officielles
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Téléphone et WhatsApp officiels : <span className="font-semibold text-ink">{toConfirm}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Essai : les boutons « WhatsApp » du site restent désactivés jusqu’à la
                  confirmation du numéro officiel.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-border-soft bg-surface p-6 shadow-sm md:p-8">
                <DemoForm
                  submitLabel="Envoyer ma commande"
                  note="Prévisualisation : aucune donnée n'est transmise à ce stade. La transmission réelle sera activée dans la mission backend."
                  fields={[
                    {
                      name: "produit",
                      label: "Produit",
                      type: "select",
                      options: [
                        ...readyProducts.map((product) => product.name),
                        ...products.filter((p) => p.status !== "Publié").map((p) => `${p.name} (bientôt disponible)`),
                      ],
                      required: true,
                    },
                    { name: "quantite", label: "Quantité", type: "text", placeholder: "Ex. : 5 cartons, 20 unités", required: true },
                    { name: "nom", label: "Nom complet", type: "text", placeholder: "Votre nom", required: true },
                    { name: "telephone", label: "Téléphone", type: "tel", placeholder: "+243 …", required: true },
                    { name: "whatsapp", label: "Numéro WhatsApp (si différent)", type: "tel", placeholder: "+243 …" },
                    { name: "adresse", label: "Adresse / localité", type: "text", placeholder: "Ville, commune, quartier", required: true },
                    { name: "commentaires", label: "Commentaires", type: "textarea", placeholder: "Précisions utiles à votre commande…" },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="/produits" variant="ghost">
              Retour au catalogue
            </Button>
            <Button href="/devenir-distributeur" variant="ghost">
              Devenir distributeur
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}