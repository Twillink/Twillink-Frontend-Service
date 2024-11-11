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

  const [dataWidgetFiltered, dataContact, dataSocial] = useMemo(() => {
    const filtered = [];
    let contact;
    const social = [];
    for (let i = 0; i < dataWidget.length; i++) {
      const item = dataWidget[i];
      if (item.type === WidgetTypeEnum.Contact) {
        contact = item;
      } else if (item.type === WidgetTypeEnum.Social) {
        social.push(item);
      } else {
        filtered.push(item);
      }
    }
    return [filtered, contact, social];
  }, [dataWidget]);

  return (
    <>
      <div
        data-theme="light"
        className="h-full max-w-[428px] overflow-hidden [&::-webkit-scrollbar]:w-2">
        <div
          className="artboard  flex flex-col bg-base-100 h-full overflow-y-auto relative"
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
