import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Providers } from '#/features/core/components/providers';
import { Navbar } from '#/features/core/components/navbar';
import '#/app/globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat-latin',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} flex min-h-[100vh] flex-col antialiased`}
      >
        <Providers>
          <Navbar />

          <div className="flex-grow">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
