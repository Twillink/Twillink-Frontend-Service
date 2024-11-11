import type {Metadata, Viewport} from 'next';
import {Plus_Jakarta_Sans} from 'next/font/google';
import './globals.css';
import {SkinProvider} from '@/libs/providers/SkinContext';
import ReduxStoreProvider from '@/libs/providers/ReduxStoreProvider';
import ClientAuthLayoutWrapper from '@/libs/providers/ClientAuthLayoutWrapper';
import ClientThemeWrapper from '@/libs/providers/ClientSkinWrapper';
import ToastProvider from '@/libs/providers/ToastProvider';
import {PreviewProvider} from '@/libs/providers/PreviewProvider';

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
        <ReduxStoreProvider>
          <ClientAuthLayoutWrapper>
            <SkinProvider>
              <PreviewProvider>
                <ClientThemeWrapper>
                  <ToastProvider>{children}</ToastProvider>
                </ClientThemeWrapper>
              </PreviewProvider>
            </SkinProvider>
          </ClientAuthLayoutWrapper>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
