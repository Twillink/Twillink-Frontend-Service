'use client';

import React from 'react';
import WidgetLink from '@/components/widgets/WidgetLink';
import WidgetText from '@/components/widgets/WidgetText';
import {IItemWidgetType} from '@/libs/types/IItemWidgetType';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';

interface IWidgetContainerViewer {
  values: IItemWidgetType;
}

const WidgetContainerViewer: React.FC<IWidgetContainerViewer> = ({values}) => {
  const renderWidget = () => {
    switch (values.type) {
      case WidgetTypeEnum.Link:
        return (
          <WidgetLink
            url={values.value?.url || '#'}
            text={values.value?.text || ''}
            image={values.value?.image}
            width={''}
          />
        );
      case WidgetTypeEnum.Text:
        return <WidgetText text={values.value?.text || ''} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex align-middle items-center justify-center p-[6px] h-[120px]"
      style={{
        width: values.width,
      }}>
      {renderWidget()}
    </div>
  );
};

export default WidgetContainerViewer;
