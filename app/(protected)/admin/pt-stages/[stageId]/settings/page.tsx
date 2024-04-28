import { deletePtStage } from "@/actions/delete-pt-stage";
import deleteTemplate from "@/actions/delete-template";
import DeleteEntity from "@/components/delete-entity";
import { parseIds } from "@/lib/utils";

type Props = {
  params: {
    stageId: string;
  };
};
export default function Page({ params }: Props) {
  const { stageId } = parseIds(params);

  return (
    <div>
      <DeleteEntity
        action={deletePtStage}
        id={stageId}
        redirectUrl="/admin/templates"
      />
    </div>
  );
}
