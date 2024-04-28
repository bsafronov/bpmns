"use server";

import { db } from "@/db";
import { ptTemplates } from "@/db/schema";
import { adminAuth } from "./admin-auth";
import { revalidatePath } from "next/cache";

export default async function createTemplate(name: string) {
  const user = await adminAuth();

  await db.insert(ptTemplates).values({
    createdById: user.id,
    name,
  });

  revalidatePath("/admin/templates");
}
