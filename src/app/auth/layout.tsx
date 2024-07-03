import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserSessionData } from "#/features/auth/lib/auth";
import AuthCard from "#/features/auth/components/AuthCard";

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
