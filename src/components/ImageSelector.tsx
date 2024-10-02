import SvgPlus from '@/assets/svgComponents/SvgPlus';
import React, {useState, useEffect} from 'react';
import Image from 'next/image';

interface ImageSelectorProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  reset?: boolean;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  onChange,
  disabled = false,
  reset = false,
  ...restProps
}) => {
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

    if (onChange) {
      onChange(event);
    }
  };

  useEffect(() => {
    if (reset) {
      setSelectedImage(null);
    }
  }, [reset]);

  return (
    <div className="h-[120px] p-[6px] w-full">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
        id="image-selector"
        {...restProps}
      />
      <label htmlFor="image-selector">
        <div className="h-full cursor-pointer flex flex-col items-center w-full border-2 border-contras-low rounded-2xl bg-contras-med">
          {selectedImage ? (
            <div className="w-full relative h-full">
              <Image
                src={selectedImage as string}
                alt="Selected"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ) : (
            <div className="h-full flex text-general-med items-center gap-3 font-normal text-base">
              <SvgPlus height={16} className="stroke-general-med" />
              <div>Add Thumbnail Image</div>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default ImageSelector;
