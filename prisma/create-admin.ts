/**
 * Création / mise à jour d'un administrateur (mission 02).
 * Exécution : `npm run db:create-admin`
 *
 * Variables requises : ADMIN_EMAIL, ADMIN_PASSWORD (ADMIN_NAME facultatif).
 * Idempotent : met à jour le mot de passe et le rôle si l'utilisateur existe.
 */
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/password";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "Administrateur";

  if (!email || !password) {
    console.error(
      "ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis.",
    );
    process.exitCode = 1;
    return;
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.upsert({
    where: { email },
    create: { email, passwordHash, name, roleKey: "SUPER_ADMIN", active: true },
    update: { passwordHash, name, roleKey: "SUPER_ADMIN", active: true },
  });
  console.log(`Administrateur prêt : ${user.email} (${name}, Super administrateur)`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });