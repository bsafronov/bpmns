import { getPtField } from "@/actions/get-pt-field";
import { updatePtField } from "@/actions/update-pt-field";
import AdminEntityModerationInfo from "@/components/admin-entity-moderation-info";
import UpdateEntityForm from "@/components/update-entity-form";
import { parseIds } from "@/lib/utils";
import { notFound } from "next/navigation";

type Props = {
  params: {
    fieldId: string;
  };
};

export default async function Page({ params }: Props) {
  const { fieldId } = parseIds(params);

  const field = await getPtField(fieldId);

  if (!field) {
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
  } = field;

  return (
    <>
      <AdminEntityModerationInfo
        createdAt={createdAt}
        createdBy={createdBy}
        updatedAt={updatedAt}
        updatedBy={updatedBy}
      />
      <UpdateEntityForm
        action={updatePtField}
        initialValues={{ name, description, published, id: fieldId }}
      />
    </>
  );
}
