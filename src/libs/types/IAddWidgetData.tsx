export interface IAddWidgetImage {
  caption: string;
  url: string;
  attachmentId?: string;
}

export interface IAddWidgetLink {
  title: string;
  url: string;
  image?: string;
}

export interface IAddWidgetMap {
  caption: string;
  latitude: number;
  longitude: number;
}

export interface IAddWidgetText {
  text: string;
}

export interface IAddWidgetVideo {
  caption: string;
  url: string;
  attachmentId?: string;
}

export interface IAddWidgetPdf {
  caption?: string;
  url: string;
  urlThumbnail?: string;
}

export interface IAddWidgetWebinar {
  title: string;
  urlWebinar: string;
  urlThumbnail?: string;
  description: string;
  webinarType: string;
  passcode?: string;
  notes?: string;
  startDate: string;
  endDate: string;
}

export interface IAddWidgetBlog {
  title: string;
  content: string;
  url: string;
}

export interface IAddWidgetCarousel {
  caption: string;
  attachmentIds: number[];
}

interface IAddWidgetContactEmail {
  email: string;
  phoneNumber?: string;
}

export interface IAddWidgetSocial {
  key: string;
  value: string;
}

interface IAddWidgetContactPhoneNumber {
  email?: string;
  phoneNumber: string;
}

export type IAddWidgetContact =
  | IAddWidgetContactEmail
  | IAddWidgetContactPhoneNumber;

export enum TypeWidthWidgetEnum {
  Full = '100%',
  Half = '50%',
}

export interface IChangeWidthWidget {
  id: number;
  width: TypeWidthWidgetEnum;
}

export interface IChangeOrderWidgetItem {
  id: number;
  sequence: number;
}
