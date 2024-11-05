import {WidgetTypeEnum} from './WidgetTypeEnum';

export interface IFetchedWidgetLink {
  title: string;
  url: string;
  image?: string;
}

export interface IFetchedWidgetText {
  text: string;
}

export interface IFetchedWidgetImage {
  caption: string;
  url: string;
  attachmentId?: string;
}

export interface IFetchedWidgetVideo {
  caption: string;
  url: string;
  attachmentId?: string;
}

export interface IFetchedWidgetContact {
  email: string;
  phoneNumber: string;
}

export interface WidgetCarouselAttachment {
  id: number;
  widgetCarouselId: number;
  attachmentId: number;
}

export interface IFetchedWidgetCarousel {
  id: number;
  caption: string;
  widgetCarouselAttachment: WidgetCarouselAttachment[];
}

export interface IFetchedWidgetData {
  id: number;
  sequence: number;
  typeWidget: WidgetTypeEnum;
  widgetLink?: IFetchedWidgetLink | null;
  widgetText?: IFetchedWidgetText | null;
  widgetImage?: IFetchedWidgetImage | null;
  widgetVideo?: IFetchedWidgetVideo | null;
  widgetContact?: IFetchedWidgetContact | null;
  widgetCarousel?: IFetchedWidgetCarousel | null;
  width: string;
}
