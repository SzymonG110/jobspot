import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserSessionData } from "#/auth";

export const metadata: Metadata = {
  title: "JobSpot - Auth",
  description: "Find your dream job",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserSessionData();
  if (!user) return redirect("/auth/login");

  return children;
}
