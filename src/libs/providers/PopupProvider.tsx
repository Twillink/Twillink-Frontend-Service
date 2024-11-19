'use client';

import React, {createContext, ReactNode, useContext, useState} from 'react';
import PopupContainer from '@/components/PopupContainer';

interface IPopupContext {
  isOpen: boolean;
  openPopup: (title: string, component: ReactNode, className?: string) => void;
  closePopup: () => void;
}

const PopupContext = createContext<IPopupContext | undefined>(undefined);

interface PopupProviderProps {
  children: ReactNode;
}

export const PopupProvider: React.FC<PopupProviderProps> = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [component, setComponent] = useState<ReactNode>(null);
  const [className, setClassName] = useState<string>('');

  const openPopup = (
    popupTitle: string,
    popupComponent: ReactNode,
    className = '',
  ) => {
    setTitle(popupTitle);
    setComponent(popupComponent);
    setIsOpen(true);
    setClassName(className);
  };

  const closePopup = () => {
    setIsOpen(false);
    setTitle('');
    setComponent(null);
  };

  return (
    <PopupContext.Provider value={{isOpen, openPopup, closePopup}}>
      {children}
      <PopupContainer
        title={title}
        isOpen={isOpen}
        onClose={closePopup}
        className={className}>
        {component}
      </PopupContainer>
    </PopupContext.Provider>
  );
};

export const usePopup = (): IPopupContext => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};
