import { getProfession } from "@/actions/get-profession";
import { parseIds } from "@/lib/utils";
import { notFound } from "next/navigation";
import { UpdateProfessionForm } from "./_components/update-profession-form";
import AdminEntityModerationInfo from "@/components/admin-entity-moderation-info";

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

  const { createdAt, createdBy, updatedAt, updatedBy } = profession;

  return (
    <>
      <AdminEntityModerationInfo
        createdAt={createdAt}
        createdBy={createdBy}
        updatedAt={updatedAt}
        updatedBy={updatedBy}
      />
      <UpdateProfessionForm profession={profession} />
    </>
  );
}
