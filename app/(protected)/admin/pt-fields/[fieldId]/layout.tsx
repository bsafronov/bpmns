import { getPtField } from "@/actions/get-pt-field";
import AdminEntityMenu from "@/components/admin-entity-menu";
import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";
import PageHeader from "@/components/ui/page-header";
import { parseIds } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

type Props = {
  params: {
    fieldId: string;
  };
  children?: React.ReactNode;
};

export default async function Layout({ params, children }: Props) {
  const { fieldId } = parseIds(params);

  const field = await getPtField(fieldId);

  if (!field) {
    return notFound();
  }

  return (
    <>
      <Button asChild size={"sm"} variant={"ghost"}>
        <Link
          href={`/admin/templates/${field.ptTemplateId}/fields`}
          className="gap-1"
          activeClassName="text-blue-500"
        >
          <ArrowLeft className="size-4" />К шаблону
        </Link>
      </Button>
      <PageHeader title="Поле шаблона" description="Управление полем шаблона" />
      <AdminEntityMenu baseUrl={`/admin/pt-fields/${fieldId}`}>
        {children}
      </AdminEntityMenu>
    </>
  );
}
