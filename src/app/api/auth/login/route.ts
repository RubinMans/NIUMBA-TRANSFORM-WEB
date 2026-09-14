import { NextResponse } from "next/server";
import { authenticateUser, createSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { error: "Veuillez renseigner un identifiant et un mot de passe." },
      { status: 400 },
    );
  }

  const user = await authenticateUser(email, password);
  if (!user) {
    // Message volontairement générique (ne divulgue pas si l'email existe).
    return NextResponse.json(
      { error: "Identifiants incorrects. Vérifiez votre email et votre mot de passe." },
      { status: 401 },
    );
  }

  await createSession(user.id);

  return NextResponse.json({
    ok: true,
    user: {
      name: user.name,
      email: user.email,
      roleLabel: user.roleLabel,
    },
  });
}