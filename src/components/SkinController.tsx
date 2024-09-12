'use client';
import {SkinContext, SkinType} from '@/providers/SkinContext';
import React, {useContext} from 'react';
import SvgSun from '@/assets/svgComponents/SvgSun';
import SvgMoon from '@/assets/svgComponents/SvgMoon';

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
        <SvgSun
          className="col-start-2 row-start-1 [[data-theme=skinDark]_&]:hidden m-1 stroke-general-med"
          height={20}
        />
        <SvgMoon
          className="col-start-1 row-start-1 [[data-theme=skinLight]_&]:hidden m-1 stroke-general-med"
          height={20}
        />
      </label>
    </div>
  );
}
