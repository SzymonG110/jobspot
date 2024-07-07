import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthCard } from "#/features/auth/components/AuthCard";
import { getUserSessionData } from "#/features/auth/libs/fetchSession";

export const metadata: Metadata = {
  title: "JobSpot - Auth",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserSessionData();
  if (user) {
    return redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <AuthCard>{children}</AuthCard>
    </div>
  );
}
