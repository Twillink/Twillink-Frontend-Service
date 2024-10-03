import React, {useState} from 'react';
import InputLabel from './InputLabel';
import Button from './Button';
import PopupContainer from './PopupContainer';
import TextAreaLabel from './TextAreaLabel';
import {WidgetTypeEnum} from '@/libs/WidgetTypeEnum';

interface IPopupWidgetText {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (
    type: WidgetTypeEnum,
    title: string,
    url: string,
    image?: string | ArrayBuffer | null,
  ) => void;
}

const PopupWidgetText: React.FC<IPopupWidgetText> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleAdd = () => {
    onAdd(WidgetTypeEnum.Text, title, url, selectedImage);
    setTitle('');
    setUrl('');
    setSelectedImage(null);
    onClose();
  };

  return (
    <PopupContainer
      title="Add Text"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form method="dialog" className="modal-backdrop flex flex-col gap-5">
        <TextAreaLabel
          label="Text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={() => console.log('Input blurred')}
          placeholder="Input Text..."
          rows={5}
        />
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

export default PopupWidgetText;
