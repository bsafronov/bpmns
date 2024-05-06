import { z } from "zod";

export const deletePtStageToPtFieldSchema = z.object({
  ptStageId: z.number({ required_error: "Обязательное поле" }),
  ptFieldId: z.number({ required_error: "Обязательное поле" }),
});

export type DeletePtStageToPtFieldSchema = z.infer<
  typeof deletePtStageToPtFieldSchema
>;
