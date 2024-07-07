import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Container } from "#/features/core/components/Container";
import { Navbar } from "#/features/core/components/Navbar";
import { Providers } from "#/features/core/components/Providers";
import "#/features/core/styles/globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobSpot",
  description: "Find your dream job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${montserrat.className} min-h-screen`}>
        <Providers>
          <ReactQueryDevtools initialIsOpen={false} />
          <Navbar />
          <Container>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
