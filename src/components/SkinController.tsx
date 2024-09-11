'use client';
import {SkinContext, SkinType} from '@/providers/SkinContext';
import React, {useContext} from 'react';
import Sun from '@/assets/svg/Sun-2.svg';
import Moon from '@/assets/svg/Moon-1.svg';
import Image from 'next/image';

export default function SkinController() {
  const {skin, changeSkin} = useContext(SkinContext);
  return (
    <div>
      <label className="grid cursor-pointer place-items-center">
        <input
          type="checkbox"
          name="theme-dropdown"
          className="toggle theme-controller bg-primary-content col-span-2 col-start-1 row-start-1 h-8 w-60px border-base-200 border-2 [--tglbg:theme(colors.base-200)] toggle-custom"
          onChange={changeSkin}
          checked={skin === SkinType.LIGHT ? false : true}
        />
        <Image
          className="col-start-2 row-start-1 [[data-theme=skinDark]_&]:hidden m-1"
          src={Sun}
          alt="button-light"
          width={20}
        />
        <Image
          className="col-start-1 row-start-1 [[data-theme=skinLight]_&]:hidden m-1"
          src={Moon}
          alt="button-dark"
          width={20}
        />
      </label>
    </div>
  );
}
