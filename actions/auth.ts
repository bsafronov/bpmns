"use server";
import { sessions, users } from "@/db/schema";
import { DatabaseUserAttributes, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { cache } from "react";

export const getSession = cache(
  async (): Promise<
    | {
        user: Pick<
          typeof users.$inferSelect,
          keyof DatabaseUserAttributes | "id"
        >;
        session: typeof sessions.$inferSelect;
      }
    | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}

    return result;
  },
);

export const adminAuth = async () => {
  const { user } = await getSession();

  if (!user) {
    throw Error("Не авторизован!");
  }

  if (user.role !== "admin") {
    throw Error("Недостаточно прав!");
  }

  return user;
};
