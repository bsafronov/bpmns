"use client";

import { Loader2 } from "lucide-react";
import { type FieldValues, type UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";
import { LoadingButton } from "./loading-button";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T, unknown, undefined>;
  onSubmit?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
  className?: string;
  cancelText?: string;
  submitText?: string;
  isLoading?: boolean;
  hasCancel?: boolean;
};

export const FormController = <T extends FieldValues>({
  form,
  onSubmit,
  onCancel,
  children,
  className,
  submitText = "Отправить",
  cancelText = "Отмена",
  hasCancel,
  isLoading,
}: Props<T>) => {
  const handleCancel = () => onCancel?.() ?? form.reset();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className={cn("space-y-4", className)}>{children}</div>
        <div className="mt-4 flex justify-end gap-4">
          {hasCancel ? (
            <Button variant={"outline"} onClick={handleCancel}>
              {cancelText}
            </Button>
          ) : null}

          {onSubmit ? (
            <LoadingButton
              isLoading={isLoading}
              className="gap-2"
              type="submit"
            >
              {submitText}
            </LoadingButton>
          ) : null}
        </div>
      </form>
    </Form>
  );
};
