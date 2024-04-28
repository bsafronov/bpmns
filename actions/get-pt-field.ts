"use server";

import { db } from "@/db";
import { ptFields } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getPtField = async (id: ID) => {
  return await db.query.ptFields.findFirst({
    where: eq(ptFields.id, id),
    with: {
      createdBy: true,
      updatedBy: true,
    },
  });
};
