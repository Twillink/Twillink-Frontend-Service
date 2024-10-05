'use client';

import React, {useState} from 'react';
import WidgetLink from '@/components/widgets/WidgetLink';
import WidgetText from '@/components/widgets/WidgetText';
import {WidgetTypeEnum} from '@/libs/WidgetTypeEnum';
import {IItemWidgetType} from '@/libs/IItemWidgetType';
import WidgetFrameEditor from './WidgetFrameEditor';

interface IWidgetContainer {
  handleDrag?: (ev: React.DragEvent<HTMLDivElement>) => void;
  handleDrop?: (ev: React.DragEvent<HTMLDivElement>) => void;
  values: IItemWidgetType;
  setDataWidget?: React.Dispatch<React.SetStateAction<IItemWidgetType[]>>;
}

const WidgetContainer: React.FC<IWidgetContainer> = ({
  handleDrag,
  handleDrop,
  values,
  setDataWidget,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const renderWidget = () => {
    switch (values.type) {
      case WidgetTypeEnum.Link:
        return (
          <WidgetLink
            url={values.url || '#'}
            text={values.text}
            image={values.image}
            width={values.width}
            onClick={e => {
              e.preventDefault();
            }}
          />
        );
      case WidgetTypeEnum.Text:
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

  const handleEdit = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleDelete = () => {
    if (setDataWidget) {
      setDataWidget(prevWidgets =>
        prevWidgets.filter(widget => widget.id !== values.id),
      );
    }
  };

  const handleResize = () => {
    const newWidth = values.width === '50%' ? '100%' : '50%';
    if (setDataWidget) {
      setDataWidget(prevWidgets =>
        prevWidgets.map(widget =>
          widget.id === values.id ? {...widget, width: newWidth} : widget,
        ),
      );
    }
  };

  const handleClose = () => {
    setIsMenuVisible(false);
  };

  return (
    <div
      id={values.id}
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
