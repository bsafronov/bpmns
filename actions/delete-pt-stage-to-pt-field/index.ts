"use server";

import { db } from "@/db";
import { DeletePtStageToPtFieldSchema } from "./schema";
import { ptStagesToPtFields } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deletePtStageToPtField = async ({
  ptFieldId,
  ptStageId,
}: DeletePtStageToPtFieldSchema) => {
  await db
    .delete(ptStagesToPtFields)
    .where(
      and(
        eq(ptStagesToPtFields.ptFieldId, ptFieldId),
        eq(ptStagesToPtFields.ptStageId, ptStageId),
      ),
    );

  revalidatePath("/admin/pt-stages/[stageId]/fields", "page");
};
