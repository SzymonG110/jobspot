"use client";

import { usePathname } from "next/navigation";

export function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  return (
    <div
      className={`2xl:max-w-[80vw] mx-auto container ${
        !path.includes("auth") ? "mt-4 lg:mt-20 px-5" : ""
      }`}
    >
      {children}
    </div>
  );
}
