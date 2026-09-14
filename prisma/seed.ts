/**
 * Seed NIUMBA TRANSFORM — mission 02.
 *
 * Initialise la base de développement :
 *  - rôles et permissions ;
 *  - catégories officielles (cahier § 13) ;
 *  - produits officiels BUKHETE (cahier § 5) ;
 *  - paramètres du site + identité visuelle (défauts = src/lib/site.ts) ;
 *  - premier administrateur (variables ADMIN_* — jamais aux yeux du visiteur).
 *
 * Exécution : `npm run db:seed`
 */
import { PrismaClient } from "@prisma/client";
import { categories, products } from "../src/data/catalogue";
import { siteConfig } from "../src/lib/site";
import { hashPassword } from "../src/lib/password";

const prisma = new PrismaClient();

const ROLES = [
  {
    key: "SUPER_ADMIN",
    label: "Super administrateur",
    description: "Accès complet au portail et aux paramètres.",
    permissions: JSON.stringify(["*"]),
  },
  {
    key: "REDACTEUR",
    label: "Rédacteur CMS",
    description: "Gestion du contenu : produits, actualités, vidéos, médias.",
    permissions: JSON.stringify(["products.*", "articles.*", "videos.*", "media.*"]),
  },
  {
    key: "COMMERCIAL",
    label: "Responsable commercial",
    description: "Commandes et candidatures distributeurs.",
    permissions: JSON.stringify(["orders.*", "distributors.*"]),
  },
];

async function createRoles() {
  for (const role of ROLES) {
    await prisma.role.upsert({
      where: { key: role.key },
      create: role,
      update: { label: role.label, description: role.description, permissions: role.permissions },
    });
  }
  console.log(`Rôles : ${ROLES.length} prêts`);
}

async function createCategories() {
  for (const [index, category] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      create: {
        slug: category.slug,
        label: category.label,
        description: category.description,
        sortOrder: index,
      },
      update: {
        label: category.label,
        description: category.description,
        sortOrder: index,
      },
    });
  }
  console.log(`Catégories : ${categories.length} prêtes`);
}

async function createProducts() {
  let created = 0;
  let updated = 0;
  for (const [index, product] of products.entries()) {
    const category = await prisma.category.findUnique({
      where: { slug: product.categorySlug },
    });
    const data = {
      name: product.name,
      brand: product.brand,
      categoryId: category?.id ?? null,
      status: product.status,
      active: true,
      shortDescription: product.shortDescription,
      packaging: product.packaging,
      composition: product.composition,
      certifications: product.certifications,
      sortOrder: index,
    };
    const existing = await prisma.product.findUnique({ where: { slug: product.slug } });
    if (existing) {
      await prisma.product.update({ where: { slug: product.slug }, data });
      updated += 1;
    } else {
      await prisma.product.create({ data: { slug: product.slug, ...data } });
      created += 1;
    }
  }
  console.log(`Produits : ${created} créés, ${updated} à jour (${products.length} références officielles)`);
}

async function createSiteSettings() {
  const social = JSON.stringify({
    facebook: siteConfig.social.facebook,
    instagram: siteConfig.social.instagram,
    tiktok: siteConfig.social.tiktok,
  });
  const data = {
    companyName: siteConfig.companyName,
    legalName: siteConfig.legalName,
    brandName: siteConfig.brandName,
    tagline: siteConfig.tagline,
    companyDescription: siteConfig.companyDescription,
    rccm: siteConfig.rccm,
    idNat: siteConfig.idNat,
    nif: siteConfig.nif,
    foundedAt: siteConfig.foundedAt,
    address: siteConfig.address,
    industrialSite: siteConfig.industrialSite,
    phone: siteConfig.phone,
    whatsapp: siteConfig.whatsapp,
    whatsappLink: siteConfig.whatsappLink,
    email: siteConfig.email,
    social,
    designerCredit: siteConfig.designerCredit,
  };
  await prisma.siteSettings.upsert({ where: { id: 1 }, create: { id: 1, ...data }, update: data });
  await prisma.visualIdentity.upsert({ where: { id: 1 }, create: { id: 1 }, update: {} });
  console.log("Paramètres du site + identité visuelle : prêts (défauts officiels)");
}

async function createFirstAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "Administrateur";
  if (!email || !password) {
    console.warn(
      "Aucun ADMIN_EMAIL / ADMIN_PASSWORD défini — premier administrateur NON créé.\n" +
        "  Voir .env.example et le rapport mission 02 pour la procédure exacte.",
    );
    return;
  }
  const passwordHash = await hashPassword(password);
  await prisma.user.upsert({
    where: { email },
    create: { email, passwordHash, name, roleKey: "SUPER_ADMIN", active: true },
    update: { passwordHash, name, roleKey: "SUPER_ADMIN", active: true },
  });
  console.log(`Administrateur "${email}" prêt (Super administrateur).`);
}

async function main() {
  console.log("── Seed NIUMBA TRANSFORM (mission 02) ──");
  await createRoles();
  await createCategories();
  await createProducts();
  await createSiteSettings();
  await createFirstAdmin();
  console.log("── Seed terminé ──");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });