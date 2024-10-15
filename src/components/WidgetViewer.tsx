'use client';

import React, {useMemo, useRef} from 'react';
import ScrollHideHeader from '@/components/widgets/ScrollHideHeader';
import UserProfile from '@/components/widgets/UserProfile';
import SocialContainer from '@/components/widgets/SocialContainer';
import WidgetContainerViewer from './widgets/WidgetContainerViewer';
import {IItemWidgetType} from '@/libs/types/IItemWidgetType';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';

interface IWidgetViewer {
  dataWidget: IItemWidgetType[];
}

const WidgetViewer: React.FC<IWidgetViewer> = ({dataWidget}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const dataContact = useMemo(() => {
    return dataWidget.filter(item => item.type === WidgetTypeEnum.Contact);
  }, [dataWidget]);

  const dataWidgetFiltered = useMemo(() => {
    return dataWidget.filter(
      item =>
        ![WidgetTypeEnum.Contact, WidgetTypeEnum.Social].includes(item.type),
    );
  }, [dataWidget]);

  const dataSocial = useMemo(() => {
    return dataWidget.filter(item => item.type === WidgetTypeEnum.Social);
  }, [dataWidget]);
  return (
    <>
      <div data-theme="light" className="h-full max-w-[428px]">
        <div
          className="artboard flex flex-col bg-base-100 h-full overflow-y-auto relative"
          ref={scrollContainerRef}>
          <ScrollHideHeader />
          <UserProfile contact={dataContact} />
          <div className="flex flex-wrap px-6">
            <SocialContainer data={dataSocial} />
            {dataWidgetFiltered
              .sort((a, b) => a.order - b.order)
              .map((widget, index) => (
                <WidgetContainerViewer
                  key={`widget-${index}`}
                  values={widget}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WidgetViewer;
