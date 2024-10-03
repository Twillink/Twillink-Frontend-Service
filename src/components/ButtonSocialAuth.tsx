import React from 'react';

interface IButtonSocialAuth
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  title?: string;
}

const ButtonSocialAuth: React.FC<IButtonSocialAuth> = ({
  icon,
  title = 'Title',
  ...props
}) => {
  return (
    <button
      {...props}
      className="flex items-center w-full justify-center px-4 pt-[10px] bg-contras-high rounded-lg border border-general-low shadow-md hover:shadow-lg p-2">
      {icon && (
        <span className="mr-3" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="text-primary font-semibold text-xl">{title}</span>
    </button>
  );
};

export default ButtonSocialAuth;
