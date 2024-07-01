"use client";

import { usePathname } from "next/navigation";

export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  return (
    <div className={`container ${!path.includes("auth") ? "mt-20" : ""}`}>
      {children}
    </div>
  );
}
