import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { users } from "@/db/schema";
import { getRelativeDate } from "@/lib/date";
import { ChevronRight, Slash } from "lucide-react";

type Props = {
  createdAt: Date;
  createdBy: typeof users.$inferSelect;
  updatedAt: Date;
  updatedBy?: typeof users.$inferSelect | null;
};

export default function AdminEntityModerationInfo({
  createdBy,
  updatedBy,
  createdAt,
  updatedAt,
}: Props) {
  return (
    <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
      <div className="flex items-center gap-1">
        <span>{getRelativeDate(createdAt)} (создано)</span>
        <Avatar className="size-8">
          <AvatarImage src="" />
          <AvatarFallback>{getInitials(createdBy.username)}</AvatarFallback>
        </Avatar>
      </div>
      {updatedBy && (
        <>
          <div className="flex items-center gap-1">
            <span>{getRelativeDate(updatedAt)} (изменено)</span>
            <Avatar className="size-8">
              <AvatarImage src="" />
              <AvatarFallback>{getInitials(updatedBy.username)}</AvatarFallback>
            </Avatar>
          </div>
        </>
      )}
    </div>
  );
}
