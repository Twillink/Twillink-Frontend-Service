'use client';

import React from 'react';
import WidgetLink from '@/components/widgets/WidgetLink';
import WidgetText from '@/components/widgets/WidgetText';
import {Widget} from '@/components/WidgetEditor';

interface WidgetContainerViewerProps {
  handleDrag?: (ev: React.DragEvent<HTMLDivElement>) => void;
  handleDrop?: (ev: React.DragEvent<HTMLDivElement>) => void;
  values: Widget;
}

export enum WidgetTypes {
  Link = 'link',
  Text = 'text',
  Image = 'image',
  Video = 'video',
  Blog = 'blog',
  Contact = 'contact',
  Carousel = 'carousel',
  Map = 'map',
  Webinar = 'webinar',
  Schedule = 'schedule',
}

const WidgetContainerViewer: React.FC<WidgetContainerViewerProps> = ({
  handleDrag,
  handleDrop,
  values,
}) => {
  const renderWidget = () => {
    switch (values.type) {
      case WidgetTypes.Link:
        return (
          <WidgetLink
            url={values.url || '#'}
            text={values.text}
            image={values.image}
          />
        );
      case WidgetTypes.Text:
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
