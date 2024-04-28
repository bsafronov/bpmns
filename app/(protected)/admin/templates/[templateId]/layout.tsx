import AdminEntityMenu from "@/components/admin-entity-menu";
import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";
import PageHeader from "@/components/ui/page-header";
import { NavLink } from "@/lib/types";
import { parseIds } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: {
    templateId: string;
  };
  children?: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/fields",
    title: "Поля",
  },
  {
    href: "/stages",
    title: "Этапы",
  },
];

export default function Layout({ children, params }: Props) {
  const { templateId } = parseIds(params);

  return (
    <>
      <Button asChild size={"sm"} variant={"ghost"}>
        <Link
          href={"/admin/templates"}
          className="gap-1"
          activeClassName="text-blue-500"
        >
          <ArrowLeft className="size-4" />К шаблонам
        </Link>
      </Button>
      <PageHeader title="Шаблон" description="Управление шаблоном" />
      <AdminEntityMenu baseUrl={`/admin/templates/${templateId}`} links={links}>
        {children}
      </AdminEntityMenu>
    </>
  );
}
