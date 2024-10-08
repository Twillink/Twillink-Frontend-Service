'use client';

import {SkinTypeEnum} from '@/libs/types/SkinTypeEnum';
import React, {createContext, useEffect, useState, ReactNode} from 'react';

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
  const [skin, setSkin] = useState<SkinTypeEnum>(SkinTypeEnum.LIGHT);

  useEffect(() => {
    const storedSkin = localStorage.getItem('skin') as SkinTypeEnum | null;
    if (storedSkin) {
      setSkin(storedSkin);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('skin', skin);
  }, [skin]);

  const changeSkin = () => {
    setSkin(prevSkin =>
      prevSkin === SkinTypeEnum.DARK ? SkinTypeEnum.LIGHT : SkinTypeEnum.DARK,
    );
  };

  return (
    <SkinContext.Provider value={{skin, changeSkin}}>
      {children}
    </SkinContext.Provider>
  );
};
