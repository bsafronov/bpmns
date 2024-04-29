"use server";

import { db } from "@/db";
import { professions } from "@/db/schema/professions";
import { revalidatePath } from "next/cache";
import { adminAuth } from "./auth";

export default async function createProfession({ name }: { name: string }) {
  const user = await adminAuth();

  await db.insert(professions).values({
    name,
    createdById: user.id,
  });

  revalidatePath("/admin/professions");
}
