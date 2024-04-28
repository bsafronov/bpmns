"use server";

import { db } from "@/db";
import { ptTemplates } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { adminAuth } from "./auth";

export default async function createTemplate(name: string) {
  const user = await adminAuth();

  await db.insert(ptTemplates).values({
    createdById: user.id,
    name,
  });

  revalidatePath("/admin/templates");
}
