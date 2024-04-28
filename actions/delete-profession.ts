"use server";

import { db } from "@/db";
import { professions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function deleteProfession(id: ID) {
  await db.delete(professions).where(eq(professions.id, id));
  revalidatePath("/admin/professions");
}
