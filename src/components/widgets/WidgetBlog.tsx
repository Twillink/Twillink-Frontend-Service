'use client';

import React, {useContext, useMemo} from 'react';
import Image from 'next/image';
import SvgGlobe from '@/assets/svgComponents/SvgGlobe';
import Button from '@/components/Button';
import {
  PreviewContext,
  PreviewTypeEnum,
} from '@/libs/providers/PreviewProvider';
import PopupDetailBlog from '@/components/Popup/PopupDetailBlog';
import {usePopup} from '@/libs/providers/PopupProvider';
import PopupImage from '@/components/Popup/PopupImage';

interface IWidgetBlog {
  title: string;
  url: string;
  width?: string;
  image?: string | ArrayBuffer | null;
  urlThumbnail?: string;
  content?: string;
  isFullWidth?: boolean;
}

const WidgetBlog: React.FC<IWidgetBlog> = ({
  title,
  url,
  image,
  content,
  isFullWidth = true,
  ...restProps
}) => {
  const {preview, isMobileScreen} = useContext(PreviewContext);

  const isDesktop = useMemo(
    () => preview === PreviewTypeEnum.DESKTOP && !isMobileScreen,
    [preview, isMobileScreen],
  );

  const {openPopup} = usePopup();

  const handleOpen = () => {
    openPopup(
      'Detail Blog',
      <PopupDetailBlog
        dataBlog={{
          title: title,
          url: url,
          content: content,
        }}
      />,
      'xl:max-w-[40%]',
    );
  };

  const handleOpenImage = () => {
    openPopup('Image', <PopupImage url={url} />, 'xl:max-w-[40%]');
  };

  return (
    <div
      className={`border-base-300 border-2 bg-primary-content rounded-2xl h-full w-full p-2 flex items-center relative`}
      {...restProps}>
      <div className="flex justify-between items-start h-full w-full ">
        <div
          className={
            'flex flex-col justify-between items-start h-full gap-2 z-[1]'
          }>
          <div>
            <SvgGlobe width={32} height={32} className={'stroke-base-300'} />
            <div>
              <p
                className={`text-start text-xs mt-1 text-ellipsis ${isFullWidth ? 'line-clamp-3' : 'line-clamp-2'}  overflow-hidden font-medium w-full ${image ? 'w-1/2' : 'w-full'}`}>
                {title}
              </p>
            </div>
          </div>
          <div>
            <Button title={'View Blog'} size={'xs'} onClick={handleOpen} />
          </div>
        </div>
        <div
          id={`image-div-${url}`}
          className={` ${isDesktop ? 'h-[120px] w-full' : 'w-[200px] h-[88px]'} ${isFullWidth ? 'relative max-w-[50%]' : 'hidden'} rounded-lg overflow-hidden`}>
          {url && (
            <div className={'cursor-pointer'} onClick={handleOpenImage}>
              <Image
                src={url}
                alt={title}
                className="object-cover rounded-lg"
                fill
              />
            </div>
          )}
          {/*{!isFullWidth && (*/}
          {/*  <div*/}
          {/*    onClick={handleOpenImage}*/}
          {/*    className="absolute cursor-pointer inset-0 bg-base-100 blur-xs opacity-50"></div>*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  );
};

export default WidgetBlog;
