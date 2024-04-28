import { cn } from "@/lib/utils";
import { Children, HTMLAttributes } from "react";

type EntityListProps = HTMLAttributes<HTMLDivElement> & {
  emptyMessage?: string;
};
export const EntityList = ({
  className,
  children,
  emptyMessage = "Записи отсутствуют",
  ...props
}: EntityListProps) => {
  const childrenArray = Children.toArray(children);

  if (childrenArray.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
};
