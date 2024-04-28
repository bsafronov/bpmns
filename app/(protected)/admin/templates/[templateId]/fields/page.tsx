import { createPtField } from "@/actions/create-pt-field";
import { getPtFields } from "@/actions/get-pt-fields";
import AdminEntityItem from "@/components/admin-entity-item";
import CreateEntityDialog from "@/components/create-entity-dialog";
import { EntityList } from "@/components/entity-list";
import { parseIds } from "@/lib/utils";

type Props = {
  params: {
    templateId: string;
  };
};

export default async function Page({ params }: Props) {
  const { templateId } = parseIds(params);
  const fields = await getPtFields({ templateId });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <CreateEntityDialog
          action={createPtField}
          args={{
            ptTemplateId: templateId,
          }}
          triggerTitle="Создать поле"
          title="Поле шаблона"
          description="Создание"
        />
      </div>
      <EntityList>
        {fields.map((field) => (
          <AdminEntityItem
            key={field.id}
            href={`/admin/pt-fields/${field.id}`}
            {...field}
          />
        ))}
      </EntityList>
    </div>
  );
}
