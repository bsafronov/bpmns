"use server";

import { db } from "@/db";
import { ptFields } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { adminAuth } from "./auth";

export const createPtField = async ({
  name,
  ptTemplateId,
}: {
  ptTemplateId: ID;
  name: string;
}) => {
  const user = await adminAuth();

  await db.insert(ptFields).values({
    name,
    createdById: user.id,
    ptTemplateId,
  });

  revalidatePath("/admin/templates/[templateId]/fields", "page");
};
