"use server";

import { db } from "@/db";
import { CreateProfessionSchema } from "./schema";
import { professions } from "@/db/schema/professions";
import { adminAuth } from "../admin-auth";
import { revalidatePath } from "next/cache";

export const createProfession = async ({ name }: CreateProfessionSchema) => {
  const user = await adminAuth();

  await db.insert(professions).values({
    name,
    createdById: user.id,
  });

  revalidatePath("/admin/professions");
};
