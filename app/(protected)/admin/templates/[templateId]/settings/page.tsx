import deleteTemplate from "@/actions/delete-template";
import DeleteEntity from "@/components/delete-entity";
import { parseIds } from "@/lib/utils";

type Props = {
  params: {
    templateId: string;
  };
};
export default function Page({ params }: Props) {
  const { templateId } = parseIds(params);

  return (
    <div>
      <DeleteEntity
        action={deleteTemplate}
        id={templateId}
        redirectUrl="/admin/templates"
      />
    </div>
  );
}
