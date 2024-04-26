import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export const Container = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cn("mx-auto max-w-screen-lg px-4", className)} />
  );
};
