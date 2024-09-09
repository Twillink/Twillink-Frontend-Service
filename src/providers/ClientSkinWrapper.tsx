'use client';
import {useContext} from 'react';
import {SkinContext} from './SkinContext';

export default function ClientThemeWrapper({children}: any) {
  const {skin} = useContext(SkinContext);
  return <div data-theme={skin}>{children}</div>;
}
