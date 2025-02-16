import React, {ReactNode} from 'react';
import ButtonIcon from './ButtonIcon';
import SvgClose from '@/assets/svgComponents/SvgClose';
import SvgArrowLeftThin from '@/assets/svgComponents/SvgArrowLeftThin';
import {cn} from '@/utils/formater';

interface IPopupContainer {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

const PopupContainer: React.FC<IPopupContainer> = ({
  isOpen,
  onClose,
  onBack,
  title,
  className = '',
  children,
}) => {
  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`} open={isOpen}>
      <div
        className={cn([
          'flex flex-col modal-box w-full max-w-[600px] bg-contras-high shadow-[rgba(59,63,81,0.12)_0px_8px_16px_0px] p-4 gap-5 rounded-3xl',
          className,
        ])}>
        <div className="flex flex-row justify-between items-center ">
          <div className="flex flex-row items-center gap-2">
            {onBack && (
              <ButtonIcon
                icon={<SvgArrowLeftThin className="stroke-general-med" />}
                onClick={onBack}
              />
            )}
            <h3 className="text-xl font-semibold text-general-high">{title}</h3>
          </div>
          <ButtonIcon
            icon={<SvgClose className="stroke-general-med" />}
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </dialog>
  );
};

export default PopupContainer;
