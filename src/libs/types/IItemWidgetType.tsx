import {WidgetTypeEnum} from './WidgetTypeEnum';

export interface IItemWidgetType {
  id: number;
  idEditor: string;
  order: number;
  width: string;
  type: WidgetTypeEnum;
  value?: {
    url?: string;
    title?: string;
    image?: string;
    text?: string;
  } | null;
}
