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

export interface IAddWidgetText {
  text: string;
}

export interface IAddWidgetVideo {
  caption: string;
  url: string;
  attachmentId?: string;
}

interface IAddWidgetContactEmail {
  email: string;
  phoneNumber?: string;
}

interface IAddWidgetContactPhoneNumber {
  email?: string;
  phoneNumber: string;
}

export type IAddWidgetContact =
  | IAddWidgetContactEmail
  | IAddWidgetContactPhoneNumber;
