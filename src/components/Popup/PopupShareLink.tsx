import React from 'react';
import PopupContainer from '@/components/PopupContainer';
import SvgFacebook from '@/assets/svgComponents/SvgFacebook';
import SvgTwitter from '@/assets/svgComponents/SvgTwitter';
import SvgWhatsapp from '@/assets/svgComponents/SvgWhatsapp';
import SvgLinkedIn from '@/assets/svgComponents/SvgLinkedIn';
import SvgTelegram from '@/assets/svgComponents/SvgTelegram';
import SvgCopyLink from '@/assets/svgComponents/SvgCopyLink';
import {handleShowToast} from '@/utils/toast';
import {useAppDispatch} from '@/libs/hooks/useReduxHook';
import {ToastType} from '@/libs/types/ToastType';

interface IPopupShareLink {
  isOpen: boolean;
  onClose: () => void;

  disabled?: boolean;
  username?: string;
}

const PopupShareLink: React.FC<IPopupShareLink> = ({
  isOpen,
  onClose,
  username,
}) => {
  const dispatch = useAppDispatch();

  return (
    <PopupContainer title="" onClose={onClose} isOpen={isOpen}>
      <div
        className={`${isOpen ? 'visible' : 'hidden'} modal-backdrop flex flex-col gap-3`}>
        <div>
          <p className={'text-xl text-primary font-bold text-center'}>
            Share With
          </p>
        </div>

        <div
          className={'overflow-x-auto flex flex-row gap-6 '}
          style={{scrollbarWidth: 'thin'}}>
          <div className={'flex flex-col gap-2'}>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://twillink.com/${username}`,
                );

                handleShowToast(
                  {
                    title: 'Success Copy Link',
                    message: '',
                    type: ToastType.SUCCESS,
                  },
                  dispatch,
                );
              }}
              className={'p-[14px] mx-auto bg-base-200 rounded-full'}>
              <SvgCopyLink width={32} height={32} />
            </button>
            <p className={'text-primary text-sm text-center'}>Copy Link</p>
          </div>

          <div className={'flex flex-col gap-2'}>
            <a
              href={`https://wa.me/?text=https://twillink.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className={'p-[14px] mx-auto bg-base-200 rounded-full'}>
              <SvgWhatsapp width={32} height={32} />
            </a>
            <p className={'text-primary text-sm text-center'}>Whatsapp</p>
          </div>

          <div className={'flex flex-col gap-2'}>
            <a
              href={`https://twitter.com/intent/tweet?url=https://twillink.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className={'p-[14px] mx-auto bg-base-200 rounded-full'}>
              <SvgTwitter width={32} height={32} />
            </a>
            <p className={'text-primary text-sm text-center'}>X</p>
          </div>

          <div className={'flex flex-col gap-2'}>
            <a
              href={`https://t.me/share/url?url=https://twillink.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className={'p-[14px] mx-auto bg-base-200 rounded-full'}>
              <SvgTelegram width={32} height={32} />
            </a>
            <p className={'text-primary text-sm text-center'}>Telegram</p>
          </div>

          <div className={'flex flex-col gap-2'}>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://twillink.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className={'p-[14px] mx-auto bg-base-200 rounded-full'}>
              <SvgFacebook width={32} height={32} />
            </a>
            <p className={'text-primary text-sm text-center'}>Facebook</p>
          </div>

          <div className={'flex flex-col gap-2'}>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=https://twillink.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className={'p-[14px] mx-auto bg-base-200 rounded-full'}>
              <SvgLinkedIn width={32} height={32} />
            </a>
            <p className={'text-primary text-sm text-center'}>LinkedIn</p>
          </div>
        </div>

        <hr className={'my-6'} />
      </div>
    </PopupContainer>
  );
};

export default PopupShareLink;
