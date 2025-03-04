'use client';

import React, { useContext, useMemo } from 'react';
import WidgetLink from '@/components/widgets/WidgetLink';
import WidgetText from '@/components/widgets/WidgetText';
import { WidgetTypeEnum } from '@/libs/types/WidgetTypeEnum';
import { IItemWidgetType } from '@/libs/types/IItemWidgetType';
// import WidgetFrameEditor from './WidgetFrameEditor';
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
import WidgetWebinar from '@/components/widgets/WidgetWebinar';

interface IWidgetContainerView {
  handleDrag?: (ev: React.DragEvent<HTMLDivElement>) => void;
  handleDrop?: (ev: React.DragEvent<HTMLDivElement>) => void;
  values: IItemWidgetType;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleDelete: () => void;
  handleResize: () => void;
}

const WidgetContainerView: React.FC<IWidgetContainerView> = ({
  // handleDrag,
  // handleDrop,
  values,
  // handleMoveUp,
  // handleMoveDown,
  // handleDelete,
  // handleResize,
}) => {
  // const [isHovered, setIsHovered] = useState(false);
  // const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { preview, isMobileScreen } = useContext(PreviewContext);

  const isDesktop = useMemo(
    () => preview === PreviewTypeEnum.DESKTOP && !isMobileScreen,
    [preview, isMobileScreen],
  );

  const renderWidget = () => {
    {console.log(values.value)}

    switch (values.type) {
      case WidgetTypeEnum.Link:
        return (
          <div className={`relative flex z-[2] align-middle  items-center justify-center p-[6px] ${isDesktop ? 'h-32 lg:h-36 xl:h-40' : 'h-32'} cursor-move`}>
            <WidgetLink
              url={values.value?.url || '#'}
              text={values.value?.title || ''}
              image={values.value?.image}
              urlThumbnail={values.value?.urlThumbnail}
            // onClick={() => {
            //   window.open(values.value?.url || '#', '_blank');
            // }}
            />
          </div>
        );
      case WidgetTypeEnum.Text:
        return (
          <div className={`relative flex z-[2] align-middle  items-center justify-center p-[6px] ${isDesktop ? 'h-32 lg:h-36 xl:h-40' : 'h-32'} cursor-move`}>
            <WidgetText text={values.value?.text || ''} />
          </div>);
      case WidgetTypeEnum.Image:
        return (
          <div className={`relative flex z-[2] align-middle  items-center justify-center p-[6px] ${isDesktop ? 'h-32 lg:h-36 xl:h-40' : 'h-32'} cursor-move`}>
            <WidgetImage
              text={values.value?.caption || ''}
              url={values.value?.url || '#'}
              image={values.value?.image}
            />
          </div>
        );
      case WidgetTypeEnum.Video:
        return (
          <div className={`relative flex z-[2] align-middle  items-center justify-center p-[6px] ${isDesktop ? 'h-32 lg:h-36 xl:h-40' : 'h-32'} cursor-move`}>
            <WidgetVideo
              text={values.value?.caption || ''}
              url={values.value?.url || '#'}
              image={values.value?.image}
            />
          </div>
        );
      case WidgetTypeEnum.Blog:
        return (
          <div className={`relative flex z-[2] align-middle  items-center justify-center p-[6px] ${isDesktop ? 'h-32 lg:h-36 xl:h-40' : 'h-32'} cursor-move`}>
            <WidgetBlog
              title={values.value?.title || ''}
              content={values.value?.contents ?? ''}
              url={values.value?.url || '#'}
              image={values.value?.image}
            />
          </div>
        );

      case WidgetTypeEnum.Carousel:
        const attachmentIds =
          values.value?.widgetCarouselAttachment?.map(
            data => data.attachmentId,
          ) || [];

        return (
          <div className={`relative flex z-[2] align-middle  items-center justify-center p-[6px] ${isDesktop ? 'h-32 lg:h-36 xl:h-40' : 'h-[150px]'} cursor-move`}>
            <WidgetCarousel
              text={values.value?.caption || ''}
              url={values.value?.url || '#'}
              images={values.value?.images}
              attachmentIds={attachmentIds}
            />
          </div>
        );

      case WidgetTypeEnum.Map:
        return (
          <div className={`relative flex z-[2] align-middle  items-center justify-center p-[6px] ${isDesktop ? 'h-32 lg:h-36 xl:h-40' : 'h-32'} cursor-move`}>
            <WidgetMap
              caption={values.value?.caption || ''}
              latitude={values.value?.latitude || 0}
              longitude={values.value?.longitude || 0}
            />
          </div>
        );
      case WidgetTypeEnum.PDF:
        return (
          <div className={`relative flex z-[2] align-middle  items-center justify-center p-[6px] ${isDesktop ? 'h-32 lg:h-36 xl:h-40' : 'h-32'} cursor-move`}>
            <WidgetPdf
              text={values.value?.caption || ''}
              url={values.value?.url || ''}
              urlThumbnail={values.value?.urlThumbnail || ''}
              isFullWidth={values.width === '100%'}
            />
          </div>
        );

      case WidgetTypeEnum.Webinar:
        return (
          <div className={`relative flex z-[2] align-middle  items-center justify-center p-[6px] ${isDesktop ? 'h-[260px] lg:h-[280px] xl:h-[300px]' : 'h-[300px]'} cursor-move`}>
            <WidgetWebinar
              title={values.value?.title || ''}
              urlWebinar={values.value?.urlWebinar || ''}
              urlThumbnail={values.value?.urlThumbnail || undefined}
              isFullWidth={values.width === '100%'}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // const handleEdit = () => {
  //   setIsMenuVisible(!isMenuVisible);
  // };

  // const handleClose = () => {
  //   setIsMenuVisible(false);
  // };

  const widgetWidth = useMemo(() => {
    if (isDesktop) {
      return values.width === '100%' ? '50%' : '25%';
    }
    return values.width;
  }, [values?.width, isDesktop]);

  return (
    <div
      id={values.idEditor}
      draggable={false}
      style={{ width: widgetWidth }}>
      {/* <WidgetFrameEditor
        isHovered={isHovered}
        isMenuVisible={isMenuVisible}
        handleEdit={handleEdit}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleResize={handleResize}
        handleDelete={handleDelete}
        handleClose={handleClose}
        values={values}>
      </WidgetFrameEditor> */}
      {renderWidget()}
    </div>
  );
};

export default WidgetContainerView;
