'use client';

import React, {useRef} from 'react';
import ScrollHideHeader from '@/components/widgets/ScrollHideHeader';
import UserProfile from '@/components/widgets/UserProfile';
import SocialContainer from '@/components/widgets/SocialContainer';
import {Widget} from '@/components/WidgetEditor';
import WidgetContainerViewer from './widgets/WidgetContainerViewer';

interface WidgetViewerProps {
  dataWidget: Widget[];
}

const WidgetViewer: React.FC<WidgetViewerProps> = ({dataWidget}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <div data-theme="light" className="h-full max-w-[428px]">
        <div
          className="artboard flex flex-col bg-base-100 h-full overflow-y-auto relative"
          ref={scrollContainerRef}>
          <ScrollHideHeader />
          <UserProfile />
          <div className="flex flex-wrap px-6">
            <SocialContainer />
            {dataWidget
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
