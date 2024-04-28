import getTemplate from "@/actions/get-template";
import updateTemplate from "@/actions/update-template";
import AdminEntityModerationInfo from "@/components/admin-entity-moderation-info";
import UpdateEntityForm from "@/components/update-entity-form";
import { parseIds } from "@/lib/utils";
import { notFound } from "next/navigation";

type Props = {
  params: {
    templateId: string;
  };
};

export default async function Page({ params }: Props) {
  const { templateId } = parseIds(params);

  const template = await getTemplate(templateId);

  if (!template) {
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
  } = template;

  return (
    <>
      <AdminEntityModerationInfo
        createdAt={createdAt}
        createdBy={createdBy}
        updatedAt={updatedAt}
        updatedBy={updatedBy}
      />
      <UpdateEntityForm
        action={updateTemplate}
        initialValues={{ name, description, published, id: templateId }}
      />
    </>
  );
}
