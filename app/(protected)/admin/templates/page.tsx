import PageHeader from "@/components/ui/page-header";
import { TemplateList } from "./_components/template-list";
import CreateEntityDialog from "@/components/create-entity-dialog";
import createTemplate from "@/actions/create-template";

export default function Page() {
  return (
    <>
      <PageHeader title="Шаблоны" description="Управление шаблонами" />
      <div className="mb-4 flex justify-end">
        <CreateEntityDialog
          action={createTemplate}
          title="Шаблон"
          description="Создание шаблона"
          successMessage="Шаблон успешно создан"
          triggerTitle="Создать шаблон"
        />
      </div>
      <TemplateList />
    </>
  );
}
