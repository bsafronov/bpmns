import { deletePtField } from "@/actions/delete-pt-field";
import { getPtField } from "@/actions/get-pt-field";
import DeleteEntity from "@/components/delete-entity";
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

  return (
    <div>
      <DeleteEntity
        action={deletePtField}
        id={fieldId}
        redirectUrl={`/admin/templates/${field.ptTemplateId}/fields`}
      />
    </div>
  );
}
