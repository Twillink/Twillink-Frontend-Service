import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import React, {useState} from 'react';
import Button from './Button';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';
import SvgYoutube from '@/assets/svgComponents/SvgYoutube';
import SvgInstagram from '@/assets/svgComponents/SvgInstagram';
import SvgTelegram from '@/assets/svgComponents/SvgTelegram';
import SvgFacebook from '@/assets/svgComponents/SvgFacebook';
import SvgLinkedIn from '@/assets/svgComponents/SvgLinkedIn';
import SvgTwitter from '@/assets/svgComponents/SvgTwitter';
import SvgTiktok from '@/assets/svgComponents/SvgTiktok';
import SvgTumblr from '@/assets/svgComponents/SvgTumblr';

interface IPopupWidgetSocial {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    type: WidgetTypeEnum,
    title: string,
    url: string,
    attachmentId?: string | null,
  ) => void;
}

const socialButtons = [
  {
    name: 'Instagram',
    icon: SvgInstagram,
  },
  {
    name: 'YouTube',
    icon: SvgYoutube,
  },
  {
    name: 'Telegram',
    icon: SvgTelegram,
  },
  {
    name: 'Facebook',
    icon: SvgFacebook,
  },
  {
    name: 'LinkedIn',
    icon: SvgLinkedIn,
  },
  {
    name: 'Twitter',
    icon: SvgTwitter,
  },
  {
    name: 'Tiktok',
    icon: SvgTiktok,
  },
  {
    name: 'Tumblr',
    icon: SvgTumblr,
  },
];

const PopupWidgetSocial: React.FC<IPopupWidgetSocial> = ({
  isOpen,
  onClose,
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
    <PopupContainer title="Add Image" onClose={onClose} isOpen={isOpen}>
      <form method="dialog" className="modal-backdrop flex flex-col gap-5">
        <p className="mb-1 text-general-med text-sm">Select social account</p>
        <div className="flex gap-4 justify-between flex-nowrap overflow-x-scroll">
          {socialButtons.map(button => {
            const Icon = button.icon;
            return (
              <button
                key={button.name}
                // disabled={title !== button.name}
                onClick={() => {
                  setTitle(button.name);
                }}
                className={`w-6 ${title !== button.name && 'grayscale'} hover:cursor-pointer`}>
                <Icon width={24} height={24} className={'fill-slate-500'} />
                {/* <span>{button.name}</span> */}
              </button>
            );
          })}
        </div>
        <InputLabel
          type="url"
          label="URL Link"
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

export default PopupWidgetSocial;
