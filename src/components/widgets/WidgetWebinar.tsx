'use client';

import React, {useContext, useMemo} from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';
import {
  PreviewContext,
  PreviewTypeEnum,
} from '@/libs/providers/PreviewProvider';
import {usePopup} from '@/libs/providers/PopupProvider';
import PopupImage from '@/components/Popup/PopupImage';

interface IWidgetWebinar {
  title: string;
  urlWebinar: string;
  isFullWidth?: boolean;
  image?: string | ArrayBuffer | null;
  urlThumbnail?: string;
  onClick?: () => void;
}

const WidgetWebinar: React.FC<IWidgetWebinar> = ({
  title,
  urlWebinar,
  image,
  urlThumbnail = '/images/placeholder-webinar.png',
  isFullWidth = true,
  ...restProps
}) => {
  const {preview, isMobileScreen} = useContext(PreviewContext);

  const isDesktop = useMemo(
    () => preview === PreviewTypeEnum.DESKTOP && !isMobileScreen,
    [preview, isMobileScreen],
  );

  const {openPopup} = usePopup();

  const handleOpenImage = () => {
    openPopup('Image', <PopupImage url={urlThumbnail ?? ''} />, 'max-w-[40%]');
  };

  return (
    <div
      className="border-base-300 border-2 bg-primary-content rounded-2xl h-full w-full p-2 flex items-center relative"
      {...restProps}>
      <div
        className={`flex ${!isFullWidth ? 'flex-col' : 'flex-row'} justify-between items-center w-full h-full gap-2`}>
        <div
          className={`flex flex-col justify-center items-start h-full gap-1`}>
          <div>
            <div>
              <p
                className={`text-start mt-1 text-sm text-ellipsis ${isFullWidth ? 'line-clamp-3' : 'line-clamp-2'}  overflow-hidden font-semibold w-full ${image ? 'w-1/2' : 'w-full'} `}>
                {title}
              </p>
            </div>
          </div>
          <div>
            <Link
              href={
                urlWebinar.includes('http')
                  ? urlWebinar
                  : `https://${urlWebinar}`
              }
              passHref
              target={'_blank'}>
              <Button className={'z-30'} title={'Join Webinar'} size={'xs'} />
            </Link>
          </div>
        </div>
        <div
          id={`image-div-${urlThumbnail}`}
          className={` ${isDesktop ? 'h-[120px] w-full' : 'w-[200px] h-[88px]'} ${isFullWidth ? 'relative max-w-[50%]' : 'hidden'} rounded-lg overflow-hidden`}>
          {urlThumbnail && (
            <div className={'cursor-pointer'} onClick={handleOpenImage}>
              <Image
                src={urlThumbnail}
                alt={title}
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

export default WidgetWebinar;
