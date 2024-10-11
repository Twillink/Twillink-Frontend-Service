import SvgSocialAdd from '@/assets/svgComponents/SvgSocialAdd';
import React, {ComponentProps} from 'react';
import Image from 'next/image';

interface ISocialButton extends ComponentProps<'input'> {
  imageUrl?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const SocialButton: React.FC<ISocialButton> = ({
  imageUrl,
  onChange,
  disabled = false,
  ...restProps
}) => {
  return (
    <label className="cursor-pointer flex flex-col items-center">
      {/* <input
        type="file"
        className="hidden"
        onChange={onChange}
        disabled={disabled}
        {...restProps}
      /> */}
      {imageUrl ? (
        <div className="flex items-center justify-center w-[26px] h-[26px] mb-2">
          <Image
            src={imageUrl}
            alt="Selected"
            width={26}
            height={26}
            className="object-cover"
          />
        </div>
      ) : (
        <SvgSocialAdd />
      )}
    </label>
  );
};

export default SocialButton;
