import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z.string({ required_error: "Обязательное поле" }),
    password: z.string({ required_error: "Обязательное поле" }),
    re_password: z.string({ required_error: "Обязательное поле" }),
  })
  .superRefine(({ password, re_password }, ctx) => {
    if (password !== re_password) {
      ctx.addIssue({
        code: "custom",
        path: ["re_password"],
        message: "Пароли не совпадают",
      });
    }
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
