import { getPtStageFields } from "@/actions/get-pt-stage-fields";
import { DialogController } from "@/components/ui/dialog-controller";
import { Eye } from "lucide-react";
import { StageFormPreviewForm } from "./stage-form-preview-form";

type Props = {
  ptStageId: ID;
};
export const StageFormPreview = async ({ ptStageId }: Props) => {
  const ptStageFields = await getPtStageFields(ptStageId);

  return (
    <DialogController
      title="Предпросмотр"
      description="Как будет выглядеть форма на текущем этапе"
      trigger={
        <button>
          <Eye className="size-4 text-muted-foreground" />
        </button>
      }
    >
      <StageFormPreviewForm
        fields={ptStageFields.map(({ ptField }) => ptField)}
      />
    </DialogController>
  );
};
