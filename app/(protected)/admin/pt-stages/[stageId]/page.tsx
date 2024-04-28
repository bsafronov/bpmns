import { getPtStage } from "@/actions/get-pt-stage";
import { updatePtStage } from "@/actions/update-pt-stage";
import AdminEntityModerationInfo from "@/components/admin-entity-moderation-info";
import UpdateEntityForm from "@/components/update-entity-form";
import { parseIds } from "@/lib/utils";
import { notFound } from "next/navigation";

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

  const {
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
    name,
    description,
    published,
  } = stage;

  return (
    <>
      <AdminEntityModerationInfo
        createdAt={createdAt}
        createdBy={createdBy}
        updatedAt={updatedAt}
        updatedBy={updatedBy}
      />
      <UpdateEntityForm
        action={updatePtStage}
        initialValues={{ name, description, published, id: stageId }}
      />
    </>
  );
}
