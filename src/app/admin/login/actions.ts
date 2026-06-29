"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authenticateAdmin } from "../users/actions";
import { signSession, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/session";

export type LoginResult = { success: boolean; message: string };

async function startSession(user: { id: string; name: string; email: string }) {
  const token = signSession({
    sub: user.id,
    email: user.email,
    name: user.name,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function login(formData: FormData): Promise<LoginResult> {
  const email = ((formData.get("email") as string) ?? "").trim();
  const password = (formData.get("password") as string) ?? "";

  if (!email || !password) {
    return { success: false, message: "Enter your email and password." };
  }

  const user = await authenticateAdmin(email, password);
  if (!user) {
    return { success: false, message: "Invalid email or password." };
  }

  await startSession(user);
  return { success: true, message: "ok" };
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
