'use client';

import React, {createContext, useEffect, useState, ReactNode} from 'react';

export enum SkinType {
  LIGHT = 'skinLight',
  DARK = 'skinDark',
}

interface SkinContextType {
  skin: SkinType;
  changeSkin: () => void;
}

export const SkinContext = createContext<SkinContextType>({
  skin: SkinType.LIGHT,
  changeSkin: () => {},
});

interface SkinProviderProps {
  children: ReactNode;
}

export const SkinProvider: React.FC<SkinProviderProps> = ({children}) => {
  const [skin, setSkin] = useState<SkinType>(SkinType.LIGHT);

  useEffect(() => {
    const storedSkin = localStorage.getItem('skin') as SkinType | null;
    if (storedSkin) {
      setSkin(storedSkin);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('skin', skin);
  }, [skin]);

  const changeSkin = () => {
    setSkin(prevSkin =>
      prevSkin === SkinType.DARK ? SkinType.LIGHT : SkinType.DARK,
    );
  };

  return (
    <SkinContext.Provider value={{skin, changeSkin}}>
      {children}
    </SkinContext.Provider>
  );
};
