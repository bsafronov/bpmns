"use server";

import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { getSession } from "./auth";

export async function signOut() {
  const { session } = await getSession();

  if (!session) {
    throw Error("Не авторизован");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
}
