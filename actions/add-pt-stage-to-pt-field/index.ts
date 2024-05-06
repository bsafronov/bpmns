"use server";

import { db } from "@/db";
import { AddPtStageToPtFieldSchema } from "./schema";
import { ptStagesToPtFields } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const addPtStageToPtField = async ({
  ptFieldId,
  ptStageId,
}: AddPtStageToPtFieldSchema) => {
  await db.insert(ptStagesToPtFields).values({
    ptStageId,
    ptFieldId,
  });

  revalidatePath("/admin/pt-stages/[stageId]/fields", "page");
};
