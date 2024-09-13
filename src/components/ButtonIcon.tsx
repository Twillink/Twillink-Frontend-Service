import React, {ComponentProps} from 'react';

interface ButtonIconProps extends ComponentProps<'button'> {
  onClick?: () => void;
  icon?: JSX.Element;
  disabled?: boolean;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  onClick,
  icon,
  disabled = false,
  ...restProps
}) => {
  return (
    <button
      className="btn bg-transparent shadow-none border-none p-0 hover:bg-transparent h-max min-h-max"
      onClick={onClick}
      disabled={disabled}
      {...restProps}>
      {icon}
    </button>
  );
};

export default ButtonIcon;
