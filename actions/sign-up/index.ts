"use server";

import { db } from "@/db";
import { SignUpSchema } from "./schema";
import { users } from "@/db/schema";
import bcrypt from "bcrypt";

export async function signUp({ username, password }: SignUpSchema) {
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    username,
    hashedPassword,
  });
}
