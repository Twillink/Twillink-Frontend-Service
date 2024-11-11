import SvgPlus from '@/assets/svgComponents/SvgPlus';
import React, {ComponentProps, useContext, useMemo} from 'react';
import {
  PreviewContext,
  PreviewTypeEnum,
} from '@/libs/providers/PreviewProvider';

interface IAddWidget extends ComponentProps<'button'> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const AddWidget: React.FC<IAddWidget> = ({
  onClick,
  disabled = false,
  ...restProps
}) => {
  const {preview, isMobileScreen} = useContext(PreviewContext);

  const isDesktop = useMemo(
    () => preview === PreviewTypeEnum.DESKTOP && !isMobileScreen,
    [preview, isMobileScreen],
  );
  return (
    <div
      className={`${isDesktop ? 'h-40 min-w-[160px]' : 'h-[120px] w-full mb-10'} p-[6px]`}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`h-full cursor-pointer flex ${isDesktop ? 'bg-primary-content' : ''} flex-col items-center w-full border-dashed border-2 border-base-300 rounded-2xl py-10`}
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
