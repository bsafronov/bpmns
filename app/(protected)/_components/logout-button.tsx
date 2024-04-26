"use client";

import { signOut } from "@/actions/sign-out";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { mutate } = useMutation({ mutationFn: signOut });

  return (
    <button
      onClick={() => mutate()}
      className="flex w-full items-center justify-between gap-1 rounded-md px-2 py-1 outline-none hover:bg-muted"
    >
      Выйти
      <LogOut className="size-4 text-destructive" />
    </button>
  );
}
