import React, {useState} from 'react';
import SocialButton from './SocialButton';

interface ISocialContainer {
  onClick?: () => void;
}

const SocialContainer: React.FC<ISocialContainer> = ({onClick}) => {
  const [imageUrls, setImageUrls] = useState<string[]>(Array(8).fill(''));

  const handleFileChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files?.length) {
        const imageUrl = URL.createObjectURL(files[0]);
        setImageUrls(prev => {
          const newUrls = [...prev];
          newUrls[index] = imageUrl;
          return newUrls;
        });
      }
    };

  return (
    <div className="flex flex-wrap justify-center py-4 px-8 w-full">
      {imageUrls.map((_, index) => (
        <div
          key={index}
          className="w-1/4 flex justify-center mb-4"
          onClick={onClick}>
          <SocialButton imageUrl={imageUrls[index]} />
        </div>
      ))}
    </div>
  );
};

export default SocialContainer;
