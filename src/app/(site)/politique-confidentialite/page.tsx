import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { getSiteSettings } from "@/services/site-settings";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de NIUMBA TRANSFORM : collecte, utilisation et protection des données.",
};

export default async function PolitiqueConfidentialitePage() {
  const settings = await getSiteSettings();
  const lastUpdated = "29 septembre 2026";

  return (
    <>
      <section className="bg-gradient-to-b from-primary via-primary-dark to-primary-deep text-white">
        <Container className="py-16 md:py-20">
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl md:leading-[1.1]">
            Politique de confidentialité
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-soft md:text-lg">
            {settings.companyName} attache une importance fondamentale à la protection
            de vos données personnelles. La présente politique décrit quelles données
            sont collectées, comment elles sont utilisées et quels sont vos droits.
          </p>
        </Container>
      </section>

      <section className="bg-surface-subtle py-16 md:py-20">
        <Container>
          <div className="max-w-4xl space-y-12">
            {/* Article 1 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">1. Responsable de traitement</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Le responsable de traitement est <strong>{settings.companyName}</strong>,
                entreprise industrielle immatriculée au RCCM sous le numéro
                <strong>{settings.rccm}</strong>, dont le siège social est situé
                <strong>{settings.address}</strong>.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Contact délégué à la protection des données (DPO) :
                <strong>{settings.email}</strong>
              </p>
            </article>

            {/* Article 2 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">2. Données collectées</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Selon votre interaction avec le Site, nous collectons les catégories
                de données suivantes :
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted list-disc list-inside">
                <li><strong>Données d&apos;identification :</strong> nom, prénom, entreprise, fonction (formulaire contact, commande, distributeur).</li>
                <li><strong>Coordonnées :</strong> email, téléphone, adresse postale, numéro WhatsApp.</li>
                <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées, durée de session (via cookies techniques).</li>
                <li><strong>Données commerciales :</strong> produits consultés, quantités demandées, historique des commandes.</li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Les champs obligatoires sont signalés par un astérisque (*) dans les
                formulaires. Le refus de les fournir peut empêcher le traitement de
                votre demande.
              </p>
            </article>

            {/* Article 3 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">3. Formulaires concernés</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted list-disc list-inside">
                <li><strong>Formulaire de contact :</strong> nom, email, téléphone, message.</li>
                <li><strong>Formulaire de commande :</strong> coordonnées complètes, détails de la commande, adresse de livraison.</li>
                <li><strong>Formulaire « Devenir distributeur » :</strong> informations sur l&apos;entreprise, zone géographique, expérience, motivation.</li>
              </ul>
            </article>

            {/* Article 4 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">4. Finalités et bases légales</h2>
              <table className="mt-3 w-full text-sm text-ink-muted">
                <thead>
                  <tr className="border-b border-border-soft">
                    <th className="text-left pb-2 font-semibold text-ink">Finalité</th>
                    <th className="text-left pb-2 font-semibold text-ink">Base légale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft">
                  <tr className="py-2">
                    <td>Répondre aux demandes de contact</td>
                    <td>Intérêt légitime / Consentement</td>
                  </tr>
                  <tr className="py-2">
                    <td>Traiter les commandes et livraisons</td>
                    <td>Exécution de mesures précontractuelles / Contrat</td>
                  </tr>
                  <tr className="py-2">
                    <td>Étudier les candidatures distributeurs</td>
                    <td>Intérêt légitime / Consentement</td>
                  </tr>
                  <tr className="py-2">
                    <td>Améliorer le Site (analytics anonymisés)</td>
                    <td>Intérêt légitime</td>
                  </tr>
                  <tr className="py-2">
                    <td>Respecter les obligations légales</td>
                    <td>Obligation légale</td>
                  </tr>
                </tbody>
              </table>
            </article>

            {/* Article 5 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">5. Conservation des données</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted list-disc list-inside">
                <li><strong>Données de contact / commande :</strong> 3 ans après le dernier contact ou la fin de la relation commerciale.</li>
                <li><strong>Candidatures distributeur :</strong> 2 ans après la dernière interaction (acceptation ou refus).</li>
                <li><strong>Données de navigation (cookies) :</strong> 13 mois maximum (conformément aux recommandations CNIL/équivalent RDC).</li>
                <li><strong>Obligations comptables / fiscales :</strong> 10 ans (factures, contrats).</li>
              </ul>
            </article>

            {/* Article 6 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">6. Sécurité</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {settings.companyName} met en œuvre des mesures techniques et
                organisationnelles appropriées pour protéger les données contre
                la destruction, la perte, l&apos;altération, la divulgation ou l&apos;accès
                non autorisé : chiffrement HTTPS (TLS 1.2+), mots de passe hachés
                (scrypt), sessions HTTP-only, accès administrateur restreint.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Toutefois, aucun système n&apos;offrant une sécurité absolue, nous ne
                pouvons garantir l&apos;absence totale de risque.
              </p>
            </article>

            {/* Article 7 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">7. Vos droits</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Conformément à la réglementation applicable (loi congolaise sur
                la protection des données, RGPD pour les résidents UE), vous
                disposez des droits suivants :
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted list-disc list-inside">
                <li><strong>Accès :</strong> obtenir confirmation et copie de vos données.</li>
                <li><strong>Rectification :</strong> corriger des données inexactes ou incomplètes.</li>
                <li><strong>Effacement :</strong> demander la suppression (sauf obligation légale de conservation).</li>
                <li><strong>Limitation :</strong> geler l&apos;utilisation de vos données.</li>
                <li><strong>Portabilité :</strong> recevoir vos données dans un format structuré.</li>
                <li><strong>Opposition :</strong> vous opposer au traitement pour motifs légitimes.</li>
                <li><strong>Retrait du consentement :</strong> quand le traitement repose sur le consentement.</li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Pour exercer vos droits, contactez-nous à
                <strong>{settings.email}</strong> ou via le
                <Link href="/contact" className="text-secondary hover:underline">
                  formulaire de contact
                </Link>
                . Nous répondrons dans un délai d&apos;un mois (prorogeable de deux
                mois compte tenu de la complexité).
              </p>
            </article>

            {/* Article 8 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">8. Cookies et traceurs</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Le Site utilise des cookies strictement nécessaires à son
                fonctionnement (session, sécurité, préférences de langue). Aucun
                cookie publicitaire ou de suivi tiers n&apos;est déposé sans votre
                consentement.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Vous pouvez configurer votre navigateur pour refuser ou supprimer
                les cookies. La désactivation des cookies techniques peut altérer
                le fonctionnement du Site.
              </p>
            </article>

            {/* Article 9 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">9. Destinataires et transferts</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Vos données sont accessibles aux seules personnes habilitées au
                sein de {settings.companyName} (direction, service commercial,
                support technique). Elles ne sont pas vendues, louées ou cédées
                à des tiers.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Elles peuvent être communiquées à des sous-traitants techniques
                (hébergement, email transactionnel) liés par contrat de
                sous-traitance garantissant un niveau de protection équivalent.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Aucun transfert de données hors RDC n&apos;est effectué à ce jour.
                Si un transfert devenait nécessaire, il ferait l&apos;objet de
                garanties appropriées (clauses contractuelles types, décision
                d&apos;adéquation).
              </p>
            </article>

            {/* Article 10 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">10. Modification de la politique</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                La présente politique peut être modifiée à tout moment. La
                version en ligne fait foi. En cas de modification substantielle,
                une information sera affichée sur le Site.
              </p>
            </article>

            {/* Article 11 */}
            <article>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">11. Contact</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Pour toute question relative à cette politique ou à vos données :
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                <li>Email : {settings.email}</li>
                <li>Courrier : {settings.companyName} — {settings.address}</li>
                <li>
                  <Link href="/contact" className="text-secondary hover:underline">
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