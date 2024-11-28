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
  urlThumbnail?: string;
  video?: string;
  content?: string;
  key?: string;
  value?: string;
  latitude?: number;
  longitude?: number;
  files?: string[];
  urlWebinar?: string;
  description?: string;
  webinarType?: string;
  passcode?: string;
  notes?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  date?: string;
  contents?: string;
  widgetCarouselAttachment?: WidgetCarouselAttachment[];
}

export interface IItemWidgetType {
  id: number;
  idEditor: string;
  order: number;
  width: string;
  height?: string;
  type: WidgetTypeEnum;
  value?: IItemWidgetTypeValues | null;
}
