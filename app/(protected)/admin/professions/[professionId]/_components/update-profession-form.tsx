"use client";

import { getProfession } from "@/actions/get-profession";
import { updateProfession } from "@/actions/update-profession";
import { updateProfessionSchema } from "@/actions/update-profession/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldController } from "@/components/ui/field-controller";
import { FormController } from "@/components/ui/form-controller";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useZodForm } from "@/lib/use-zod-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  profession: Return<typeof getProfession>;
};

export const UpdateProfessionForm = ({ profession }: Props) => {
  const form = useZodForm(updateProfessionSchema, {
    defaultValues: {
      professionId: profession.id,
      name: profession.name,
      description: profession.description ?? "",
      published: profession.published,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfession,
    onSuccess: () => {
      toast.success("Информация обновлена!");
    },
  });

  const onSubmit = form.handleSubmit((data) => mutate(data));

  return (
    <FormController
      form={form}
      onSubmit={onSubmit}
      isLoading={isPending}
      submitText="Сохранить"
    >
      <FieldController
        control={form.control}
        name="name"
        label="Название"
        render={(props) => <Input {...props} />}
      />
      <FieldController
        control={form.control}
        name="description"
        label="Описание"
        render={(props) => <Textarea {...props} />}
      />
      <FieldController
        control={form.control}
        name="published"
        label="Опубликовано"
        description="Скрытые профессии не будут отображаться при выборе в общем списке профессий"
        placement="checkbox"
        render={({ value, onChange, ...props }) => (
          <Checkbox checked={value} onCheckedChange={onChange} {...props} />
        )}
      />
    </FormController>
  );
};
