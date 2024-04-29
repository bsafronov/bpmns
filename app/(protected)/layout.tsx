import { Container } from "@/components/ui/container";
import { redirect } from "next/navigation";
import { AsideNavbar } from "./_components/aside-navbar";
import { getSession } from "@/actions/auth";

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
    <Container className="mt-4 flex items-start gap-2">
      <AsideNavbar />
      <main className="grow">{children}</main>
    </Container>
  );
}
