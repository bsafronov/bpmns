import { z } from "zod";

export const createProfessionSchema = z.object({
  name: z.string({ required_error: "Обязательное поле" }),
});

export type CreateProfessionSchema = z.infer<typeof createProfessionSchema>;
