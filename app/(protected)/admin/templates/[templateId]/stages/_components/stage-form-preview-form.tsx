"use client";

import { getPtStageFields } from "@/actions/get-pt-stage-fields";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldController } from "@/components/ui/field-controller";
import { FormController } from "@/components/ui/form-controller";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useZodForm } from "@/lib/use-zod-form";
import { z } from "zod";

const schema = z.object({
  fields: z.array(z.string()),
});

type Props = {
  fields: Return<typeof getPtStageFields>[number]["ptField"][];
};

export const StageFormPreviewForm = ({ fields }: Props) => {
  const form = useZodForm(schema, {
    defaultValues: {
      fields: [],
    },
  });

  return (
    <FormController form={form}>
      {fields.map((field, i) => (
        <FieldController
          key={i}
          control={form.control}
          name={`fields.${i}`}
          label={field.name}
          description={field.description ?? undefined}
          placement={field.type === "boolean" ? "checkbox" : undefined}
          render={(props) => {
            const type = field.type;

            switch (type) {
              case "boolean":
                return <Checkbox />;
              case "text":
                return <Input />;
              case "rich_text":
                return <Textarea />;
              case "date":
                return <Input type="date" />;
              case "file":
                return <Input type="file" />;
              case "number":
                return <Input type="number" />;
            }
          }}
        />
      ))}
    </FormController>
  );
};
