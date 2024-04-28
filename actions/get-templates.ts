"use server";

import { db } from "@/db";

export default async function getTemplates() {
  return await db.query.ptTemplates.findMany({
    with: {
      createdBy: true,
      updatedBy: true,
    },
  });
}
