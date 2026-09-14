import { PrismaClient } from "@prisma/client";

/**
 * Client Prisma partagé (le singleton évite la multiplication des connexions
 * en développement avec le hot reload de Next.js).
 * Prévu pour l'architecture de données des prochaines missions.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}