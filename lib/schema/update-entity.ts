import { z } from "zod";

export const updateEntitySchema = z.object({
  id: z.number({ required_error: "Обязательное поле" }),
  name: z.string({ required_error: "Обязательное поле" }),
  description: z.string().optional(),
  published: z.boolean().optional(),
});

export type UpdateEntitySchema = z.infer<typeof updateEntitySchema>;
