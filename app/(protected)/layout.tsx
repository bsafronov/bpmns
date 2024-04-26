import { Container } from "@/components/ui/container";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AsideNavbar } from "./_components/aside-navbar";

export default async function Layout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { user } = await getSession();

  if (!user) {
    return redirect("/auth/sign-in");
  }

  return (
    <Container className="mt-4 flex items-start gap-4">
      <AsideNavbar />
      <main className="grow">{children}</main>
    </Container>
  );
}
