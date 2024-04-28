import deleteProfession from "@/actions/delete-profession";
import DeleteEntity from "@/components/delete-entity";
import { parseIds } from "@/lib/utils";

type Props = {
  params: {
    professionId: string;
  };
};
export default function Page({ params }: Props) {
  const { professionId } = parseIds(params);

  return (
    <div>
      <DeleteEntity
        action={deleteProfession}
        id={professionId}
        redirectUrl="/admin/professions"
      />
    </div>
  );
}
