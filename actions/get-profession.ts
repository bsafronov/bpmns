"use server";

import { db } from "@/db";
import { professions } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getProfession = async (id: ID) => {
  return await db.query.professions.findFirst({
    where: eq(professions.id, id),
    with: {
      createdBy: true,
      updatedBy: true,
    },
  });
};
