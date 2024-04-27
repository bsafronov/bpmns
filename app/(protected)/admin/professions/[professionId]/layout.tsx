import AdminEntityMenu from "@/components/admin-entity-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "@/components/ui/link";
import PageHeader from "@/components/ui/page-header";
import { NavLink } from "@/lib/types";
import { parseIds } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: {
    professionId: string;
  };
  children?: React.ReactNode;
};

function getLinks(id: ID): NavLink[] {
  return [
    {
      title: "Основная информация",
      href: `/admin/professions/${id}`,
    },
    {
      title: "Пользователи",
      href: `/admin/professions/${id}/users`,
    },
  ];
}

export default function Layout({ children, params }: Props) {
  const { professionId } = parseIds(params);

  return (
    <>
      <Button asChild size={"sm"} variant={"ghost"}>
        <Link
          href={"/admin/professions"}
          className="gap-1"
          activeClassName="text-blue-500"
        >
          <ArrowLeft className="size-4" />К профессиям
        </Link>
      </Button>
      <PageHeader title="Профессия" description="Управление профессиями" />
      <AdminEntityMenu links={getLinks(professionId)}>
        {children}
      </AdminEntityMenu>
    </>
  );
}
