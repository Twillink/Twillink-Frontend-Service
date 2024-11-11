'use client';

import React, {createContext, ReactNode, useEffect, useState} from 'react';

export enum PreviewTypeEnum {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}

interface IPreviewContext {
  preview: PreviewTypeEnum;
  changePreview: () => void;
  isMobileScreen: boolean;
}

export const PreviewContext = createContext<IPreviewContext>({
  preview: PreviewTypeEnum.DESKTOP,
  changePreview: () => {},
  isMobileScreen: false,
});

interface PreviewProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'preview-mode';
const MOBILE_BREAKPOINT = 1200;

export const PreviewProvider: React.FC<PreviewProviderProps> = ({children}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [preview, setPreview] = useState<PreviewTypeEnum>(
    PreviewTypeEnum.DESKTOP,
  );
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // Initialize on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPreview = localStorage.getItem(
        STORAGE_KEY,
      ) as PreviewTypeEnum;
      if (storedPreview) {
        setPreview(storedPreview);
      }

      // Initial check for screen size
      setIsMobileScreen(window.innerWidth < MOBILE_BREAKPOINT);
      setIsInitialized(true);
    }
  }, []);

  // Handle window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobileScreen(isMobile);

      console.log(isMobile, 'isMobile');

      // Force mobile preview on small screens
      if (isMobile && preview !== PreviewTypeEnum.MOBILE) {
        setPreview(PreviewTypeEnum.MOBILE);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [preview, isMobileScreen]);

  // Save to localStorage whenever preview changes
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(STORAGE_KEY, preview);
  }, [preview, isInitialized]);

  const changePreview = () => {
    // Only allow preview change if screen is large enough
    if (!isMobileScreen) {
      setPreview(prevPreview =>
        prevPreview === PreviewTypeEnum.DESKTOP
          ? PreviewTypeEnum.MOBILE
          : PreviewTypeEnum.DESKTOP,
      );
    } else {
      setPreview(PreviewTypeEnum.MOBILE);
    }
  };

  // Don't render until initialized
  if (!isInitialized) {
    return null;
  }

  console.log(isMobileScreen, preview, 'Preview Controller');

  return (
    <PreviewContext.Provider value={{preview, changePreview, isMobileScreen}}>
      {children}
    </PreviewContext.Provider>
  );
};
