import { z } from "zod";

export const signInSchema = z.object({
  username: z.string({ required_error: "Обязательное поле" }),
  password: z.string({ required_error: "Обязательное поле" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
