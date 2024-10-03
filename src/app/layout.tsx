import type {Metadata, Viewport} from 'next';
import {Plus_Jakarta_Sans} from 'next/font/google';
import './globals.css';
import {SkinProvider} from '@/providers/SkinContext';
import ClientThemeWrapper from '@/providers/ClientSkinWrapper';

const plusJakarta = Plus_Jakarta_Sans({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Twillink',
  description: 'Your exceptional Link in Bio',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

interface IRootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({children}: IRootLayoutProps) {
  return (
    <html lang="en">
      <body className={plusJakarta.className}>
        <SkinProvider>
          <ClientThemeWrapper>{children}</ClientThemeWrapper>
        </SkinProvider>
      </body>
    </html>
  );
}
