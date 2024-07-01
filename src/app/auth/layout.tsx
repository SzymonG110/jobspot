import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { userSessionData } from "#/auth";
import AuthCard from "#/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "JobSpot - Auth",
  description: "Find your dream job",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await userSessionData();
  if (user.user && user.session) return redirect("/");

  return (
    <div className="flex justify-center items-center h-screen">
      <AuthCard>{children}</AuthCard>
    </div>
  );
}
