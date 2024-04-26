"use client";

import { signInSchema } from "@/actions/sign-in/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormController } from "@/components/ui/form-controller";
import { useZodForm } from "@/lib/use-zod-form";

export default function Page() {
  const form = useZodForm(signInSchema, {
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
      </CardHeader>
      <CardContent>
        <FormController form={form}></FormController>
      </CardContent>
    </Card>
  );
}
