import {IFetchedWidgetData} from '@/libs/types/IFetchedWidgetData';
import {IItemWidgetType} from '@/libs/types/IItemWidgetType';
import {generateUniqueString} from './generateUniqueString';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';

export const formatWidgetData = (item: IFetchedWidgetData): IItemWidgetType => {
  return {
    id: item.id,
    idEditor: generateUniqueString(),
    order: item.sequence,
    width: item.width ?? '100%',
    type: mapWidgetType(item.typeWidget),
    value: mapWidgetValue(item),
  };
};

const mapWidgetType = (typeWidget: string): WidgetTypeEnum => {
  const widgetTypeMap: Record<string, WidgetTypeEnum> = {
    [WidgetTypeEnum.Link]: WidgetTypeEnum.Link,
    [WidgetTypeEnum.Text]: WidgetTypeEnum.Text,
    [WidgetTypeEnum.Image]: WidgetTypeEnum.Image,
    [WidgetTypeEnum.Video]: WidgetTypeEnum.Video,
    [WidgetTypeEnum.Contact]: WidgetTypeEnum.Contact,
    [WidgetTypeEnum.Carousel]: WidgetTypeEnum.Carousel,
  };

  const type = widgetTypeMap[typeWidget];
  if (!type) return WidgetTypeEnum.Link;
  return type;
};

const mapWidgetValue = (item: IFetchedWidgetData) => {
  const {
    typeWidget,
    widgetLink,
    widgetText,
    widgetImage,
    widgetVideo,
    widgetContact,
    widgetCarousel,
  } = item;

  switch (typeWidget) {
    case WidgetTypeEnum.Link:
      return widgetLink ? widgetLink : undefined;
    case WidgetTypeEnum.Text:
      return widgetText ? widgetText : undefined;
    case WidgetTypeEnum.Image:
      return widgetImage ? widgetImage : undefined;
    case WidgetTypeEnum.Video:
      return widgetVideo ? widgetVideo : undefined;
    case WidgetTypeEnum.Contact:
      return widgetContact ? widgetContact : undefined;
    case WidgetTypeEnum.Carousel:
      return widgetCarousel ? widgetCarousel : undefined;
    default:
      return undefined;
  }
};
