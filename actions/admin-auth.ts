"use server";

import { getSession } from "@/lib/auth";

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
