"use server";

import { db } from "@/db";
import { ptTemplates } from "@/db/schema";
import { UpdateEntitySchema } from "@/lib/schema/update-entity";
import { revalidatePath } from "next/cache";
import { adminAuth } from "./admin-auth";
import { eq } from "drizzle-orm";

export default async function updateTemplate({
  name,
  description,
  published,
  id,
}: UpdateEntitySchema) {
  const user = await adminAuth();

  await db
    .update(ptTemplates)
    .set({
      name,
      description,
      published,
      updatedById: user.id,
    })
    .where(eq(ptTemplates.id, id));

  revalidatePath("/admin/templates");
}
