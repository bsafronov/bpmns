"use server";

import { db } from "@/db";
import { professions } from "@/db/schema";
import { UpdateEntitySchema } from "@/lib/schema/update-entity";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { adminAuth } from "./auth";

export default async function updateProfession({
  name,
  description,
  published,
  id,
}: UpdateEntitySchema) {
  const user = await adminAuth();

  await db
    .update(professions)
    .set({
      updatedById: user.id,
      name,
      description,
      published,
    })
    .where(eq(professions.id, id));

  revalidatePath("/admin/professions");
}
