import Link from "next/link";
import { ArrowRightIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

const roadmap = [
  {
    title: "Catalogue BUKHETE",
    text: "Recherche, filtres et fiches produits avec photos officielles.",
    href: "/catalogue",
  },
  {
    title: "Commandes",
    text: "Formulaire de commande et transmission via WhatsApp.",
    href: "/commander",
  },
  {
    title: "Distributeurs",
    text: "Demandes de partenariat et réseau de distribution.",
    href: "/devenir-distributeur",
  },
  {
    title: "Vidéos & Actualités",
    text: "Démonstrations, reportages et nouvelles de l’entreprise.",
    href: "/videos",
  },
  {
    title: "Administration",
    text: "Espace sécurisé de gestion des contenus.",
    href: "/admin",
  },
  {
    title: "Paiement en ligne",
    text: "Mobile Money et suivi des commandes (phase e-commerce).",
    href: "/commander",
  },
] as const;

export function Roadmap() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Badge variant="tertiary">Développement en cours</Badge>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
              Les prochaines étapes du site
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              Cette première version confirme l’environnement technique et l’identité visuelle.
              Les modules ci-dessous seront livrés mission par mission.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-secondary-dark"
          >
            Une question sur le projet ?
            <ArrowRightIcon width={16} height={16} />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roadmap.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-border-soft bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-secondary-soft hover:shadow-[0_12px_24px_-6px_rgba(14,75,42,0.12)]"
            >
              <div className="flex items-center justify-between">
                <span className="h-2 w-2 rounded-full bg-tertiary" />
                <ArrowRightIcon
                  width={18}
                  height={18}
                  className="text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-secondary"
                />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.text}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}