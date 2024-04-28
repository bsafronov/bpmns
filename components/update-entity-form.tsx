"use client";

import {
  UpdateEntitySchema,
  updateEntitySchema,
} from "@/lib/schema/update-entity";
import { EntityInitialValues } from "@/lib/types";
import { useZodForm } from "@/lib/use-zod-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";
import { FieldController } from "./ui/field-controller";
import { FormController } from "./ui/form-controller";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type Props = {
  action: (values: UpdateEntitySchema) => Promise<void>;
  initialValues: EntityInitialValues;
  onSuccessMessage?: string;
};

export default function UpdateEntityForm({
  action,
  initialValues,
  onSuccessMessage,
}: Props) {
  const form = useZodForm(updateEntitySchema, {
    defaultValues: {
      id: initialValues.id,
      name: initialValues.name,
      description: initialValues.description ?? "",
      published: initialValues.published,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: action,
    onSuccess: () => {
      toast.success(onSuccessMessage ?? "Информация обновлена");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    // If the data hasn't changed, do nothing
    if (JSON.stringify(initialValues) === JSON.stringify(data)) {
      return;
    }

    mutate(data);
  });

  return (
    <FormController
      form={form}
      onSubmit={onSubmit}
      submitText="Сохранить"
      isLoading={isPending}
    >
      <FieldController
        control={form.control}
        name="name"
        label="Название"
        required
        render={(props) => <Input {...props} />}
      />
      <FieldController
        control={form.control}
        name="description"
        label="Описание"
        render={(props) => <Textarea {...props} minRows={5} />}
      />
      <FieldController
        control={form.control}
        name="published"
        label="Опубликовано"
        placement="checkbox"
        render={({ value, onChange, ...props }) => (
          <Checkbox
            {...props}
            checked={value ?? false}
            onCheckedChange={onChange}
          />
        )}
      />
    </FormController>
  );
}
