import { getPtStageFields } from "@/actions/get-pt-stage-fields";
import { FieldItem } from "./field-item";
import { EntityList } from "@/components/entity-list";

type Props = {
  stageId: ID;
};

export const FieldList = async ({ stageId }: Props) => {
  const fields = await getPtStageFields(stageId);

  return (
    <EntityList className="mt-4">
      {fields.map((field) => (
        <FieldItem
          key={field.ptFieldId}
          field={field.ptField}
          ptStageId={stageId}
        />
      ))}
    </EntityList>
  );
};
