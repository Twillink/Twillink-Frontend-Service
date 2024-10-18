import {WidgetTypeEnum} from './WidgetTypeEnum';

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
}

export interface IItemWidgetType {
  id: number;
  idEditor: string;
  order: number;
  width: string;
  type: WidgetTypeEnum;
  value?: IItemWidgetTypeValues | null;
}
