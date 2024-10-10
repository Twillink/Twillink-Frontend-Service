import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import React, {useState} from 'react';
import Button from './Button';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';

interface IPopupWidgetLink {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (
    type: WidgetTypeEnum,
    title: string,
    url: string,
    attachmentId?: string | null,
  ) => void;
}

const PopupWidgetImage: React.FC<IPopupWidgetLink> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
}) => {
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState('');

  const handleAdd = () => {
    onAdd(WidgetTypeEnum.Image, title, url);
    setTitle('');
    setUrl('');
    onClose();
  };

  return (
    <PopupContainer
      title="Add Image"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form method="dialog" className="modal-backdrop flex flex-col gap-5">
        <InputLabel
          label="Image Caption"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={() => console.log('Input blurred')}
          placeholder="Your caption image"
        />
        <InputLabel
          type="url"
          label="Input URL Image"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onBlur={() => console.log('Input blurred')}
          placeholder="https://www."
        />

        <div className="flex justify-between">
          <Button
            type="button"
            className="w-max bg-base-100 text-primary"
            onClick={onClose}
            title="Cancel"
          />
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

export default PopupWidgetImage;
