import { deletePtStage } from "@/actions/delete-pt-stage";
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
      <DeleteEntity action={deletePtStage} id={stageId} />
    </div>
  );
}
