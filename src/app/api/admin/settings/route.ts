import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSiteSettings, type SiteSettingsView } from "@/services/site-settings";
import { prisma } from "@/db/client";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  const settings = await getSiteSettings();
  return NextResponse.json({ settings });
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

  const data: Record<string, unknown> = {};
  const stringFields: (keyof SiteSettingsView)[] = [
    "companyName",
    "legalName",
    "brandName",
    "tagline",
    "companyDescription",
    "rccm",
    "idNat",
    "nif",
    "foundedAt",
    "address",
    "industrialSite",
    "phone",
    "whatsapp",
    "whatsappLink",
    "email",
    "horaires",
    "designerCredit",
  ];

  for (const field of stringFields) {
    if (field in body) {
      const val = typeof body[field] === "string" ? (body[field] as string).trim() : null;
      data[field] = val || null;
    }
  }

  if (body.social && typeof body.social === "object") {
    data.social = JSON.stringify(body.social);
  }

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: { id: 1, ...data },
    update: data,
  });

  return NextResponse.json({ ok: true });
}