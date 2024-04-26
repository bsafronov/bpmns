import PageHeader from "@/components/ui/page-header";
import CreateProfession from "./_components/create-profession";

export default function Page() {
  return (
    <>
      <PageHeader title="Профессии" description="Управление профессиями" />
      <div className="flex justify-end">
        <CreateProfession />
      </div>
    </>
  );
}
