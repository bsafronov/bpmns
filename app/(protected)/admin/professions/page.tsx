import PageHeader from "@/components/ui/page-header";
import CreateProfession from "./_components/create-profession";
import { ProfessionList } from "./_components/profession-list";

export default function Page() {
  return (
    <>
      <PageHeader title="Профессии" description="Управление профессиями" />
      <div className="mb-4 flex justify-end">
        <CreateProfession />
      </div>
      <ProfessionList />
    </>
  );
}
