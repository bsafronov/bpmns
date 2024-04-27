import { Edit, LinkIcon, Trash } from "lucide-react";
import { Card } from "./ui/card";
import { getRelativeDate } from "@/lib/date";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { Badge } from "./ui/badge";

type Props = {
  children?: React.ReactNode;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    id: ID;
    username: string;
  };
  updatedBy: {
    id: ID;
    username: string;
  } | null;
  className?: string;
  href?: string;
  actions?: React.ReactNode;
  published?: boolean | null;
};

export default function AdminEntityItem({
  href,
  children,
  createdAt,
  createdBy,
  description,
  name,
  updatedAt,
  updatedBy,
  className,
  actions,
  published,
}: Props) {
  const getFallback = () => {
    if (updatedBy) {
      return updatedBy.username.slice(0, 2);
    }

    return createdBy.username.slice(0, 2);
  };

  return (
    <Card className="p-4 text-sm">
      <div className="flex items-start justify-between">
        {href && (
          <Link href={href} className="flex items-start gap-1 hover:underline">
            <h5 className="text-lg font-semibold">{name}</h5>
            <LinkIcon className="size-3 text-blue-500" />
          </Link>
        )}
        {!href && <h5 className="text-lg font-semibold">{name}</h5>}
        <div className="flex items-center gap-1">{actions}</div>
      </div>
      {description && <p className="text-muted-foreground">{description}</p>}
      <div className={cn("my-8", className)}>{children}</div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link
            href={
              updatedBy
                ? `/admin/users/${updatedBy.id}`
                : `/admin/users/${createdBy.id}`
            }
          >
            <Avatar className="size-8">
              <AvatarImage src="" />
              <AvatarFallback className="uppercase">
                {getFallback()}
              </AvatarFallback>
            </Avatar>
          </Link>
          {updatedBy && <span>{getRelativeDate(updatedAt)} (изменено)</span>}
          {!updatedBy && <span>{getRelativeDate(createdAt)}</span>}
        </div>
        {published === true && <Badge variant={"success"}>Опубликовано</Badge>}
        {published === false && <Badge variant={"secondary"}>Черновик</Badge>}
      </div>
    </Card>
  );
}
