import { LucideIcon } from "lucide-react";

export type NavLink = {
  title: string;
  href: string;
  icon?: LucideIcon;
};

export type EntityInitialValues = {
  id: ID;
  name: string;
  description: string | null;
  published: boolean;
};
