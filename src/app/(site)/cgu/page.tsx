import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { getSiteSettings } from "@/services/site-settings";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: "Conditions générales d'utilisation du site NIUMBA TRANSFORM.",
};

export default async function CGUPage() {
  const settings = await getSiteSettings();
  const lastUpdated = "29 septembre 2026";

  return (
    <>
      <section className="bg-gradient-to-b from-primary via-primary-dark to-primary-deep text-white">
        <Container className="py-16 md:py-20">
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl md:leading-[1.1]">
            Conditions générales d&apos;utilisation
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-soft md:text-lg">
            Les présentes conditions régissent l&apos;accès et l&apos;utilisation du site
            {settings.companyName}. En naviguant sur ce site, vous les acceptez
            sans réserve.
          </p>
        </Container>
      </section>

      <section className="bg-surface-subtle py-16 md:py-20">
        <Container>
          <div className="max-w-4xl space-y-12">
            {/* Article 1 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">1. Objet du site</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Le site <strong>{settings.companyName}</strong> (ci-après « le Site ») est un site
                vitrine et commercial présentant l&apos;entreprise industrielle
                {settings.companyName}, sa marque {settings.brandName} et ses gammes de produits
                de nettoyage, d&apos;hygiène et d&apos;assainissement fabriqués en République
                Démocratique du Congo.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Le Site permet aux visiteurs de consulter le catalogue produits,
                de prendre contact, de passer commande et de déposer une candidature
                de distributeur.
              </p>
            </article>

            {/* Article 2 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">2. Accès et utilisation</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                L&apos;accès au Site est libre et gratuit. L&apos;utilisateur s&apos;engage à
                l&apos;utiliser conformément aux lois en vigueur, aux présentes CGU et
                aux bonnes mœurs.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {settings.companyName} se réserve le droit de suspendre,
                d&apos;interrompre ou de limiter l&apos;accès à tout ou partie du Site pour
                des raisons de maintenance, de sécurité ou de force majeure, sans
                préavis ni indemnité.
              </p>
            </article>

            {/* Article 3 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">3. Catalogue et informations produits</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Les informations, photographies, caractéristiques et prix présentés
                sur le catalogue sont donnés à titre indicatif. Ils ne constituent
                pas une offre contractuelle au sens juridique.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {settings.companyName} s&apos;efforce d&apos;assurer l&apos;exactitude des
                informations publiées, mais ne peut garantir l&apos;absence d&apos;erreurs,
                d&apos;omissions ou de données obsolètes. Les informations marquées
                <strong>[À CONFIRMER]</strong> sont en attente de validation
                officielle.
              </p>
            </article>

            {/* Article 4 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">4. Commandes et contact</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Les demandes de commande et les formulaires de contact transmettent
                des informations à {settings.companyName} pour traitement
                commercial. Ils n&apos;engagent pas contractuellement l&apos;entreprise
                tant qu&apos;aucun accusé de réception ou confirmation écrite n&apos;a été
                émis.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Les candidatures de distributeur font l&apos;objet d&apos;une étude
                préalable. L&apos;envoi du formulaire ne constitue ni une acceptation
                ni une promesse de contrat de distribution.
              </p>
            </article>

            {/* Article 5 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">5. Propriété intellectuelle</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                L&apos;ensemble des éléments du Site (textes, images, logos, marques,
                vidéos, structure, base de données) est la propriété exclusive de
                {settings.companyName} ou de ses partenaires, et est protégé par
                les lois congolaises et internationales sur la propriété
                intellectuelle.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Toute reproduction, représentation, modification, publication,
                adaptation ou exploitation, totale ou partielle, sans
                autorisation écrite préalable, est strictement interdite et
                constitue une contrefaçon sanctionnée pénalement.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                La marque <strong>BUKHETE</strong> et le nom <strong>NIUMBA
                TRANSFORM</strong> sont des marques déposées ou en cours de
                dépôt. Leur utilisation non autorisée est prohibée.
              </p>
            </article>

            {/* Article 6 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">6. Responsabilité</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {settings.companyName} ne saurait être tenue responsable des
                dommages directs ou indirects (perte de données, perte
                d&apos;exploitation, préjudice commercial, etc.) résultant de
                l&apos;accès au Site, de son utilisation ou de l&apos;impossibilité d&apos;y
                accéder.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                L&apos;utilisateur assume l&apos;entière responsabilité de l&apos;utilisation
                qu&apos;il fait des informations disponibles sur le Site.
                {settings.companyName} ne garantit pas que le Site sera exempt
                d&apos;anomalies, d&apos;erreurs ou de virus, ni que les défauts seront
                corrigés.
              </p>
            </article>

            {/* Article 7 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">7. Liens externes</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Le Site peut contenir des liens vers des sites tiers.
                {settings.companyName} n&apos;exerce aucun contrôle sur ces sites et
                décline toute responsabilité quant à leur contenu, leur
                politique de confidentialité ou leurs pratiques.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                L&apos;existence d&apos;un lien vers un site tiers ne vaut pas validation
                de son contenu. L&apos;utilisateur accède à ces sites sous sa seule
                responsabilité.
              </p>
            </article>

            {/* Article 8 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">8. Modification des CGU</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {settings.companyName} se réserve le droit de modifier les
                présentes CGU à tout moment. La version en ligne prévaudra sur
                toute version antérieure. Les utilisateurs sont invités à les
                consulter régulièrement.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                L&apos;utilisation continue du Site après publication des modifications
                vaut acceptation des nouvelles CGU.
              </p>
            </article>

            {/* Article 9 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">9. Droit applicable et juridiction</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Les présentes CGU sont régies par le droit congolais. En cas de
                litige relatif à leur interprétation ou exécution, les tribunaux
                compétents de Kinshasa (RDC) seront seuls compétents, sous
                réserve des dispositions d&apos;ordre public impératives.
              </p>
            </article>

            {/* Article 10 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">10. Contact</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Pour toute question relative aux présentes CGU, vous pouvez
                contacter {settings.companyName} :
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                <li>Email : {settings.email}</li>
                <li>Téléphone : {settings.phone}</li>
                <li>Adresse : {settings.address}</li>
                <li>
                  <Link
                    href="/contact"
                    className="text-secondary hover:underline"
                  >
                    Formulaire de contact
                  </Link>
                </li>
              </ul>
            </article>

            {/* Dernière mise à jour */}
            <div className="pt-6 border-t border-border-soft">
              <p className="text-sm text-ink-muted">
                Dernière mise à jour : <time dateTime="2026-09-29">{lastUpdated}</time>
              </p>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-secondary-dark transition-colors">
                Retour à l&apos;accueil
              </Link>
              <Link href="/catalogue" className="inline-flex items-center gap-2 rounded-full border-2 border-secondary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary-soft transition-colors">
                Voir le catalogue
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}