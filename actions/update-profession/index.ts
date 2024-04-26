"use server";

import { db } from "@/db";
import { UpdateProfessionSchema } from "./schema";
import { professions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { adminAuth } from "../admin-auth";
import { revalidatePath } from "next/cache";

export const updateProfession = async ({
  professionId,
  name,
  description,
  published,
}: UpdateProfessionSchema) => {
  const users = await adminAuth();

  await db
    .update(professions)
    .set({
      name,
      description,
      updatedById: users.id,
      published,
    })
    .where(eq(professions.id, professionId));

  revalidatePath("/admin/professions");
  // revalidatePath("/admin/professions/[professionId]", "page");
};
