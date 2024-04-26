import { z } from "zod";

export const updateProfessionSchema = z.object({
  professionId: z.number({ required_error: "Обязательное поле" }),
  name: z.string().optional(),
  description: z.string().optional(),
  published: z.boolean().optional(),
});

export type UpdateProfessionSchema = z.infer<typeof updateProfessionSchema>;
