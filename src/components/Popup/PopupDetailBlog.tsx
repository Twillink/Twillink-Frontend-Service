import React from 'react';
import {IItemWidgetTypeValues} from '@/libs/types/IItemWidgetType';
import Image from 'next/image';

interface IPopupDetailBlog {
  dataBlog?: IItemWidgetTypeValues;
}

const PopupDetailBlog: React.FC<IPopupDetailBlog> = ({dataBlog}) => {
  return (
    <div className={`modal-backdrop flex flex-col gap-5`}>
      {dataBlog?.url && (
        <div className={'relative w-full h-[200px]'}>
          <Image
            src={dataBlog?.url}
            alt={dataBlog?.title ?? 'Image'}
            className="object-cover rounded-lg"
            fill
          />
        </div>
      )}

      <div className="flex flex-col gap-2 mb-4">
        <p className="text-lg text-primary font-bold">{dataBlog?.title}</p>
        <p className="text-sm text-primary ">{dataBlog?.content}</p>
      </div>
    </div>
  );
};

export default PopupDetailBlog;
