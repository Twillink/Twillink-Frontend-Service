import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import React, {useState} from 'react';
import Button from './Button';
import ImageSelectorWithSource from './ImageSelectorWithSource';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';

interface IPopupWidgetCarousel {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (
    type: WidgetTypeEnum,
    title: string,
    url: string,
    image?: string | ArrayBuffer | null,
    images?: string[] | ArrayBuffer[] | null[],
  ) => void;
}

const defaultArrayImages = [null, null, null, null];

const PopupWidgetCarousel: React.FC<IPopupWidgetCarousel> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [selectedImages, setSelectedImages] = useState<
    string[] | ArrayBuffer[] | null[]
  >(defaultArrayImages);

  const handleAdd = () => {
    onAdd(WidgetTypeEnum.Carousel, title, url, null, selectedImages);
    setTitle('');
    setUrl('');
    setSelectedImages(defaultArrayImages);
    onClose();
  };

  console.log(selectedImages, 'image');

  return (
    <PopupContainer
      title="Add Carousel"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form method="dialog" className="modal-backdrop flex flex-col gap-5">
        <InputLabel
          label="Caption"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={() => console.log('Input blurred')}
          placeholder="Your caption carousel"
        />

        <div className="overflow-x-scroll flex gap-2">
          {selectedImages.map((item, index) => (
            <div key={index} className="w-full h-full">
              <ImageSelectorWithSource
                image={item}
                name={`image-${index}`}
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    console.log('onload');
                    reader.onloadend = () => {
                      setSelectedImages((prev: any) => {
                        const newArr = [...prev];
                        newArr[index] = reader.result;
                        return newArr;
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            className="w-max"
            onClick={handleAdd}
            title="Add"
          />
        </div>
      </form>
    </PopupContainer>
  );
};

export default PopupWidgetCarousel;
