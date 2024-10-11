import SvgMail from '@/assets/svgComponents/SvgMail';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import React, {useState} from 'react';
import Button from './Button';
import InputLabelWithIcon from './InputLabelWithIcon';
import InputPhoneCountries from './InputPhoneCountries';
import PopupContainer from './PopupContainer';

interface IPopupWidgetContact {
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

const PopupWidgetContact: React.FC<IPopupWidgetContact> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
}) => {
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState('');

  const handleAdd = () => {
    onAdd(WidgetTypeEnum.Contact, title, url);
    setTitle('');
    setUrl('');
    onClose();
  };

  return (
    <PopupContainer
      title="Add Contact"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form method="dialog" className="modal-backdrop flex flex-col gap-5">
        <InputLabelWithIcon
          label="Email"
          icon={
            <div className="relative w-5 h-5 mr-2 bg-transparent">
              <SvgMail />
            </div>
          }
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={() => console.log('Input blurred')}
          placeholder="my email"
        />
        <InputPhoneCountries
          options={[
            {value: '+62', label: '+62', emoji: '🇮🇩'},
            {value: '+1', label: '+1', emoji: '🇺🇸'},
            {value: '+81', label: '+81', emoji: '🇯🇵'},
          ]}
          label="Phone Number"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onBlur={() => console.log('Input blurred')}
          placeholder="87111122222"
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

export default PopupWidgetContact;
