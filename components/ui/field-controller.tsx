"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";

type FieldControllerPlacement = "checkbox";
type FieldControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<
  ComponentPropsWithoutRef<typeof FormField<TFieldValues, TName>>,
  "control" | "name"
> & {
  label?: string;
  description?: string;
  className?: string;
  placement?: FieldControllerPlacement;
  required?: boolean;
  render: (props: ControllerRenderProps<TFieldValues, TName>) => ReactNode;
};
type FieldControllerPlacementProps = Pick<
  FieldControllerProps,
  "className" | "description" | "label" | "placement" | "required"
> & {
  children?: ReactNode;
};
type FieldControllerPlacementItemProps = Omit<
  FieldControllerPlacementProps,
  "placement"
>;
type FieldControllerPlacementList = Partial<
  Record<
    FieldControllerPlacement,
    (props: FieldControllerPlacementItemProps) => JSX.Element
  >
> & {
  DEFAULT: (props: FieldControllerPlacementItemProps) => JSX.Element;
};

export const FieldController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  render,
  ...props
}: FieldControllerProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FieldPlacement {...props}>{render(field)}</FieldPlacement>
      )}
    />
  );
};

const placementList: FieldControllerPlacementList = {
  DEFAULT: ({ children, className, description, label, required }) => (
    <FormItem className={className}>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <FormControl>{children}</FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  ),
  checkbox: ({ children, className, description, label, required }) => (
    <FormItem className={className}>
      <div className="flex items-start gap-2">
        <FormControl>{children}</FormControl>
        {label && (
          <FormLabel required={required} className="mt-[1px]">
            {label}
          </FormLabel>
        )}
      </div>
      <div className="flex flex-col">
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </div>
    </FormItem>
  ),
};

const FieldPlacement = ({
  placement,
  ...props
}: FieldControllerPlacementProps) => {
  if (!placement || !placementList[placement]?.(props)) {
    return placementList.DEFAULT(props);
  }
  return placementList[placement]?.(props);
};
