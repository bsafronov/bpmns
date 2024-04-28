"use server";

import { db } from "@/db";

export const getPtStages = async () => {
  return await db.query.ptStages.findMany({
    with: {
      createdBy: true,
      updatedBy: true,
    },
  });
};
