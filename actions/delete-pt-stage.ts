"use server";

import { db } from "@/db";
import { ptStages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deletePtStage = async (id: ID) => {
  const deleted = await db
    .delete(ptStages)
    .where(eq(ptStages.id, id))
    .returning();
  revalidatePath(`/admin/templates/${deleted[0].ptTemplateId}/stages`);
  redirect(`/admin/templates/${deleted[0].ptTemplateId}/stages`);
};
