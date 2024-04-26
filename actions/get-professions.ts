"use server";

import { db } from "@/db";

export const getProfessions = async () => {
  return await db.query.professions.findMany({
    with: {
      createdBy: true,
      updatedBy: true,
    },
  });
};
