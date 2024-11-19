'use client';

import React, {useContext, useMemo} from 'react';
import Image from 'next/image';
import SvgGlobe from '@/assets/svgComponents/SvgGlobe';
import Button from '@/components/Button';
import Link from 'next/link';
import {
  PreviewContext,
  PreviewTypeEnum,
} from '@/libs/providers/PreviewProvider';
import {usePopup} from '@/libs/providers/PopupProvider';
import PopupImage from '@/components/Popup/PopupImage';

interface IWidgetLink {
  text: string;
  url: string;
  width?: string;
  image?: string | ArrayBuffer | null;
  urlThumbnail?: string;
  onClick?: () => void;
  isFullWidth?: boolean;
}

const WidgetLink: React.FC<IWidgetLink> = ({
  text,
  url,
  image,
  urlThumbnail,
  isFullWidth = true,
  ...restProps
}) => {
  const {preview, isMobileScreen} = useContext(PreviewContext);

  const isDesktop = useMemo(
    () => preview === PreviewTypeEnum.DESKTOP && !isMobileScreen,
    [preview, isMobileScreen],
  );

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (document) {
  //       const imageDiv = document?.getElementById(`image-div-${urlThumbnail}`);
  //       if (imageDiv) {
  //         setIsDivWideEnough(imageDiv.offsetWidth >= 100);
  //       }
  //     }
  //   };
  //
  //   window.addEventListener('resize', handleResize);
  //   handleResize(); // Initial check
  //
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [window]);

  const {openPopup} = usePopup();

  const handleOpenImage = () => {
    openPopup('Image', <PopupImage url={urlThumbnail ?? ''} />, 'max-w-[40%]');
  };

  return (
    <div
      className="border-base-300 border-2 bg-primary-content rounded-2xl h-full w-full p-2 flex items-center relative"
      {...restProps}>
      <div className="flex justify-between items-center w-full h-full gap-2">
        <div
          className={'flex flex-col justify-between items-start h-full gap-1'}>
          <div>
            <SvgGlobe width={32} height={32} className={'stroke-base-300'} />
            <div>
              <p
                className={`text-start mt-1 text-xs text-ellipsis ${isFullWidth ? 'line-clamp-3' : 'line-clamp-2'}  overflow-hidden font-normal w-full ${image ? 'w-1/2' : 'w-full'} `}>
                {text}
              </p>
            </div>
          </div>
          <div>
            <Link
              href={url.includes('http') ? url : `https://${url}`}
              passHref
              target={'_blank'}>
              <Button className={'z-30'} title={'Visit Link'} size={'xs'} />
            </Link>
          </div>
        </div>
        <div
          id={`image-div-${urlThumbnail}`}
          className={` ${isDesktop ? 'h-[120px] w-full' : 'w-[200px] h-[88px]'} ${isFullWidth ? 'relative max-w-[50%]' : 'hidden'} rounded-lg overflow-hidden`}>
          {urlThumbnail && (
            <div
              onClick={urlThumbnail ? handleOpenImage : undefined}
              className={'cursor-pointer'}>
              <Image
                src={urlThumbnail}
                alt={text}
                className="object-cover rounded-lg"
                fill
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetLink;
