'use client';

import React, {ReactNode, useContext} from 'react';
import {SkinContext} from './SkinContext';

interface ClientThemeWrapperProps {
  children: ReactNode;
}

const ClientThemeWrapper: React.FC<ClientThemeWrapperProps> = ({children}) => {
  const {skin} = useContext(SkinContext);

  return <div data-theme={skin}>{children}</div>;
};

export default ClientThemeWrapper;
