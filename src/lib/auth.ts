import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/db/client";
import { verifyPassword } from "@/lib/password";

/**
 * Authentification serveur NIUMBA TRANSFORM (mission 02).
 *
 * Sessions persistées en base (table `sessions`), jeton aléatoire transmis
 * dans un cookie HTTP-only. Aucun secret dans le code client, aucun mot de
 * passe stocké en clair (hachage scrypt, `src/lib/password.ts`).
 */

export const SESSION_COOKIE = "nt_admin_session";
const SESSION_DAYS = 7;

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  roleKey: string;
  roleLabel: string;
  permissions: string[];
};

/** Informations d'utilisateur sûres pour les composants client (sidebar/header). */
export type AdminPanelUser = Pick<AdminUser, "name" | "email" | "roleLabel">;

function sessionHash(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function newToken(): string {
  return randomBytes(32).toString("base64url");
}

export function sessionCookieOptions(maxAge?: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAge ?? SESSION_DAYS * 24 * 60 * 60,
  };
}

/** Crée une session pour un utilisateur et pose le cookie. */
export async function createSession(userId: string): Promise<void> {
  const token = newToken();
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      tokenHash: sessionHash(token),
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, sessionCookieOptions());
}

/** Authentifie un utilisateur (email + mot de passe). Renvoie l'utilisateur ou null. */
export async function authenticateUser(
  email: string,
  password: string,
): Promise<AdminUser | null> {
  const normalized = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalized },
    include: { role: true },
  });
  if (!user || !user.active) return null;

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    roleKey: user.roleKey,
    roleLabel: user.role.label,
    permissions: parsePermissions(user.role.permissions),
  };
}

function parsePermissions(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

/** Retourne l'utilisateur lié à la session courante (ou null). */
export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const session = await prisma.session.findUnique({
      where: { tokenHash: sessionHash(token) },
      include: { user: { include: { role: true } } },
    });
    if (!session) return null;
    if (session.expiresAt.getTime() < Date.now()) return null;
    if (!session.user.active) return null;

    // Prolonge silencieusement la session (mise à jour d'usage).
    await prisma.session.update({
      where: { id: session.id },
      data: { lastUsedAt: new Date() },
    });

    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      roleKey: session.user.roleKey,
      roleLabel: session.user.role.label,
      permissions: parsePermissions(session.user.role.permissions),
    };
  } catch {
    return null;
  }
}

/** Détruit la session courante et retire le cookie. */
export async function destroyCurrentSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (token) {
      await prisma.session.deleteMany({
        where: { tokenHash: sessionHash(token) },
      });
    }
    cookieStore.set(SESSION_COOKIE, "", { ...sessionCookieOptions(0) });
  } catch {
    // Déconnexion en dernière intention : on tente de purger le cookie.
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, "", { ...sessionCookieOptions(0) });
  }
}