'use client';

import React, {useMemo} from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/navigation';

interface IWidgetMap {
  caption: string;
  latitude: number;
  longitude: number;
}

const WidgetMap: React.FC<IWidgetMap> = ({
  caption,
  latitude,
  longitude,
  ...restProps
}) => {
  const router = useRouter();

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map'), {
        loading: () => <p>loading . . .</p>,
        ssr: false,
      }),
    [latitude, longitude],
  );

  return (
    <div
      className="border-base-300 bg-primary-content border-2 rounded-2xl h-full w-full flex items-center relative"
      {...restProps}>
      <div
        className="flex justify-between items-center w-full gap-2 h-full rounded-2xl overflow-hidden relative"
        onClick={() =>
          router.push(
            `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=${20}/${latitude}/${longitude}`,
          )
        }>
        <p
          className={`hidden text-center text-xs text-ellipsis line-clamp-3 overflow-hidden font-normal w-fit  z-[3] absolute bg-base-200 left-2 right-2 bottom-2 px-2 py-1 rounded-lg`}>
          {caption}
        </p>
        {latitude && longitude && (
          <Map
            position={[latitude, longitude]}
            zoom={20}
            popup={'Selected Location'}
          />
        )}
      </div>
    </div>
  );
};

export default WidgetMap;
