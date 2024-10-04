'use client';

import React, {useContext} from 'react';
import {SkinContext} from '@/providers/SkinContext';
import SvgSun from '@/assets/svgComponents/SvgSun';
import SvgMoon from '@/assets/svgComponents/SvgMoon';
import {SkinTypeEnum} from '@/libs/SkinTypeEnum';

const SkinController: React.FC = () => {
  const {skin, changeSkin} = useContext(SkinContext);

  const isLightMode = skin === SkinTypeEnum.LIGHT;

  return (
    <div>
      <label className="grid cursor-pointer place-items-center">
        <input
          type="checkbox"
          name="theme-dropdown"
          className="toggle theme-controller bg-primary-content col-span-2 col-start-1 row-start-1 h-8 w-60px border-base-200 border-2 [--tglbg:theme(colors.base-200)] toggle-custom"
          onChange={changeSkin}
          checked={!isLightMode}
        />
        <SvgSun
          className={`col-start-2 row-start-1 m-1 stroke-general-med ${isLightMode ? 'block' : 'hidden'}`}
          height={20}
        />
        <SvgMoon
          className={`col-start-1 row-start-1 m-1 stroke-general-med ${isLightMode ? 'hidden' : 'block'}`}
          height={20}
        />
      </label>
    </div>
  );
};

export default SkinController;
