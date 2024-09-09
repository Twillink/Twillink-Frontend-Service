import type {Metadata} from 'next';
import {Plus_Jakarta_Sans} from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import {SkinProvider} from '@/providers/SkinContext';
import ClientThemeWrapper from '@/providers/ClientSkinWrapper';

const plusJakarta = Plus_Jakarta_Sans({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Twillink',
  description: 'Your exceptional Link in Bio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={plusJakarta.className}>
        <SkinProvider>
          <ClientThemeWrapper>{children}</ClientThemeWrapper>
        </SkinProvider>
      </body>
    </html>
  );
}
