"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AlertDialogController from "./ui/alert-dialog-controller";
import { LoadingButton } from "./ui/loading-button";

type Props = {
  id: ID;
  action: (id: ID) => Promise<void>;
  redirectUrl?: string;
};

export default function DeleteEntity({ action, id, redirectUrl }: Props) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: action,
    onSuccess: () => {
      {
        redirectUrl && router.push(redirectUrl);
      }
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <div className="divide-y divide-dashed divide-destructive/25 rounded-md border border-dashed border-destructive/50 bg-destructive/15 text-sm">
      <div className="flex items-center justify-between px-4 py-2">
        <span>Удаление сущности</span>
        <AlertDialogController
          onSubmit={() => mutate(id)}
          trigger={
            <LoadingButton
              variant={"destructive"}
              size={"sm"}
              isLoading={isPending}
            >
              Удалить
            </LoadingButton>
          }
        />
      </div>
    </div>
  );
}
