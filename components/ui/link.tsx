"use client";

import { cn } from "@/lib/utils";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

type LinkProps = React.ComponentPropsWithoutRef<typeof NextLink> & {
  activeClassName?: string;
};

export default function Link({
  className,
  activeClassName,
  href,
  ...props
}: LinkProps) {
  const pathname = usePathname();
  const selected = pathname === href;
  return (
    <NextLink
      href={href}
      className={cn(className, selected && activeClassName)}
      {...props}
    />
  );
}
