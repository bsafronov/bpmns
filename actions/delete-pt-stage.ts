"use server";

import { db } from "@/db";
import { ptStages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deletePtStage = async (id: ID) => {
  await db.delete(ptStages).where(eq(ptStages.id, id));
  revalidatePath("/admin/templates/");
};
