import React, {useState} from 'react';
import Button from './Button';
import PopupContainer from './PopupContainer';
import TextAreaLabel from './TextAreaLabel';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';

interface IPopupWidgetText {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (type: WidgetTypeEnum, value: object) => Promise<boolean>;
  disabled?: boolean;
}

const PopupWidgetText: React.FC<IPopupWidgetText> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
  disabled = false,
}) => {
  const [title, setTitle] = useState('');

  const handleAdd = async () => {
    const value = {
      text: title,
    };

    const success = await onAdd(WidgetTypeEnum.Text, value);
    console.log('+++ success', success);
    if (success) {
      setTitle('');
    }
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
            disabled={disabled}
            title="Add"
          />
        </div>
      </form>
    </PopupContainer>
  );
};

export default PopupWidgetText;
