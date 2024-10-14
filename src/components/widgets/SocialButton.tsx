import SvgSocialAdd from '@/assets/svgComponents/SvgSocialAdd';
import Image from 'next/image';
import React, {ComponentProps} from 'react';

interface ISocialButton extends ComponentProps<'input'> {
  imageUrl?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const SocialButton: React.FC<ISocialButton> = ({
  imageUrl,
  disabled = false,
  // onChange,
  // ...restProps
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
        <button
          className="flex items-center justify-center w-[26px] h-[26px] mb-2"
          disabled={disabled}>
          <Image
            src={imageUrl}
            alt="Selected"
            width={26}
            height={26}
            className="object-cover"
          />
        </button>
      ) : (
        <SvgSocialAdd />
      )}
    </label>
  );
};

export default SocialButton;
