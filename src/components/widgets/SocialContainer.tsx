import React, {useState} from 'react';
import SocialButton from './SocialButton';
import {socialButtons} from '../PopupWidgetSocial';
import {IAddWidgetSocial} from '@/libs/types/IAddWidgetData';

interface ISocialContainer {
  onClick?: () => void;
  data: IAddWidgetSocial[];
}

const SocialContainer: React.FC<ISocialContainer> = ({onClick, data}) => {
  const [
    imageUrls,
    // setImageUrls
  ] = useState<string[]>(Array(1).fill(''));

  const disableAddButton = data.length >= socialButtons.length;

  return (
    <div className="flex flex-wrap justify-center max-w-[280px] mx-auto py-4 px-8 w-full gap-6">
      {data.map(item => {
        const Icon = socialButtons.find(btn => btn.name === item?.key)?.icon;
        if (!Icon) return null;
        return (
          <div key={item?.key} className="w-7 h-7 flex justify-center">
            <Icon
              width={28}
              height={28}
              className={'fill-slate-500 w-full h-full'}
            />
          </div>
        );
      })}
      {!disableAddButton &&
        imageUrls.map((_, index) => (
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
