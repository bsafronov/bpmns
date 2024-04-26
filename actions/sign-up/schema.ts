import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z.string({ required_error: "Обязательное поле" }),
    password: z.string({ required_error: "Обязательное поле" }),
    confirmPassword: z.string({ required_error: "Обязательное поле" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Пароли не совпадают",
      });
    }
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
