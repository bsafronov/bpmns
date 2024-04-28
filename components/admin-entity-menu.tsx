import { NavLink } from "@/lib/types";
import { Card } from "./ui/card";
import Link from "./ui/link";

type Props = {
  baseUrl: string;
  links: NavLink[];
  children?: React.ReactNode;
};

export default function AdminEntityMenu({ baseUrl, links, children }: Props) {
  return (
    <Card className="flex">
      <div className="flex min-w-[200px] flex-col border-r p-1 text-sm">
        <AdminEntityMenuLink href={baseUrl} title="Основная информация" />
        {links.map((item) => (
          <AdminEntityMenuLink key={item.href} {...item} />
        ))}
        <AdminEntityMenuLink href={`${baseUrl}/settings`} title="Настройки" />
      </div>
      <div className="grow rounded-r-md bg-body p-4">{children}</div>
    </Card>
  );
}

function AdminEntityMenuLink({ href, title, icon: Icon }: NavLink) {
  return (
    <Link
      href={href}
      key={href}
      className={"flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted"}
      activeClassName={"text-blue-600"}
    >
      {Icon && <Icon className="size-4" />}
      {title}
    </Link>
  );
}
