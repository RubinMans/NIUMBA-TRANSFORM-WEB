import type { Metadata } from "next";
import { siteConfig, toConfirmMarker } from "@/lib/site";
import { LockIcon, MapPinIcon, WhatsAppIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { DemoForm } from "@/components/site/forms/demo-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contacter NIUMBA TRANSFORM : adresse à Kinshasa, projet industriel de Kimwenza, téléphone, WhatsApp, e-mail et formulaire de contact.",
};

const contactItems = [
  { label: "Adresse", value: siteConfig.address },
  { label: "Site industriel", value: siteConfig.industrialSite },
  { label: "Téléphone", value: siteConfig.phone },
  { label: "E-mail", value: siteConfig.email },
  { label: "WhatsApp", value: siteConfig.whatsapp },
  { label: "Horaires", value: toConfirmMarker },
  { label: "Réseaux sociaux", value: toConfirmMarker },
] as const;

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-primary via-primary-dark to-primary-deep text-white">
        <Container className="pb-12 pt-14 md:pb-16 md:pt-20">
          <Badge variant="accent">Contact</Badge>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl md:leading-[1.1]">
            Contactez {siteConfig.companyName}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-soft md:text-lg">
            Une question, un besoin professionnel, un projet industriel ou un
            partenariat : notre équipe vous répond.
          </p>
        </Container>
      </section>

      <section className="bg-surface-subtle py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-border-soft bg-surface p-6">
                <h2 className="text-lg font-extrabold tracking-tight text-ink">
                  Coordonnées
                </h2>
                <ul className="mt-5 flex flex-col gap-4">
                  {contactItems.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <MapPinIcon
                        width={16}
                        height={16}
                        className="mt-0.5 shrink-0 text-secondary"
                      />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-ink">{item.value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <a
                  href={siteConfig.whatsappLink}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-whatsapp-dark"
                >
                  <WhatsAppIcon width={18} height={18} />
                  Discussion WhatsApp
                </a>
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
                  <LockIcon width={13} height={13} className="mt-0.5 shrink-0 text-secondary" />
                  Les coordonnées téléphoniques et les réseaux sociaux officiels
                  seront ajoutés dès confirmation par l’entreprise.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-border-soft bg-surface p-6 shadow-sm md:p-8">
                <DemoForm
                  submitLabel="Envoyer le message"
                  note="Prévisualisation : le message ne sera transmis qu'à l'activation du backend (mission dédiée)."
                  fields={[
                    { name: "nom", label: "Nom complet", type: "text", placeholder: "Votre nom", required: true },
                    { name: "email", label: "E-mail", type: "email", placeholder: "vous@exemple.com" },
                    { name: "telephone", label: "Téléphone", type: "tel", placeholder: "+243 …" },
                    { name: "sujet", label: "Sujet", type: "text", placeholder: "Motif de votre message", required: true },
                    { name: "message", label: "Message", type: "textarea", placeholder: "Votre message…", required: true },
                  ]}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}