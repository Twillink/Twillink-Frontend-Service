import React, {useContext} from 'react';
import ButtonIcon from './ButtonIcon';
import SvgResetField from '@/assets/svgComponents/SvgResetField';
import {ToastType} from '@/libs/types/ToastType';
import {PreviewContext} from '@/libs/providers/PreviewProvider';

interface IToast {
  title: string;
  message: string | string[];
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<IToast> = ({
  title,
  message,
  type,
  isVisible,
  onClose,
}) => {
  const {isMobileScreen} = useContext(PreviewContext);

  if (!isVisible) return null;

  const alertClasses = {
    success: 'bg-success border-success text-success',
    error: 'bg-error border-error text-error',
    info: 'bg-info border-info text-info',
  };

  const iconClasses = {
    success: 'stroke-success',
    error: 'stroke-error',
    info: 'stroke-info',
  };

  return (
    <div
      className={`toast toast-center ${isMobileScreen ? 'toast-bottom mb-[10%]' : 'toast-top'} whitespace-normal z-50`}>
      <div className="bg-white rounded-2xl w-max">
        <div
          className={`alert bg-opacity-15 p-4 ${alertClasses[type]} flex w-max`}>
          <div className="flex items-start justify-between w-full min-w-80 max-w-[25rem]">
            <div className="flex flex-col gap-1">
              <div className="font-bold text-xl mr-2">{title}</div>
              <div className=" text-base">
                {Array.isArray(message) ? (
                  message.map((msg, index) => <div key={index}>{msg}</div>)
                ) : (
                  <>{message}</>
                )}
              </div>
            </div>
            <ButtonIcon
              onClick={onClose}
              icon={<SvgResetField height={24} className={iconClasses[type]} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
