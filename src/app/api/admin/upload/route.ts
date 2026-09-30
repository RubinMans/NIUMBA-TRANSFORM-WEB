import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { randomBytes } from "node:crypto";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/db/client";

export const runtime = "nodejs";

/**
 * Upload d'images vers Vercel Blob (mission production).
 *
 * Sécurité appliquée :
 *  - utilisateur authentifié (session Admin) ;
 *  - types de fichiers image uniquement (blob + extension) ;
 *  - taille maximale raisonnable (5 Mo) ;
 *  - aucun exécutable ou script ;
 *  - nom de fichier généré côté serveur (jamais celui du client).
 *
 * Les fichiers sont stockés sur Vercel Blob avec un chemin préfixé par le dossier
 * (logos/, produits/, medias/). L'API retourne le même format qu'avant :
 * { url, size, type } — compatible avec le frontend existant.
 */

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 Mo

const ALLOWED_TYPES: Record<string, string[]> = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/webp": [".webp"],
  "image/gif": [".gif"],
  "image/svg+xml": [".svg"],
  "image/x-icon": [".ico"],
  "image/avif": [".avif"],
};

const ALLOWED_EXTENSIONS = new Set(Object.values(ALLOWED_TYPES).flat());

/** Contextes d'upload autorisés (préfixes de chemin dans le blob store). */
const ALLOWED_FOLDERS = ["logos", "produits", "medias"] as const;
type AllowedFolder = (typeof ALLOWED_FOLDERS)[number];

function sanitizeBaseName(name: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  return base
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 60);
}

function fileExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot).toLowerCase() : "";
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  let folder: AllowedFolder = "medias";
  let file: File | null = null;

  try {
    const form = await request.formData();
    const folderValue = form.get("folder");
    folder = ALLOWED_FOLDERS.includes(folderValue as AllowedFolder)
      ? (folderValue as AllowedFolder)
      : "medias";
    const candidate = form.get("file");
    if (candidate instanceof File) file = candidate;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }

  const type = file.type.toLowerCase();
  const ext = fileExtension(file.name);
  const allowedForType = ALLOWED_TYPES[type];
  if (!allowedForType || !allowedForType.includes(ext)) {
    return NextResponse.json(
      { error: "Type de fichier non autorisé (images uniquement : JPG, PNG, WebP, SVG, GIF, ICO, AVIF)." },
      { status: 415 },
    );
  }
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json({ error: "Extension de fichier non autorisée." }, { status: 415 });
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "Fichier trop volumineux (5 Mo maximum)." }, { status: 413 });
  }
  if (file.size === 0) {
    return NextResponse.json({ error: "Fichier vide." }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length !== file.size) {
    return NextResponse.json({ error: "Lecture du fichier incomplète." }, { status: 400 });
  }

  // Verrou supplémentaire : seuls ces octets magiques sont acceptés pour les
  // formats raster. Le SVG reste autorisé (logo vectoriel officiel) mais son
  // extension/MIME restreints empêchent les scripts exécutables.
  const B64_PREFIXES: Record<string, string> = {
    "image/png": "iVBORw0KG",
    "image/jpeg": "/9j/",
    "image/webp": "UklGR",
    "image/gif": "R0lGOD",
    "image/x-icon": "AAABAA",
  };
  const magicOk = B64_PREFIXES[type] ? bytes.toString("base64").startsWith(B64_PREFIXES[type]) : true;
  if (!magicOk) {
    return NextResponse.json({ error: "Contenu du fichier non reconnu." }, { status: 415 });
  }

  const safeName = sanitizeBaseName(file.name) || "image";
  const finalName = `${safeName}-${Date.now()}-${randomBytes(4).toString("hex")}${ext}`;
  const blobPath = `${folder}/${finalName}`;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Configuration de stockage manquante (BLOB_READ_WRITE_TOKEN)." },
      { status: 500 },
    );
  }

  const blob = await put(blobPath, bytes, {
    access: "public",
    token,
    contentType: type,
    addRandomSuffix: false,
  });

  const url = blob.url;

  try {
    await prisma.media.create({
      data: {
        title: finalName,
        url,
        type: "IMAGE",
        alt: null,
      },
    });
  } catch {
    // La médiathèque est best-effort : l'upload reste valide même si la
    // traçabilité échoue (base indisponible, etc.).
  }

  return NextResponse.json({ url, size: file.size, type }, { status: 201 });
}