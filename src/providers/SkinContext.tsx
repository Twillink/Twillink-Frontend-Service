'use client';
import {createContext, useEffect, useState} from 'react';

export enum SkinType {
  LIGHT = 'skinLight',
  DARK = 'skinDark',
}

interface SkinContextType {
  skin?: SkinType;
  changeSkin?: () => void;
}
export const SkinContext = createContext<SkinContextType>({});

export const SkinProvider = ({children}: any) => {
  const [skin, setSkin] = useState<SkinType>(SkinType.LIGHT);

  useEffect(() => {
    const skinLocal: any = localStorage.getItem('data');
    if (skinLocal) {
      setSkin(skinLocal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('skin', skin);
  }, [skin]);

  const changeSkin = () => {
    setSkin(prev => (prev === SkinType.DARK ? SkinType.LIGHT : SkinType.DARK));
  };

  return (
    <SkinContext.Provider value={{skin, changeSkin}}>
      {children}
    </SkinContext.Provider>
  );
};
