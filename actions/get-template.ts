"use server";

import { db } from "@/db";
import { ptTemplates } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function getTemplate(id: ID) {
  return await db.query.ptTemplates.findFirst({
    where: eq(ptTemplates.id, id),
    with: {
      createdBy: true,
      updatedBy: true,
    },
  });
}
