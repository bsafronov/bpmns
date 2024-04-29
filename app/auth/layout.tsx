import { getSession } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { user } = await getSession();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
