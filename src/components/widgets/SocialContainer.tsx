import React, {useState} from 'react';
import SocialButton from './SocialButton';
import {IItemWidgetType} from '@/libs/types/IItemWidgetType';
import {socialButtons} from '../PopupWidgetSocial';

interface ISocialContainer {
  onClick?: () => void;
  data: IItemWidgetType[];
}

const SocialContainer: React.FC<ISocialContainer> = ({onClick, data}) => {
  const [
    imageUrls,
    // setImageUrls
  ] = useState<string[]>(Array(1).fill(''));

  // const handleFileChange =
  //   (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const files = event.target.files;
  //     if (files?.length) {
  //       const imageUrl = URL.createObjectURL(files[0]);
  //       setImageUrls(prev => {
  //         const newUrls = [...prev];
  //         newUrls[index] = imageUrl;
  //         return newUrls;
  //       });
  //     }
  //   };

  return (
    <div className="flex flex-wrap justify-center py-4 px-8 w-full gap-2">
      {data.map(item => {
        const Icon = socialButtons.find(
          btn => btn.name === item.value?.text,
        )?.icon;
        if (!Icon) return null;
        return (
          <div key={item.value?.text} className="w-7 h-7 flex justify-center">
            <Icon
              width={28}
              height={28}
              className={'fill-slate-500 w-full h-full'}
            />
          </div>
        );
      })}
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
