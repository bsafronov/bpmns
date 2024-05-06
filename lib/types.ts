import { ptFieldTypes } from "@/db/schema";
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

export type FieldType = (typeof ptFieldTypes.enumValues)[number];
