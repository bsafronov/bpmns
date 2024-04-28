import { getPtStage } from "@/actions/get-pt-stage";
import AdminEntityMenu from "@/components/admin-entity-menu";
import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";
import PageHeader from "@/components/ui/page-header";
import { parseIds } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

type Props = {
  params: {
    stageId: string;
  };
  children?: React.ReactNode;
};

export default async function Layout({ params, children }: Props) {
  const { stageId } = parseIds(params);

  const stage = await getPtStage(stageId);

  if (!stage) {
    return notFound();
  }

  return (
    <>
      <Button asChild size={"sm"} variant={"ghost"}>
        <Link
          href={`/admin/templates/${stage.ptTemplateId}/stages`}
          className="gap-1"
          activeClassName="text-blue-500"
        >
          <ArrowLeft className="size-4" />К шаблону
        </Link>
      </Button>
      <PageHeader
        title="Этап шаблона"
        description="Управление этапом шаблона"
      />
      <AdminEntityMenu baseUrl={`/admin/pt-stages/${stageId}`}>
        {children}
      </AdminEntityMenu>
    </>
  );
}
