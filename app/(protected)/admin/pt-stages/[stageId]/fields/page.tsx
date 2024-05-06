import { parseIds } from "@/lib/utils";
import { FieldList } from "./_components/field-list";
import { getPtFields } from "@/actions/get-pt-fields";
import { getPtStage } from "@/actions/get-pt-stage";
import { notFound } from "next/navigation";
import { getPtStageFields } from "@/actions/get-pt-stage-fields";
import { AddStageFieldForm } from "./_components/add-stage-field-form";

type Props = {
  params: {
    stageId: string;
  };
};
export default async function Page({ params }: Props) {
  const { stageId } = parseIds(params);
  const stage = await getPtStage(stageId);

  if (!stage) {
    return notFound();
  }

  const ptFields = await getPtFields({ templateId: stage.ptTemplateId });
  const ptStageFields = await getPtStageFields(stageId);
  const remainFields = ptFields.filter(
    (field) =>
      !ptStageFields.some((stageField) => stageField.ptFieldId === field.id),
  );

  return (
    <div>
      <AddStageFieldForm remainFields={remainFields} stageId={stageId} />
      <FieldList stageId={stageId} />
    </div>
  );
}
