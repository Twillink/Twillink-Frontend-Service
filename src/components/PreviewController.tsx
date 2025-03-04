'use client';

import React, {useContext, useMemo} from 'react';
import {
  PreviewContext,
  PreviewTypeEnum,
} from '@/libs/providers/PreviewProvider';
import {MotionDiv} from '@/libs/motion/motion';
import SvgLaptop from '@/assets/svgComponents/SvgLaptop';
import SvgMobile from '@/assets/svgComponents/SvgMobile';

const PreviewController: React.FC = () => {
  const {preview, changePreview, isMobileScreen} = useContext(PreviewContext);

  const isDesktop = useMemo(
    () => preview === PreviewTypeEnum.DESKTOP,
    [preview],
  );

  if (isMobileScreen) {
    return null;
  }

  return (
    <div className="grid cursor-pointer place-items-center">
      <button
        className="relative w-20 h-8 p-0 rounded-md overflow-hidden"
        onClick={changePreview}
        aria-label={
          !isDesktop ? 'Switch to mobile view' : 'Switch to desktop view'
        }>
        <MotionDiv
          className="absolute inset-0 rounded-md bg-primary"
          initial={false}
          animate={{x: isDesktop ? '-50%' : '50%'}}
          transition={{type: 'spring', stiffness: 300, damping: 30}}
          style={{width: '200%', left: '-50%'}}
        />
        <span className="relative z-10 flex items-center justify-center w-1/2 h-full float-right">
          <SvgMobile
            width={24}
            height={24}
            className={`${isDesktop ? 'stroke-primary' : 'stroke-primary-content'}`}
          />
        </span>
        <span className="relative z-10 flex items-center justify-center w-1/2 h-full float-left">
          <SvgLaptop
            width={24}
            height={24}
            className={`${isDesktop ? 'stroke-primary-content' : 'stroke-primary'}`}
          />
        </span>
      </button>
    </div>
  );
};

export default PreviewController;
