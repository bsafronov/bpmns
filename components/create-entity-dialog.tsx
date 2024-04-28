"use client";

import { useZodForm } from "@/lib/use-zod-form";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import { DialogController } from "./ui/dialog-controller";
import { FieldController } from "./ui/field-controller";
import { FormController } from "./ui/form-controller";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "./ui/button";

const schema = z.object({
  name: z.string({ required_error: "Обязательное поле" }),
});

type Props = {
  action: (name: string) => Promise<void>;
  triggerTitle: string;
  successMessage?: string;
  title?: string;
  description?: string;
};

export default function CreateEntityDialog({
  action,
  successMessage,
  title,
  description,
  triggerTitle,
}: Props) {
  const { value: open, toggle } = useBoolean();

  const form = useZodForm(schema, {
    defaultValues: {
      name: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: action,
    onSuccess: () => {
      form.reset();
      toggle();
      successMessage && toast.success(successMessage);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit = form.handleSubmit((data) => mutate(data.name));

  return (
    <DialogController
      open={open}
      onOpenChange={toggle}
      title={title}
      description={description}
      trigger={<Button>{triggerTitle}</Button>}
    >
      <FormController form={form} onSubmit={onSubmit} submitText="Создать">
        <FieldController
          control={form.control}
          name="name"
          label="Название"
          render={(props) => <Input {...props} />}
        />
      </FormController>
    </DialogController>
  );
}
