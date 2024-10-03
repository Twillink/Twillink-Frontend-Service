'use client';

import React from 'react';
import WidgetLink from '@/components/widgets/WidgetLink';
import WidgetText from '@/components/widgets/WidgetText';
import {IItemWidgetType} from '@/libs/IItemWidgetType';
import {WidgetTypeEnum} from '@/libs/WidgetTypeEnum';

interface IWidgetContainerViewer {
  handleDrag?: (ev: React.DragEvent<HTMLDivElement>) => void;
  handleDrop?: (ev: React.DragEvent<HTMLDivElement>) => void;
  values: IItemWidgetType;
}

const WidgetContainerViewer: React.FC<IWidgetContainerViewer> = ({
  handleDrag,
  handleDrop,
  values,
}) => {
  const renderWidget = () => {
    switch (values.type) {
      case WidgetTypeEnum.Link:
        return (
          <WidgetLink
            url={values.url || '#'}
            text={values.text}
            image={values.image}
          />
        );
      case WidgetTypeEnum.Text:
        return <WidgetText text={values.text} />;
      default:
        return null;
    }
  };

  return (
    <div
      id={values.id}
      draggable
      onDragStart={handleDrag}
      onDrop={handleDrop}
      onDragOver={ev => ev.preventDefault()}
      className="flex align-middle items-center justify-center p-[6px] h-[120px]"
      style={{
        width: values.width,
      }}>
      {renderWidget()}
    </div>
  );
};

export default WidgetContainerViewer;
