"use client";

import { signUp } from "@/actions/sign-up";
import { signUpSchema } from "@/actions/sign-up/schema";
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
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const form = useZodForm(signUpSchema, {
    defaultValues: {
      username: "",
      password: "",
      re_password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => router.push("/auth/sign-in"),
  });

  const onSubmit = form.handleSubmit((data) => mutate(data));

  return (
    <Card className="min-w-[320px]">
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
      </CardHeader>
      <CardContent>
        <FormController
          form={form}
          onSubmit={onSubmit}
          submitText="Зарегистрироваться"
        >
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
          <FieldController
            control={form.control}
            name="re_password"
            label="Повторите пароль"
            required
            render={(props) => <Input type="password" {...props} />}
          />
        </FormController>
      </CardContent>
      <CardFooter className="text-xs">
        Есть аккаунт?&nbsp;
        <Link href={"/auth/sign-in"} className="text-blue-500 hover:underline">
          Войти
        </Link>
      </CardFooter>
    </Card>
  );
}
