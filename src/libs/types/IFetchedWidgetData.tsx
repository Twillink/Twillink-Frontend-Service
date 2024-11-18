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
  id: string;
  widgetCarouselId: string;
  attachmentId: string;
}

export interface IFetchedWidgetCarousel {
  id: number;
  caption: string;
  widgetCarouselAttachment: WidgetCarouselAttachment[];
}

export interface IFetchedWidgetBlog {
  id: number;
  contents: string;
  title: string;
  url: string;
}

export interface IFetchedWidgetMap {
  id: number;
  caption: string;
  latitude: number;
  longitude: number;
}

export interface IFetchedWidgetPdf {
  caption?: string;
  url: string;
  urlThumbnail?: string;
}

export interface IFetchedWidgetWebinar {
  title: string;
  urlWebinar: string;
  urlThumbnail?: string;
  description?: string;
  webinarType?: string;
  passcode?: string;
  notes?: string;
  startDate?: string;
  endDate?: string;
  date?: string;
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
  widgetBlog?: IFetchedWidgetBlog | null;
  widgetMap?: IFetchedWidgetMap | null;
  widgetPdf?: IFetchedWidgetPdf | null;
  widgetWebinar?: IFetchedWidgetWebinar | null;
  width: string;
}
