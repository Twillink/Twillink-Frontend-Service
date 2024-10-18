'use client';

import React, {useState} from 'react';
import WidgetLink from '@/components/widgets/WidgetLink';
import WidgetText from '@/components/widgets/WidgetText';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {IItemWidgetType} from '@/libs/types/IItemWidgetType';
import WidgetFrameEditor from './WidgetFrameEditor';
import WidgetImage from './WidgetImage';
import WidgetVideo from './WIdgetVideo';
import WidgetCarousel from './WidgetCarousel';

interface IWidgetContainer {
  handleDrag?: (ev: React.DragEvent<HTMLDivElement>) => void;
  handleDrop?: (ev: React.DragEvent<HTMLDivElement>) => void;
  values: IItemWidgetType;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleDelete: () => void;
  handleResize: () => void;
}

const WidgetContainer: React.FC<IWidgetContainer> = ({
  handleDrag,
  handleDrop,
  values,
  handleMoveUp,
  handleMoveDown,
  handleDelete,
  handleResize,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const renderWidget = () => {
    switch (values.type) {
      case WidgetTypeEnum.Link:
        return (
          <WidgetLink
            url={values.value?.url || '#'}
            text={values.value?.title || ''}
            image={values.value?.image}
            onClick={e => {
              e.preventDefault();
            }}
          />
        );
      case WidgetTypeEnum.Text:
        return (
          <WidgetText
            text={values.value?.text || ''}
            onClick={e => {
              e.preventDefault();
            }}
          />
        );
      case WidgetTypeEnum.Image:
        return (
          <WidgetImage
            text={values.value?.caption || ''}
            url={values.value?.url || '#'}
            image={values.value?.image}
            onClick={e => {
              e.preventDefault();
            }}
          />
        );
      case WidgetTypeEnum.Video:
        return (
          <WidgetVideo
            text={values.value?.text || ''}
            url={values.value?.url || '#'}
            image={values.value?.image}
          />
        );

      default:
        return null;
    }
  };

  const handleEdit = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleClose = () => {
    setIsMenuVisible(false);
  };

  if (values.type === WidgetTypeEnum.Carousel) {
    return (
      <WidgetCarousel
        text={values.value?.text || ''}
        url={values.value?.url || '#'}
        images={values.value?.images}
      />
    );
  }

  return (
    <div
      id={values.idEditor}
      draggable
      onDragStart={handleDrag}
      onDrop={handleDrop}
      onDragOver={ev => ev.preventDefault()}
      className="relative flex align-middle items-center justify-center p-[6px] h-[120px] cursor-move"
      style={{width: values.width}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <WidgetFrameEditor
        isHovered={isHovered}
        isMenuVisible={isMenuVisible}
        handleEdit={handleEdit}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleResize={handleResize}
        handleDelete={handleDelete}
        handleClose={handleClose}
        values={values}>
        {renderWidget()}
      </WidgetFrameEditor>
    </div>
  );
};

export default WidgetContainer;
