import React, {ReactNode} from 'react';
import ButtonIcon from './ButtonIcon';
import SvgClose from '@/assets/svgComponents/SvgClose';
import SvgArrowLeftThin from '@/assets/svgComponents/SvgArrowLeftThin';

interface PopupContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  title: string;
  children: ReactNode;
}

const PopupContainer: React.FC<PopupContainerProps> = ({
  isOpen,
  onClose,
  onBack,
  title,
  children,
}) => {
  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`} open={isOpen}>
      <div className="flex flex-col modal-box w-[400px] bg-contras-high shadow-[rgba(59,63,81,0.12)_0px_8px_16px_0px] p-4 gap-5 rounded-3xl">
        <div className="flex flex-row justify-between items-center">
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
