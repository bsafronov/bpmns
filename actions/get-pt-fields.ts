"use server";

import { db } from "@/db";
import { ptFields } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getPtFields = async ({ templateId }: { templateId: ID }) => {
  return await db.query.ptFields.findMany({
    where: eq(ptFields.ptTemplateId, templateId),
    with: {
      createdBy: true,
      updatedBy: true,
    },
  });
};
