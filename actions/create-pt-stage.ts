"use server";

import { db } from "@/db";
import { adminAuth } from "./auth";
import { ptStages } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const createPtStage = async ({
  name,
  ptTemplateId,
}: {
  ptTemplateId: ID;
  name: string;
}) => {
  const user = await adminAuth();

  await db.insert(ptStages).values({
    name,
    createdById: user.id,
    ptTemplateId,
  });

  revalidatePath("/admin/templates/[templateId]/stages", "page");
};
