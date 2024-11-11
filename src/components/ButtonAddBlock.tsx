import React, {ComponentProps} from 'react';
import ComingSoon from './ComingSoon';
import ProIndicator from '@/components/ProIndicator';

interface IButtonAddBlock extends ComponentProps<'button'> {
  onClick?: () => void;
  icon?: JSX.Element;
  title: string;
  disabled?: boolean;
  isComingSoon?: boolean;
  isPro?: boolean;
}

const ButtonAddBlock: React.FC<IButtonAddBlock> = ({
  onClick,
  icon,
  title,
  disabled = false,
  isComingSoon = false,
  isPro = false,
  ...restProps
}) => {
  return (
    <button
      className="flex flex-row justify-start gap-2 btn bg-contras-high border-none p-2 rounded-lg hover:bg-general-low h-max min-h-max w-full relative disabled:bg-contras-low"
      onClick={onClick}
      disabled={disabled}
      {...restProps}>
      <div>{icon}</div>
      <div className="font-normal text-sm text-general-high">{title}</div>

      {isComingSoon && (
        <span className="absolute top-0 right-1">
          <ComingSoon />
        </span>
      )}
      {isPro && (
        <span className="absolute top-[-10%] right-[-2%]">
          <ProIndicator />
        </span>
      )}
    </button>
  );
};

export default ButtonAddBlock;
