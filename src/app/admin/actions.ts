"use server";

import { destroyCurrentSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await destroyCurrentSession();
  redirect("/admin/connexion");
}