import {WidgetTypeEnum} from './WidgetTypeEnum';
import {WidgetCarouselAttachment} from '@/libs/types/IFetchedWidgetData';

export interface IItemWidgetTypeValues {
  url?: string;
  title?: string;
  image?: string;
  text?: string;
  images?: string[];
  email?: string;
  phoneNumber?: string;
  caption?: string;
  attachmentId?: string;
  widgetCarouselAttachment?: WidgetCarouselAttachment[];
}

export interface IItemWidgetType {
  id: number;
  idEditor: string;
  order: number;
  width: string;
  type: WidgetTypeEnum;
  value?: IItemWidgetTypeValues | null;
}
