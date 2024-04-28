import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export const EntityList = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
};
