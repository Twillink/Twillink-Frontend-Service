'use client';
import {createContext, useEffect, useState} from 'react';

interface SkinContextType {
  skin?: string;
  changeSkin?: () => void;
}
export const SkinContext = createContext<SkinContextType>({});

export const SkinProvider = ({children}: any) => {
  const [skin, setSkin] = useState<string>(
    () => localStorage.getItem('skin') || 'skinLight',
  );

  useEffect(() => {
    localStorage.setItem('skin', skin);
  }, [skin]);

  const changeSkin = () => {
    setSkin(prev => (prev === 'skinLight' ? 'skinDark' : 'skinLight'));
  };
  return (
    <SkinContext.Provider value={{skin, changeSkin}}>
      {children}
    </SkinContext.Provider>
  );
};
