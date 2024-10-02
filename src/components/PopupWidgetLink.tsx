import React, {useState} from 'react';
import InputLabel from './InputLabel';
import ImageSelector from './ImageSelector';
import Button from './Button';
import PopupContainer from './PopupContainer';
import {WidgetTypes} from './widgets/WidgetContainer';

interface PopupWidgetLinkProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (
    type: WidgetTypes,
    title: string,
    url: string,
    image?: string | ArrayBuffer | null,
  ) => void;
}

const PopupWidgetLink: React.FC<PopupWidgetLinkProps> = ({
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
    onAdd(WidgetTypes.Link, title, url, selectedImage);
    setTitle('');
    setUrl('');
    setSelectedImage(null);
    onClose();
  };

  return (
    <PopupContainer
      title="Add Link"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form method="dialog" className="modal-backdrop flex flex-col gap-5">
        <InputLabel
          label="Link Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={() => console.log('Input blurred')}
          placeholder="Input link title"
        />
        <InputLabel
          type="url"
          label="URL Link"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onBlur={() => console.log('Input blurred')}
          placeholder="https://www."
        />
        <ImageSelector
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setSelectedImage(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
          reset={selectedImage === null}
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

export default PopupWidgetLink;
