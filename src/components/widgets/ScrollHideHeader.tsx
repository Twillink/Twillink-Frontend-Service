'use client';

import SvgPlus from '@/assets/svgComponents/SvgPlus';
import Image from 'next/image';
import React, {useCallback, useEffect, useRef, useState} from 'react';

interface ScrollHideHeaderProps {
  onClickBanner: () => void;
  urlBanner?: string;
}

const ScrollHideHeader = ({
  onClickBanner,
  urlBanner,
}: ScrollHideHeaderProps) => {
  const [scrollOffset, setScrollOffset] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const headerHeight = 136;

  const handleScroll = useCallback(() => {
    const headerElement = headerRef.current;
    if (headerElement) {
      const scrollContainer = headerElement.parentElement;
      if (scrollContainer) {
        const currentScrollY = scrollContainer.scrollTop;
        const offset = Math.min(currentScrollY, headerHeight);
        setScrollOffset(offset);
      }
    }
  }, [headerHeight]);

  useEffect(() => {
    const headerElement = headerRef.current;
    const scrollContainer = headerElement?.parentElement;
    scrollContainer?.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // useEffect(() => {
  //   if (selectedImage) {
  //     const url = URL.createObjectURL(selectedImage);
  //     setImageUrl(url);
  //
  //     return () => {
  //       URL.revokeObjectURL(url);
  //     };
  //   } else {
  //     setImageUrl(null);
  //   }
  // }, [selectedImage]);

  return (
    <div
      ref={headerRef}
      onClick={onClickBanner}
      style={{
        transform: `translateY(-${scrollOffset}px)`,
        transition: 'transform 0.1s ease-out',
      }}
      className={`sticky z-10 w-full bg-base-200 cursor-pointer shadow-md rounded-2xl`}>
      <label htmlFor="file-upload-header" className="cursor-pointer">
        {urlBanner ? (
          <div className="flex justify-center">
            <Image
              src={urlBanner}
              alt="Selected Preview"
              className={`max-w-full h-[136px] w-full object-cover`}
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        ) : (
          <div className={`h-[136px] flex justify-center items-center`}>
            <div className="flex text-neutral-content items-center gap-3 font-normal text-base">
              <SvgPlus height={16} className="stroke-neutral-content" />
              <div>Browse Image</div>
            </div>
          </div>
        )}
      </label>
    </div>
  );
};

export default ScrollHideHeader;
