'use client';

import React from 'react';
import WidgetLink from '@/components/widgets/WidgetLink';
import WidgetText from '@/components/widgets/WidgetText';
import {Widget} from '@/components/WidgetEditor';

interface WidgetContainerProps {
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

const WidgetContainer: React.FC<WidgetContainerProps> = ({
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
            onClick={e => {
              e.preventDefault();
            }}
          />
        );
      case WidgetTypes.Text:
        return (
          <WidgetText
            text={values.text}
            onClick={e => {
              e.preventDefault();
            }}
          />
        );
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
      className="flex align-middle items-center justify-center p-[6px] h-[120px] cursor-move"
      style={{
        width: values.width,
      }}>
      {renderWidget()}
    </div>
  );
};

export default WidgetContainer;
