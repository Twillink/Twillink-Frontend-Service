import React from 'react';
import SvgWidgetClose from '@/assets/svgComponents/SvgWidgetClose';
import SvgWidgetDelete from '@/assets/svgComponents/SvgWidgetDelete';
import SvgWidgetEdit from '@/assets/svgComponents/SvgWidgetEdit';
import SvgWidgetFull from '@/assets/svgComponents/SvgWidgetFull';
import SvgWidgetHalf from '@/assets/svgComponents/SvgWidgetHalf';
import { IItemWidgetType } from '@/libs/types/IItemWidgetType';
import SvgOrderDown from '@/assets/svgComponents/SvgOrderDown';
import SvgOrderUp from '@/assets/svgComponents/SvgOrderUp';
import { TypeWidthWidgetEnum } from '@/libs/types/IAddWidgetData';

interface IWidgetFrameEditor {
  children: React.ReactNode;
  isHovered: boolean;
  isMenuVisible: boolean;
  handleEdit: () => void;
  handleResize: () => void;
  handleDelete: () => void;
  handleClose: () => void;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  values: IItemWidgetType;
}

const WidgetFrameEditor: React.FC<IWidgetFrameEditor> = ({
  children,
  isHovered,
  isMenuVisible,
  handleEdit,
  handleResize,
  handleDelete,
  handleClose,
  handleMoveUp,
  handleMoveDown,
  values,
}) => {
  return (
    <div className="relative w-full h-full group rounded-2xl">
      <div className="z-[10] absolute left-[-2px] right-[-2px] top-[-2px] bottom-[-2px] inset-0 border-2 border-transparent z-[-1]  group-hover:border-primary rounded-2xl"></div>
      <div className="z-[10] absolute left-[-4px] top-1/2 transform -translate-y-1/2 h-6 w-1.5 bg-transparent group-hover:bg-base-100 group-hover:border-primary group-hover:border-2 rounded-full"></div>
      <div className="z-[10] absolute right-[-4px] top-1/2 transform -translate-y-1/2 h-6 w-1.5 bg-transparent group-hover:bg-base-100 group-hover:border-primary group-hover:border-2 rounded-full"></div>
      {isHovered && (
        <div className="z-[10] absolute flex items-center justify-center -top-1 -right-1 w-max rounded-full p-[6px] bg-primary">
          {isMenuVisible ? (
            <div className="flex items-center justify-center gap-[10px]">
              <div onClick={handleDelete} className="cursor-pointer">
                <SvgWidgetDelete className="stroke-base-100" height={16} />
              </div>
              <div onClick={handleMoveUp} className="cursor-pointer">
                <SvgOrderUp className="stroke-base-100" height={16} />
              </div>
              <div onClick={handleMoveDown} className="cursor-pointer">
                <SvgOrderDown className="stroke-base-100" height={16} />
              </div>
              {!["webinar", "consult", "class"].includes(values.type) &&
                <div onClick={handleResize} className="cursor-pointer">
                  {values.width === TypeWidthWidgetEnum.Half ? (
                    <SvgWidgetFull className="stroke-base-100" height={16} />
                  ) : (
                    <SvgWidgetHalf className="stroke-base-100" height={16} />
                  )}
                </div>
              }
              <div onClick={handleClose} className="cursor-pointer">
                <SvgWidgetClose className="stroke-base-100" height={16} />
              </div>
            </div>
          ) : (
            <div onClick={handleEdit} className="cursor-pointer flex self-start ">
              <SvgWidgetEdit className="stroke-base-100" height={16} />
            </div>
          )}
        </div>
      )}
      <div className="h-full z-[10]">{children}</div>
    </div>
  );
};

export default WidgetFrameEditor;
