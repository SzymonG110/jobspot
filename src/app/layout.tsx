import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../styles/globals.css";
import { Providers as ProvidersTSX} from "#/app/Providers";
import Navbar from "#/components/shared/Navbar";

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
    <html lang="pl-PL" className="light">
      <body className={`${montserrat.className} min-h-screen`}>
        <ProvidersTSX>
          <ReactQueryDevtools initialIsOpen={false} />
          <Navbar />
          {children}
        </ProvidersTSX>
      </body>
    </html>
  );
}
