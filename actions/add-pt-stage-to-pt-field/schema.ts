import { z } from "zod";

export const addPtStageToPtFieldSchema = z.object({
  ptStageId: z.number({ required_error: "Обязательное поле" }),
  ptFieldId: z.number({ required_error: "Обязательное поле" }),
});

export type AddPtStageToPtFieldSchema = z.infer<
  typeof addPtStageToPtFieldSchema
>;
