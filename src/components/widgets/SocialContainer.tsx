import React, {useState} from 'react';
import SocialButton from './SocialButton';
import {socialButtons} from '../PopupWidgetSocial';
import {IAddWidgetSocial} from '@/libs/types/IAddWidgetData';
import Link from 'next/link';
import {setSubmitLoading} from '@/libs/store/features/generalSubmitSlice';
import {apiRemoveSocial} from '@/libs/api';
import {useAppDispatch} from '@/libs/hooks/useReduxHook';
import SvgWidgetDelete from '@/assets/svgComponents/SvgWidgetDelete';

interface ISocialContainer {
  onClick?: () => void;
  data: IAddWidgetSocial[];
  fetchData?: (withLoading: boolean) => void;
  viewer: boolean;
}

const SocialContainer: React.FC<ISocialContainer> = ({
  onClick,
  data,
  fetchData = () => {},
  viewer,
}) => {
  const [
    imageUrls,
    // setImageUrls
  ] = useState<string[]>(Array(1).fill(''));

  const dispatch = useAppDispatch();

  const disableAddButton = data.length >= socialButtons.length;

  const handleDelete = (key: string) => {
    dispatch(setSubmitLoading(true));
    apiRemoveSocial(dispatch, key)
      .then(() => {
        fetchData(false);
      })
      .catch()
      .finally(() => {
        dispatch(setSubmitLoading(false));
      });
  };

  return (
    <div className="flex flex-wrap justify-center max-w-[280px] mx-auto pt-2 pb-5 px-8 w-full gap-6">
      {data.map(item => {
        const Icon = socialButtons.find(btn => btn.name === item?.key)?.icon;
        if (!Icon) return null;
        return (
          <div
            key={item?.key}
            className="w-7 h-7 flex justify-center relative group">
            <button
              onClick={() => handleDelete(item?.key)}
              className="absolute hidden group-hover:block -z-1 -top-1 -right-1 p-1 bg-primary rounded-full hover:z-30">
              <SvgWidgetDelete height={12} className="stroke-primary-content" />
            </button>
            <Link href={item.value} target={'_blank'}>
              <Icon width={28} height={28} className={'fill-slate-500 +'} />
            </Link>
          </div>
        );
      })}
      {!disableAddButton &&
        !viewer &&
        imageUrls.map((_, index) => (
          <div
            key={index}
            className="w-7 h-7 flex justify-center mb-4"
            onClick={onClick}>
            <SocialButton imageUrl={imageUrls[index]} />
          </div>
        ))}
    </div>
  );
};

export default SocialContainer;
