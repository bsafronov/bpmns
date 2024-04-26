import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { user } = await getSession();

  if (user?.role !== "admin") {
    return redirect("/");
  }

  return <>{children}</>;
}
