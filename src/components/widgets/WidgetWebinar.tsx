'use client';

import React, { useContext, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';
import { PreviewContext, PreviewTypeEnum } from '@/libs/providers/PreviewProvider';
import { usePopup } from '@/libs/providers/PopupProvider';
import PopupImage from '@/components/Popup/PopupImage';

interface IData {
  date?: string;
  time?: string;
  title?: string;
  desc?: string;
  type?: string;
  price?: number;
}

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
  const { preview, isMobileScreen } = useContext(PreviewContext);
  const { openPopup } = usePopup();
  const [data, setData] = useState<IData | null>(null);

  const isDesktop = useMemo(
    () => preview === PreviewTypeEnum.DESKTOP && !isMobileScreen,
    [preview, isMobileScreen]
  );

  const handleOpenImage = () => {
    openPopup(
      'Image',
      <PopupImage url={urlThumbnail ?? ''} />, 'xl:max-w-[40%]'
    );
  };

  const fetchWebinarData = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Twilmeet/${urlWebinar}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch webinar data');

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('Error fetching webinar data:', error);
    }
  };

  useEffect(() => {
    fetchWebinarData();
  }, [urlWebinar]);

  return (
    <div
      className="border-base-300 border-2 bg-primary-content rounded-2xl h-full w-full p-2 flex items-center relative"
      {...restProps}
    >
      <div className="flex flex-col w-full h-full">
        <div className="z-[1]">
          <div className="w-full relative rounded-lg overflow-hidden" style={{ height: '150px' }}>
            {urlThumbnail && (
              <div className="cursor-pointer w-full h-full" onClick={handleOpenImage}>
                <Image src={urlThumbnail} alt={title} className="object-cover rounded-lg" fill />
              </div>
            )}
          </div>
          <div>
            <p className={`text-start mt-1 text-sm font-light ${isFullWidth ? 'line-clamp-3' : 'line-clamp-2'}`}>
              {data?.date}, {data?.time}
            </p>
            <p className="text-start mt-1 text-sm font-bold">{data?.title}</p>
            <p className="text-start mt-1 text-sm font-light">{data?.desc}</p>
          </div>
          <div className="pt-2 flex flex-row justify-between w-full">
            <Link
              href={
                urlWebinar.includes('http')
                  ? urlWebinar
                  : `${process.env.NEXT_PUBLIC_API_ROUTE}/webinar?id=${urlWebinar}`
              }
              passHref
              target="_blank"
            >
              <Button title={`Join ${data?.type ?? 'Webinar'}`} size="xs" />
            </Link>
            <div className="text-sm">
              {data?.price === 0 ? 'Free' : 'IDR'} {data?.price ?? ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetWebinar;