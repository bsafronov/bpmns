"use server";

import { db } from "@/db";
import { lucia } from "@/lib/auth";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { SignInSchema } from "./schema";

export async function signIn({ username, password }: SignInSchema) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });

  if (!user) {
    throw new Error("Пользователь не найден");
  }

  const isValidPassword = await bcrypt.compare(password, user.hashedPassword);

  if (!isValidPassword) {
    throw new Error("Неверные имя пользователя или пароль");
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
}
