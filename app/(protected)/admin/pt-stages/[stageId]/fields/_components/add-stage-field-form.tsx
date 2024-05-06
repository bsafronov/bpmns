"use client";

import { addPtStageToPtField } from "@/actions/add-pt-stage-to-pt-field";
import { addPtStageToPtFieldSchema } from "@/actions/add-pt-stage-to-pt-field/schema";
import { getPtFields } from "@/actions/get-pt-fields";
import { Badge } from "@/components/ui/badge";
import { FieldController } from "@/components/ui/field-controller";
import { FormController } from "@/components/ui/form-controller";
import { Select } from "@/components/ui/select";
import { fieldTypeTranslates } from "@/lib/consts";
import { useZodForm } from "@/lib/use-zod-form";
import { useMutation } from "@tanstack/react-query";

type Props = {
  stageId: ID;
  remainFields: Return<typeof getPtFields>;
};
export const AddStageFieldForm = ({ stageId, remainFields }: Props) => {
  const form = useZodForm(addPtStageToPtFieldSchema, {
    defaultValues: {
      ptStageId: stageId,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addPtStageToPtField,
    onSuccess: () => form.reset(),
  });
  const onSubmit = form.handleSubmit((data) => mutate(data));

  return (
    <FormController
      form={form}
      onSubmit={onSubmit}
      submitText="Добавить"
      isLoading={isPending}
    >
      <FieldController
        control={form.control}
        name="ptFieldId"
        label="Поле шаблона"
        render={(props) => (
          <Select
            options={remainFields}
            by="id"
            render={SelectItem}
            {...props}
          />
        )}
      />
    </FormController>
  );
};

const SelectItem = ({
  name,
  type,
  description,
}: Props["remainFields"][number]) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span>{name}</span>
          <Badge className="py-0.5 text-xs" variant={"outline"}>
            {fieldTypeTranslates[type]}
          </Badge>
        </div>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};
