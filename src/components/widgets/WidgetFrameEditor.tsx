import React from 'react';
import SvgWidgetClose from '@/assets/svgComponents/SvgWidgetClose';
import SvgWidgetDelete from '@/assets/svgComponents/SvgWidgetDelete';
import SvgWidgetEdit from '@/assets/svgComponents/SvgWidgetEdit';
import SvgWidgetFull from '@/assets/svgComponents/SvgWidgetFull';
import SvgWidgetHalf from '@/assets/svgComponents/SvgWidgetHalf';
import {IItemWidgetType} from '@/libs/IItemWidgetType';

interface IWidgetFrameEditor {
  children: React.ReactNode;
  isHovered: boolean;
  isMenuVisible: boolean;
  handleEdit: () => void;
  handleResize: () => void;
  handleDelete: () => void;
  handleClose: () => void;
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
  values,
}) => {
  return (
    <div className="relative w-full h-full group rounded-lg">
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-lg"></div>
      <div className="absolute left-[-2px] top-1/2 transform -translate-y-1/2 h-6 w-1.5 bg-transparent group-hover:bg-base-100 group-hover:border-primary group-hover:border-2 rounded-full"></div>
      <div className="absolute right-[-2px] top-1/2 transform -translate-y-1/2 h-6 w-1.5 bg-transparent group-hover:bg-base-100 group-hover:border-primary group-hover:border-2 rounded-full"></div>
      <div className="h-full">{children}</div>
      {isHovered && (
        <div className="absolute flex items-center justify-center -top-1 -right-1 w-max rounded-full p-[6px] bg-primary z-10">
          {isMenuVisible ? (
            <div className="flex items-center justify-center gap-[10px]">
              <div onClick={handleDelete} className="cursor-pointer">
                <SvgWidgetDelete className="stroke-contras-high" />
              </div>
              <div onClick={handleResize} className="cursor-pointer">
                {values.width === '50%' ? (
                  <SvgWidgetFull className="stroke-contras-high" />
                ) : (
                  <SvgWidgetHalf className="stroke-contras-high" />
                )}
              </div>
              <div onClick={handleClose} className="cursor-pointer">
                <SvgWidgetClose className="stroke-contras-high" />
              </div>
            </div>
          ) : (
            <div onClick={handleEdit} className="cursor-pointer">
              <SvgWidgetEdit className="stroke-contras-high" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WidgetFrameEditor;
