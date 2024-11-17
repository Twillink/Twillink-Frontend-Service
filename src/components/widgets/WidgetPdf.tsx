'use client';

import React, {useContext, useEffect, useMemo, useState} from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';
import {
  PreviewContext,
  PreviewTypeEnum,
} from '@/libs/providers/PreviewProvider';
import SvgPdfFile from '@/assets/svgComponents/SvgPdfFile';

interface IWidgetLink {
  text: string;
  url: string;
  width?: string;
  image?: string | ArrayBuffer | null;
  urlThumbnail?: string;
  isFullWidth?: boolean;
  onClick?: () => void;
}

const WidgetPdf: React.FC<IWidgetLink> = ({
  text,
  url,
  image,
  urlThumbnail,
  isFullWidth = true,
  ...restProps
}) => {
  const [isDivWideEnough, setIsDivWideEnough] = useState(true);

  const {preview, isMobileScreen} = useContext(PreviewContext);

  const isDesktop = useMemo(
    () => preview === PreviewTypeEnum.DESKTOP && !isMobileScreen,
    [preview, isMobileScreen],
  );

  useEffect(() => {
    const handleResize = () => {
      if (document) {
        const imageDiv = document?.getElementById(`image-div-${urlThumbnail}`);
        if (imageDiv) {
          setIsDivWideEnough(imageDiv.offsetWidth >= 100);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window]);

  return (
    <div
      className="border-base-300 border-2 bg-primary-content rounded-2xl h-full w-full p-2 flex items-center relative"
      {...restProps}>
      <div className="flex justify-between items-center w-full h-full gap-2">
        <div
          className={'flex flex-col justify-center items-start h-full gap-1'}>
          <div>
            <div>
              <p
                className={`text-start mt-1 text-xs text-ellipsis ${isDivWideEnough ? 'line-clamp-3' : 'line-clamp-2'}  overflow-hidden font-semibold w-full ${image ? 'w-1/2' : 'w-full'} `}>
                {text}
              </p>
            </div>
          </div>
          <div>
            <Link
              href={url.includes('http') ? url : `https://${url}`}
              passHref
              target={'_blank'}>
              <Button className={'z-30'} title={'Download PDF'} size={'xs'} />
            </Link>
          </div>
        </div>

        <div
          id={`image-div-${urlThumbnail}`}
          // absolute w-full h-full z-[-1] top-0 left-0 bottom-0 blur-[0px]
          className={` ${isDesktop ? 'h-[120px] w-full' : 'w-[200px] h-[88px]'} ${isFullWidth ? 'relative max-w-[50%]' : 'hidden'} rounded-lg overflow-hidden`}>
          {urlThumbnail && (
            <Image
              src={urlThumbnail}
              alt={text}
              className="object-cover rounded-lg"
              fill
            />
          )}
          {!urlThumbnail && (
            <SvgPdfFile
              width={isDesktop ? 'full' : 200}
              height={isDesktop ? 120 : 88}
              className={'w-full h-full'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetPdf;
