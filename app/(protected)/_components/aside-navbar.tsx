import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { FileIcon, LayoutDashboard } from "lucide-react";
import UserMenu from "./user-menu";
import Link from "@/components/ui/link";

const linkClassName =
  "flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted";
export function AsideNavbar() {
  return (
    <Card className="sticky top-4 min-w-[240px] space-y-8 py-2 text-sm">
      <h5 className="animate-text bg-gradient-to-r from-sky-500 via-pink-500 to-orange-500 bg-clip-text px-4 text-2xl text-lg font-bold font-semibold text-transparent">
        BPMNS
      </h5>
      <nav className="px-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="templates">
            <AccordionTrigger className="rounded-md px-2 py-1 font-normal hover:bg-muted hover:no-underline">
              <div className="flex items-center gap-1">
                <LayoutDashboard className="size-4" />
                Панель управления
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-4">
              <Link
                href="/admin/templates"
                className={linkClassName}
                activeClassName="text-blue-500"
              >
                <FileIcon className="size-4" />
                Шаблоны
              </Link>
              <Link
                href="/admin/professions"
                className={linkClassName}
                activeClassName="text-blue-500"
              >
                <FileIcon className="size-4" /> Профессии
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Link
          href="/admin/processes"
          className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted"
          activeClassName="text-blue-500"
        >
          <FileIcon className="size-4" />
          Процессы
        </Link>
      </nav>
      <div className="px-2">
        <UserMenu />
      </div>
    </Card>
  );
}
