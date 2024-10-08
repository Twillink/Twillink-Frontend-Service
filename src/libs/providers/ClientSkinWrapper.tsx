'use client';

import React, {ReactNode, useContext} from 'react';
import {SkinContext} from './SkinContext';

interface IClientThemeWrapper {
  children: ReactNode;
}

const ClientThemeWrapper: React.FC<IClientThemeWrapper> = ({children}) => {
  const {skin} = useContext(SkinContext);

  return <div data-theme={skin}>{children}</div>;
};

export default ClientThemeWrapper;
