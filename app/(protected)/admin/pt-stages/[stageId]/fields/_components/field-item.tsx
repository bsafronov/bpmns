import { deletePtStageToPtField } from "@/actions/delete-pt-stage-to-pt-field";
import { getPtStageFields } from "@/actions/get-pt-stage-fields";
import { DeleteButton } from "@/components/delete-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { fieldTypeTranslates } from "@/lib/consts";

type Props = {
  ptStageId: ID;
  field: Return<typeof getPtStageFields>[number]["ptField"];
};
export const FieldItem = ({ field, ptStageId }: Props) => {
  const { name, type, id } = field;
  return (
    <Card className="flex justify-between p-4">
      <div className="flex items-center gap-2">
        {name}
        <Badge variant={"outline"}>{fieldTypeTranslates[type]}</Badge>
      </div>
      <DeleteButton
        action={deletePtStageToPtField}
        params={{ ptFieldId: id, ptStageId }}
      />
    </Card>
  );
};
