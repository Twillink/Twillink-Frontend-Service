'use client';

import React, {useContext, useMemo, useState} from 'react';
import WidgetLink from '@/components/widgets/WidgetLink';
import WidgetText from '@/components/widgets/WidgetText';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {IItemWidgetType} from '@/libs/types/IItemWidgetType';
import WidgetFrameEditor from './WidgetFrameEditor';
import WidgetImage from './WidgetImage';
import WidgetVideo from './WIdgetVideo';
import WidgetCarousel from './WidgetCarousel';
import {
  PreviewContext,
  PreviewTypeEnum,
} from '@/libs/providers/PreviewProvider';
import WidgetBlog from '@/components/widgets/WidgetBlog';
import WidgetMap from '@/components/widgets/WidgetMap';
import WidgetPdf from '@/components/widgets/WidgetPdf';

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

  const {preview, isMobileScreen} = useContext(PreviewContext);

  const isDesktop = useMemo(
    () => preview === PreviewTypeEnum.DESKTOP && !isMobileScreen,
    [preview, isMobileScreen],
  );

  const renderWidget = () => {
    switch (values.type) {
      case WidgetTypeEnum.Link:
        return (
          <WidgetLink
            url={values.value?.url || '#'}
            text={values.value?.title || ''}
            image={values.value?.image}
            urlThumbnail={values.value?.urlThumbnail}
            // onClick={() => {
            //   window.open(values.value?.url || '#', '_blank');
            // }}
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
            text={values.value?.caption || ''}
            url={values.value?.url || '#'}
            image={values.value?.image}
          />
        );
      case WidgetTypeEnum.Blog:
        return (
          <WidgetBlog
            title={values.value?.title || ''}
            url={values.value?.url || '#'}
            image={values.value?.image}
          />
        );

      case WidgetTypeEnum.Carousel:
        const attachmentIds =
          values.value?.widgetCarouselAttachment?.map(
            data => data.attachmentId,
          ) || [];

        return (
          <WidgetCarousel
            text={values.value?.caption || ''}
            url={values.value?.url || '#'}
            images={values.value?.images}
            attachmentIds={attachmentIds}
          />
        );

      case WidgetTypeEnum.Map:
        return (
          <WidgetMap
            caption={values.value?.caption || ''}
            latitude={values.value?.latitude || 0}
            longitude={values.value?.longitude || 0}
          />
        );
      case WidgetTypeEnum.PDF:
        return (
          <WidgetPdf
            text={values.value?.caption || ''}
            url={values.value?.url || ''}
            urlThumbnail={values.value?.urlThumbnail || ''}
            isFullWidth={values.width === '100%'}
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

  const widgetWidth = useMemo(() => {
    if (isDesktop) {
      return values.width === '100%' ? '50%' : '25%';
    }
    return values.width;
  }, [values?.width, isDesktop]);

  return (
    <div
      id={values.idEditor}
      draggable
      onDragStart={handleDrag}
      onDrop={handleDrop}
      onDragOver={ev => ev.preventDefault()}
      className={`relative flex z-[2] align-middle  items-center justify-center p-[6px] ${isDesktop ? 'h-32 lg:h-36 xl:h-40' : 'h-32'} cursor-move`}
      style={{width: widgetWidth}}
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
