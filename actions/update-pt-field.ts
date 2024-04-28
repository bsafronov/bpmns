"use server";

import { db } from "@/db";
import { ptFields } from "@/db/schema";
import { UpdateEntitySchema } from "@/lib/schema/update-entity";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { adminAuth } from "./auth";

export const updatePtField = async ({
  name,
  description,
  published,
  id,
}: UpdateEntitySchema) => {
  const user = await adminAuth();

  await db
    .update(ptFields)
    .set({
      name,
      description,
      published,
      updatedById: user.id,
    })
    .where(eq(ptFields.id, id));

  revalidatePath("/admin/pt-fields/[fieldId]", "page");
};
