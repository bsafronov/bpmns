"use server";

import { db } from "@/db";
import { ptFields } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deletePtField = async (id: ID) => {
  const deleted = await db
    .delete(ptFields)
    .where(eq(ptFields.id, id))
    .returning();
  revalidatePath(`/admin/templates/${deleted[0].ptTemplateId}/fields`);
};
