'use client';

import React, {useContext, useEffect, useMemo, useState} from 'react';
import Image from 'next/image';
import SvgGlobe from '@/assets/svgComponents/SvgGlobe';
import Button from '@/components/Button';
import Link from 'next/link';
import {
  PreviewContext,
  PreviewTypeEnum,
} from '@/libs/providers/PreviewProvider';

interface IWidgetLink {
  text: string;
  url: string;
  width?: string;
  image?: string | ArrayBuffer | null;
  urlThumbnail?: string;
  onClick?: () => void;
}

const WidgetLink: React.FC<IWidgetLink> = ({
  text,
  url,
  image,
  urlThumbnail,
  onClick,
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
      className="border-base-300 border-2 rounded-2xl h-full w-full p-2 flex items-center relative"
      {...restProps}>
      <div className="flex justify-between items-center w-full h-full gap-2">
        <div
          className={'flex flex-col justify-between items-start h-full gap-1'}>
          <div>
            <SvgGlobe width={32} height={32} />
          </div>
          <div>
            <p
              className={`text-start text-xs text-ellipsis ${isDivWideEnough ? 'line-clamp-3' : 'line-clamp-2'}  overflow-hidden font-normal w-full ${image ? 'w-1/2' : 'w-full'} `}>
              {text}
            </p>
          </div>
          <div>
            <Link href={url} passHref target={'_blank'}>
              <Button
                onClick={onClick}
                className={'z-30'}
                title={'Visit Link'}
                size={'xs'}
              />
            </Link>
          </div>
        </div>
        {/*{isDivWideEnough && (*/}
        <div
          id={`image-div-${urlThumbnail}`}
          className={` ${isDesktop ? 'h-[120px] w-full' : 'w-[200px] h-[88px]'} ${isDivWideEnough ? 'relative max-w-[50%]' : 'absolute w-full h-full z-[-1] top-0 left-0 bottom-0 blur-[0px]'} rounded-lg overflow-hidden`}>
          {urlThumbnail && (
            <Image
              src={urlThumbnail}
              alt={text}
              className="object-cover rounded-lg"
              fill
            />
          )}
        </div>
        {/*)}*/}
      </div>
    </div>
  );
};

export default WidgetLink;
