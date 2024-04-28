"use server";

import { db } from "@/db";
import { ptTemplates } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function deleteTemplate(id: ID) {
  await db.delete(ptTemplates).where(eq(ptTemplates.id, id));
  revalidatePath("/admin/templates");
}
