import { getProfession } from "@/actions/get-profession";
import { parseIds } from "@/lib/utils";
import { notFound } from "next/navigation";
import AdminEntityModerationInfo from "@/components/admin-entity-moderation-info";
import UpdateEntityForm from "@/components/update-entity-form";
import updateProfession from "@/actions/update-profession";

type Props = {
  params: {
    professionId: string;
  };
};

export default async function Page({ params }: Props) {
  const { professionId } = parseIds(params);

  const profession = await getProfession(professionId);

  if (!profession) {
    return notFound();
  }

  const {
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
    name,
    published,
    description,
  } = profession;

  return (
    <>
      <AdminEntityModerationInfo
        createdAt={createdAt}
        createdBy={createdBy}
        updatedAt={updatedAt}
        updatedBy={updatedBy}
      />
      <UpdateEntityForm
        action={updateProfession}
        initialValues={{
          name,
          description,
          published,
          id: professionId,
        }}
      />
    </>
  );
}
