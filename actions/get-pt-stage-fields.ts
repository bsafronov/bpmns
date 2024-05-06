"use server";

import { db } from "@/db";
import { ptStagesToPtFields } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getPtStageFields = async (id: ID) => {
  return db.query.ptStagesToPtFields.findMany({
    where: eq(ptStagesToPtFields.ptStageId, id),
    with: {
      ptField: true,
    },
  });
};
