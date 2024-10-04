import SvgPlus from '@/assets/svgComponents/SvgPlus';
import React, {ComponentProps} from 'react';

interface IAddWidget extends ComponentProps<'button'> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const AddWidget: React.FC<IAddWidget> = ({
  onClick,
  disabled = false,
  ...restProps
}) => {
  return (
    <div className="h-[120px] p-[6px] w-full mb-10">
      <button
        onClick={onClick}
        disabled={disabled}
        className="h-full cursor-pointer flex flex-col items-center w-full border-dashed border-2 border-base-300 rounded-2xl p-2"
        {...restProps}>
        <div className="h-full flex text-neutral-content items-center gap-3 font-normal text-base">
          <SvgPlus height={16} className="stroke-neutral-content" />
          <div>Add New</div>
        </div>
      </button>
    </div>
  );
};

export default AddWidget;
