import { getProfession } from "@/actions/get-profession";
import { parseIds } from "@/lib/utils";
import { notFound } from "next/navigation";
import { UpdateProfessionForm } from "./_components/update-profession-form";

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

  const { id, name, description } = profession;

  return (
    <>
      <UpdateProfessionForm profession={profession} />
    </>
  );
}
