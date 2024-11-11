import SvgFacebook from '@/assets/svgComponents/SvgFacebook';
import SvgInstagram from '@/assets/svgComponents/SvgInstagram';
import SvgLinkedIn from '@/assets/svgComponents/SvgLinkedIn';
import SvgTelegram from '@/assets/svgComponents/SvgTelegram';
import SvgTiktok from '@/assets/svgComponents/SvgTiktok';
import SvgTumblr from '@/assets/svgComponents/SvgTumblr';
import SvgTwitter from '@/assets/svgComponents/SvgTwitter';
import SvgYoutube from '@/assets/svgComponents/SvgYoutube';
import AddWidgetSocialSchema from '@/libs/schema/Widget/WidgetSocial.schema';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React from 'react';
import Button from './Button';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';
import {IItemWidgetTypeValues} from '@/libs/types/IItemWidgetType';

interface IPopupWidgetSocial {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    type: WidgetTypeEnum,
    value: IItemWidgetTypeValues,
  ) => Promise<boolean>;
  disabled?: boolean;
}

interface ISocialButton {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const socialButtons: ISocialButton[] = [
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
  disabled = false,
}) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      url: '',
    },
    validationSchema: AddWidgetSocialSchema,
    onSubmit: async values => {
      const value = {
        title: values.title,
        url: values.url,
      };

      const success = await onAdd(WidgetTypeEnum.Social, value);

      if (success) {
        formik.resetForm();
        onClose();
      }
    },
  });

  return (
    <PopupContainer title="Add Social" onClose={onClose} isOpen={isOpen}>
      <form
        method="dialog"
        className="modal-backdrop flex flex-col gap-5"
        onSubmit={formik.handleSubmit}>
        <p className="text-general-med text-sm">Select social account</p>
        <div className="flex gap-4 justify-between flex-nowrap overflow-x-scroll">
          {socialButtons.map(button => {
            const Icon = button.icon;
            return (
              <div
                key={button.name}
                onClick={() => {
                  formik.setFieldValue('title', button.name);
                }}
                className={`w-8 p-1 flex justify-center items-center ${formik.values.title !== button.name ? 'grayscale' : 'bg-base-200'} hover:cursor-pointer`}>
                <Icon
                  width={28}
                  height={28}
                  className={'fill-slate-500 w-full h-full'}
                />
                {/* <span>{button.name}</span> */}
              </div>
            );
          })}
        </div>
        {formik.touched.title && formik.errors.title ? (
          <span className="text-red-500 text-sm">{formik.errors.title}</span>
        ) : null}

        <InputLabel
          type="url"
          label="URL Link"
          name="url"
          value={formik.values.url}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="https://www."
          error={
            formik.touched.url && formik.errors.url ? formik.errors.url : ''
          }
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-max"
            title="Add"
            disabled={disabled}
          />
        </div>
      </form>
    </PopupContainer>
  );
};

export default PopupWidgetSocial;
