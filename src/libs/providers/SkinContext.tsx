'use client';

import {SkinTypeEnum} from '@/libs/types/SkinTypeEnum';
import React, {createContext, ReactNode, useEffect, useState} from 'react';

interface ISkinContext {
  skin: SkinTypeEnum;
  changeSkin: () => void;
}

export const SkinContext = createContext<ISkinContext>({
  skin: SkinTypeEnum.LIGHT,
  changeSkin: () => {},
});

interface SkinProviderProps {
  children: ReactNode;
}

export const SkinProvider: React.FC<SkinProviderProps> = ({children}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [skin, setSkin] = useState<SkinTypeEnum>(SkinTypeEnum.LIGHT);

  // Initialize on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSkin = localStorage.getItem('skin') as SkinTypeEnum;
      if (storedSkin) {
        setSkin(storedSkin);
      }
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage and update styles whenever skin changes
  useEffect(() => {
    if (!isInitialized) return;

    localStorage.setItem('skin', skin);

    // Update document styles
    if (skin === SkinTypeEnum.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [skin, isInitialized]);

  const changeSkin = () => {
    setSkin(prevSkin =>
      prevSkin === SkinTypeEnum.DARK ? SkinTypeEnum.LIGHT : SkinTypeEnum.DARK,
    );
  };

  // Don't render children until we've initialized
  if (!isInitialized) {
    return null; // or a loading spinner if you prefer
  }

  return (
    <SkinContext.Provider value={{skin, changeSkin}}>
      {children}
    </SkinContext.Provider>
  );
};
