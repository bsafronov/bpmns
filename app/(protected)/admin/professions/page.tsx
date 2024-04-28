import createProfession from "@/actions/create-profession";
import CreateEntityDialog from "@/components/create-entity-dialog";
import PageHeader from "@/components/ui/page-header";
import { ProfessionList } from "./_components/profession-list";

export default function Page() {
  return (
    <>
      <PageHeader title="Профессии" description="Управление профессиями" />
      <div className="mb-4 flex justify-end">
        <CreateEntityDialog
          action={createProfession}
          triggerTitle="Создать профессию"
          title="Профессия"
          description="Создание профессии"
        />
      </div>
      <ProfessionList />
    </>
  );
}
