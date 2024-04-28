"use client";

import { signIn } from "@/actions/sign-in";
import { signInSchema } from "@/actions/sign-in/schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldController } from "@/components/ui/field-controller";
import { FormController } from "@/components/ui/form-controller";
import { Input } from "@/components/ui/input";
import { useZodForm } from "@/lib/use-zod-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";

export default function Page() {
  const form = useZodForm(signInSchema, {
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: signIn,
    onSuccess: () => toast.success("Успешный вход!"),
  });

  const onSubmit = form.handleSubmit((data) => mutate(data));

  return (
    <Card className="min-w-[320px]">
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
      </CardHeader>
      <CardContent>
        <FormController form={form} onSubmit={onSubmit} submitText="Войти">
          <FieldController
            control={form.control}
            name="username"
            label="Логин"
            required
            render={(props) => <Input {...props} />}
          />
          <FieldController
            control={form.control}
            name="password"
            label="Пароль"
            required
            render={(props) => <Input type="password" {...props} />}
          />
        </FormController>
      </CardContent>
      <CardFooter className="text-xs">
        Нет аккаунта?&nbsp;
        <Link href={"/auth/sign-up"} className="text-blue-500 hover:underline">
          Регистрация
        </Link>
      </CardFooter>
    </Card>
  );
}
