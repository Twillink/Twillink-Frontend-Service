import {WidgetTypeEnum} from './WidgetTypeEnum';

export interface IItemWidgetType {
  id: number;
  order: number;
  width: string;
  type: WidgetTypeEnum;
  text: string;
  url?: string;
  image?: string | ArrayBuffer | null;
}
