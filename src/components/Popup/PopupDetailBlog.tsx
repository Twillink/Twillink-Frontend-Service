import React from 'react';
import {IItemWidgetTypeValues} from '@/libs/types/IItemWidgetType';
import PopupContainer from '@/components/PopupContainer';
import Image from 'next/image';

interface IPopupDetailBlog {
  isOpen: boolean;
  onClose: () => void;

  disabled?: boolean;
  dataBlog?: IItemWidgetTypeValues;
}

const PopupDetailBlog: React.FC<IPopupDetailBlog> = ({
  isOpen,
  onClose,
  dataBlog,
}) => {
  return (
    <PopupContainer title="Detail Blog" onClose={onClose} isOpen={isOpen}>
      <div
        className={`${isOpen ? 'visible' : 'hidden'} modal-backdrop flex flex-col gap-5`}>
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
    </PopupContainer>
  );
};

export default PopupDetailBlog;
