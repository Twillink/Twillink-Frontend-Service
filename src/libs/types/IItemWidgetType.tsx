import {WidgetTypeEnum} from './WidgetTypeEnum';

export interface IItemWidgetType {
  id: number;
  idEditor: string;
  order: number;
  width: string;
  type: WidgetTypeEnum;
  text: string;
  url?: string;
  image?: string | ArrayBuffer | null;
  images?: string[] | ArrayBuffer[] | null[];
}
