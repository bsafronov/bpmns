"use client";

import { Trash } from "lucide-react";
import AlertDialogController from "./ui/alert-dialog-controller";
import { useMutation } from "@tanstack/react-query";

type Props<T extends (...args: any[]) => any> = {
  confirm?: boolean;
  action: T;
  params: Parameters<T>[0];
  onSuccess?: () => void;
};

export const DeleteButton = <T extends (...args: any[]) => any>({
  action,
  params,
  confirm,
  onSuccess,
}: Props<T>) => {
  const { mutate } = useMutation({
    mutationFn: action,
    onSuccess: () => onSuccess,
  });

  if (confirm) {
    return (
      <AlertDialogController
        trigger={
          <button>
            <Trash className="size-4 text-destructive hover:text-destructive/80" />
          </button>
        }
        onSubmit={() => mutate(params)}
      />
    );
  }

  return (
    <button onClick={() => mutate(params)}>
      <Trash className="size-4 text-destructive hover:text-destructive/80" />
    </button>
  );
};
