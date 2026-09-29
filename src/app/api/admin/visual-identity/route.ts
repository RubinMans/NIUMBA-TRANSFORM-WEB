import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/db/client";

export const runtime = "nodejs";

/**
 * API identité visuelle (mission 02.9).
 * Gère les logos officiels (couleur, blanc, noir, carré) et le favicon :
 * les chemins publics renseignés ici sont utilisés par le site public dès
 * l'enregistrement (propagation immédiate — revalidation des routes).
 */

type IdentityPatch = {
  logoPath?: string | null;
  logoDarkPath?: string | null;
  logoBlackPath?: string | null;
  logoSquarePath?: string | null;
  faviconPath?: string | null;
};

function cleanPath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!trimmed.startsWith("/") || trimmed.includes("..")) return null;
  return trimmed;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  const row = await prisma.visualIdentity.findUnique({ where: { id: 1 } });
  return NextResponse.json({
    identity: {
      logoPath: row?.logoPath ?? null,
      logoDarkPath: row?.logoDarkPath ?? null,
      logoBlackPath: row?.logoBlackPath ?? null,
      logoSquarePath: row?.logoSquarePath ?? null,
      faviconPath: row?.faviconPath ?? null,
    },
  });
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const fields: (keyof IdentityPatch)[] = [
    "logoPath",
    "logoDarkPath",
    "logoBlackPath",
    "logoSquarePath",
    "faviconPath",
  ];

  const data: Record<string, unknown> = {};
  for (const field of fields) {
    if (field in body) data[field] = cleanPath(body[field]);
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Aucun champ d'identité à enregistrer." }, { status: 400 });
  }

  await prisma.visualIdentity.upsert({
    where: { id: 1 },
    create: { id: 1, ...data },
    update: data,
  });

  // Propagation immédiate sur le site public (layout = logo header/footer).
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}