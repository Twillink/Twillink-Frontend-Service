import SvgPlus from '@/assets/svgComponents/SvgPlus';
import Image from 'next/image';
import React from 'react';

interface IImageSelectorWithSource
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  image: string | ArrayBuffer | null;
  reset?: boolean;
  name: string;
  label?: string;
  error?: string;
}

const ImageSelectorWithSource: React.FC<IImageSelectorWithSource> = ({
  onChange,
  disabled = false,
  name,
  image,
  error,
  label,
  ...restProps
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files?.[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {};
    //   reader.readAsDataURL(file);
    // }
    console.log('onhandleFileChange');
    if (onChange) {
      console.log('onchange inner');
      onChange(event);
    }
  };

  return (
    <div className="h-[120px] p-[6px] w-full min-w-60">
      <label htmlFor={name ?? 'image-selector'}>
        <div className="h-full cursor-pointer flex flex-col items-center w-full border-2 border-contras-low rounded-2xl bg-contras-med">
          {image ? (
            <div className="w-full relative h-full">
              <Image
                src={image as string}
                alt="Selected"
                fill
                style={{objectFit: 'cover'}}
                className="rounded-lg"
              />
            </div>
          ) : (
            <div className="h-full flex text-general-med items-center gap-3 font-normal text-base">
              <SvgPlus height={16} className="stroke-general-med" />
              <div>{label ? label : 'Add Thumbnail Image'}</div>
            </div>
          )}
        </div>
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
        id={name ?? 'image-selector'}
        {...restProps}
      />
      {error ? <span className="text-red-500 text-sm">{error}</span> : null}
    </div>
  );
};

export default ImageSelectorWithSource;
