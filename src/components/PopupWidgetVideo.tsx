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

const PopupWidgetVideo: React.FC<IPopupWidgetLink> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
}) => {
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState('');

  const handleAdd = () => {
    onAdd(WidgetTypeEnum.Video, title, url);
    setTitle('');
    setUrl('');
    onClose();
  };

  return (
    <PopupContainer
      title="Add Video"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form method="dialog" className="modal-backdrop flex flex-col gap-5">
        <InputLabel
          label="Video Caption"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={() => console.log('Input blurred')}
          placeholder="Your video caption"
        />
        <InputLabel
          type="url"
          label="Input URL Video"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onBlur={() => console.log('Input blurred')}
          placeholder="https://www."
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

export default PopupWidgetVideo;
