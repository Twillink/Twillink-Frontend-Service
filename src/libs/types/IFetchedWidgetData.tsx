import {WidgetTypeEnum} from './WidgetTypeEnum';

export interface IFetchedWidgetData {
  id: number;
  sequence: number;
  typeWidget: WidgetTypeEnum;
  widgetLink?: {
    title: string;
    url: string;
    image: string;
  } | null;
  widgetText?: {
    text: string;
  } | null;
}
