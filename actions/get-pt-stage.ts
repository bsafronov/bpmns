"use server";

import { db } from "@/db";
import { ptStages } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getPtStage = async (id: ID) => {
  return await db.query.ptStages.findFirst({
    where: eq(ptStages.id, id),
    with: {
      createdBy: true,
      updatedBy: true,
    },
  });
};
