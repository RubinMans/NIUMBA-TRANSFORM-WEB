import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

/**
 * Hachage des mots de passe — scrypt (node:crypto, aucune dépendance).
 * Format stocké : `scrypt$<salt>$<hash>` (hex).
 * Utilisé par l'authentification serveur ET le script de création du
 * premier administrateur (prisma/seed.ts).
 */

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: string,
  keylen: number,
) => Promise<Buffer>;

const KEYLEN = 64;
const PREFIX = "scrypt";

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = await scryptAsync(password, salt, KEYLEN);
  return `${PREFIX}$${salt}$${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  try {
    const [prefix, salt, hash] = stored.split("$");
    if (prefix !== PREFIX || !salt || !hash) return false;
    const derived = await scryptAsync(password, salt, KEYLEN);
    const expected = Buffer.from(hash, "hex");
    if (derived.length !== expected.length) return false;
    return timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}