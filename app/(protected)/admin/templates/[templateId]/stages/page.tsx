import { createPtStage } from "@/actions/create-pt-stage";
import { getPtStages } from "@/actions/get-pt-stages";
import AdminEntityItem from "@/components/admin-entity-item";
import CreateEntityDialog from "@/components/create-entity-dialog";
import { EntityList } from "@/components/entity-list";
import { parseIds } from "@/lib/utils";
import { StageFormPreview } from "./_components/stage-form-preview";
import { Separator } from "@/components/ui/separator";

type Props = {
  params: {
    templateId: string;
  };
};

export default async function Page({ params }: Props) {
  const { templateId } = parseIds(params);

  const stages = await getPtStages();

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <CreateEntityDialog
          action={createPtStage}
          args={{
            ptTemplateId: templateId,
          }}
          triggerTitle="Создать этап"
          title="Этап шаблона"
          description="Создание"
        />
      </div>
      <EntityList>
        {stages.map((stage) => (
          <AdminEntityItem
            key={stage.id}
            {...stage}
            href={`/admin/pt-stages/${stage.id}`}
            actions={<StageFormPreview ptStageId={stage.id} />}
          >
            <div className="text-muted-foreground">
              <p>
                - Кол-во используемых полей:&nbsp;
                <span className="text-primary">
                  {stage.ptStagesToPtFields.length}
                </span>
              </p>
            </div>
          </AdminEntityItem>
        ))}
      </EntityList>
    </div>
  );
}
