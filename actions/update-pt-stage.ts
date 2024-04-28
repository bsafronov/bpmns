"use server";

import { db } from "@/db";
import { ptStages } from "@/db/schema";
import { UpdateEntitySchema } from "@/lib/schema/update-entity";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { adminAuth } from "./auth";

export const updatePtStage = async ({
  name,
  description,
  published,
  id,
}: UpdateEntitySchema) => {
  const user = await adminAuth();

  await db
    .update(ptStages)
    .set({
      name,
      description,
      published,
      updatedById: user.id,
    })
    .where(eq(ptStages.id, id));

  revalidatePath("/admin/pt-stages/[stageId]", "page");
};
