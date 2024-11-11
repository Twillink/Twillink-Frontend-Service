'use client';

import React from 'react';
import Image from 'next/image';
import SvgGlobe from '@/assets/svgComponents/SvgGlobe';
import Button from '@/components/Button';
import Link from 'next/link';

interface IWidgetBlog {
  text: string;
  url: string;
  width?: string;
  image?: string | ArrayBuffer | null;
}

const WidgetBlog: React.FC<IWidgetBlog> = ({
  text,
  url,
  image,
  ...restProps
}) => {
  return (
    <div
      className="border-base-300 border-2 rounded-2xl h-full w-full p-2 flex items-center"
      {...restProps}>
      <div className="flex justify-between items-start w-full ">
        <div
          className={'flex flex-col justify-between items-start h-full gap-2'}>
          <div>
            <SvgGlobe width={32} height={32} />
          </div>
          <div>
            <p
              className={`text-start text-xs text-ellipsis line-clamp-3 overflow-hidden font-normal w-full ${image ? 'w-1/2' : 'w-full'}`}>
              {text}
            </p>
          </div>
          <div>
            <Link href={url} passHref target={'_blank'}>
              <Button title={'Visit Link'} size={'xs'} />
            </Link>
          </div>
        </div>
        <div>
          {image && (
            <Image
              src={typeof image === 'string' ? image : ''}
              alt={text}
              className="w-1/2 object-cover h-[90px] rounded-lg"
              width={100}
              height={100}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetBlog;
