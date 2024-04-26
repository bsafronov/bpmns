import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PageHeader from "@/components/ui/page-header";
import { parseIds } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  params: {
    professionId: string;
  };
  children?: React.ReactNode;
};
export default function Layout({ children, params }: Props) {
  const { professionId } = parseIds(params);

  return (
    <>
      <Button asChild size={"sm"} variant={"ghost"}>
        <Link href={"/admin/professions"} className="gap-1">
          <ArrowLeft className="size-4" />К профессиям
        </Link>
      </Button>
      <PageHeader title="Профессия" description="Управление профессиями" />

      <Card className="flex">
        <div className="flex min-w-[200px] flex-col border-r p-1 text-sm">
          <Link
            href={`/admin/professions/${professionId}`}
            className="rounded-md px-2 py-1 hover:bg-muted"
          >
            Основная информация
          </Link>

          <Link
            href={`/admin/professions/${professionId}/users`}
            className="rounded-md px-2 py-1 hover:bg-muted"
          >
            Пользователи
          </Link>
        </div>
        <div className="bg-body grow rounded-r-md p-4">{children}</div>
      </Card>
    </>
  );
}
