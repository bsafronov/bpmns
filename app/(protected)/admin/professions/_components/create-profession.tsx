"use client";

import { createProfession } from "@/actions/create-profession";
import { createProfessionSchema } from "@/actions/create-profession/schema";
import { Button } from "@/components/ui/button";
import { DialogController } from "@/components/ui/dialog-controller";
import { FieldController } from "@/components/ui/field-controller";
import { FormController } from "@/components/ui/form-controller";
import { Input } from "@/components/ui/input";
import { useZodForm } from "@/lib/use-zod-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";

export default function CreateProfession() {
  const { value: open, toggle } = useBoolean();
  const form = useZodForm(createProfessionSchema, {
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createProfession,
    onSuccess: () => {
      form.reset();
      toast.success("Успешно!");
      toggle();
    },
  });

  const onSubmit = form.handleSubmit((data) => mutate(data));

  return (
    <DialogController
      open={open}
      onOpenChange={toggle}
      trigger={<Button>Создать профессию</Button>}
      title="Профессия"
      description="Создание профессии"
    >
      <FormController
        form={form}
        submitText="Создать"
        onSubmit={onSubmit}
        isLoading={isPending}
      >
        <FieldController
          control={form.control}
          name="name"
          label="Название"
          required
          render={(props) => <Input {...props} />}
        />
      </FormController>
    </DialogController>
  );
}
