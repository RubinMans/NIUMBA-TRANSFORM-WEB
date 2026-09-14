import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/container";

const identities = [
  {
    title: siteConfig.companyName,
    subtitle: "Entreprise & vision industrielle",
    items: [
      "Transformation industrielle locale",
      "Chimie, nettoyage, hygiène, assainissement",
      "Recyclage et valorisation des déchets",
      "Production locale et Made in DRC",
    ],
    dark: true as const,
  },
  {
    title: siteConfig.brandName,
    subtitle: "Marque commerciale de produits",
    items: [
      "Savons, lessives, liquides vaisselle",
      "Eau de Javel, esprit de sel, détergents",
      "Balais écologiques",
      "Formats et informations officiels à confirmer",
    ],
    dark: false as const,
  },
];

export function BrandIdentity() {
  return (
    <section className="bg-surface-subtle py-16 md:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">
            Une hiérarchie de marque claire
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
            {siteConfig.companyName}, l’entreprise. {siteConfig.brandName}, la gamme.
          </h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            Les deux identités restent distinctes : l’entreprise porte l’ambition industrielle,
            la marque porte les produits de nettoyage et d’hygiène.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {identities.map((identity) => (
            <article
              key={identity.title}
              className={
                identity.dark
                  ? "rounded-3xl bg-primary-dark p-8 text-white"
                  : "rounded-3xl border border-border-soft bg-surface p-8 text-ink"
              }
            >
              <p
                className={
                  identity.dark
                    ? "text-sm font-bold uppercase tracking-[0.18em] text-secondary-soft"
                    : "text-sm font-bold uppercase tracking-[0.18em] text-secondary"
                }
              >
                {identity.subtitle}
              </p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight">{identity.title}</h3>
              <ul
                className={
                  identity.dark
                    ? "mt-6 flex flex-col gap-3 text-primary-soft"
                    : "mt-6 flex flex-col gap-3 text-ink-muted"
                }
              >
                {identity.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span
                      className={
                        identity.dark
                          ? "h-2 w-2 shrink-0 rounded-full bg-secondary-soft"
                          : "h-2 w-2 shrink-0 rounded-full bg-secondary"
                      }
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}