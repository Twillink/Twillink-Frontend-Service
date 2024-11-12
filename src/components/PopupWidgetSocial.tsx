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
import {IAddWidgetSocial} from '@/libs/types/IAddWidgetData';

interface IPopupWidgetSocial {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    type: WidgetTypeEnum,
    value: IItemWidgetTypeValues,
  ) => Promise<boolean>;
  disabled?: boolean;
  dataSocial: IAddWidgetSocial[];
}

interface ISocialButton {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const socialButtons: ISocialButton[] = [
  {
    name: 'instagram',
    icon: SvgInstagram,
  },
  {
    name: 'youtube',
    icon: SvgYoutube,
  },
  {
    name: 'telegram',
    icon: SvgTelegram,
  },
  {
    name: 'facebook',
    icon: SvgFacebook,
  },
  {
    name: 'linkedin',
    icon: SvgLinkedIn,
  },
  {
    name: 'twitter',
    icon: SvgTwitter,
  },
  {
    name: 'tiktok',
    icon: SvgTiktok,
  },
  {
    name: 'tumblr',
    icon: SvgTumblr,
  },
];

const PopupWidgetSocial: React.FC<IPopupWidgetSocial> = ({
  isOpen,
  onClose,
  onAdd,
  disabled = false,
  dataSocial,
}) => {
  const formik = useFormik({
    initialValues: {
      key: '',
      value: '',
    },
    validationSchema: AddWidgetSocialSchema,
    onSubmit: async values => {
      const value = {
        key: values.key,
        value: values.value,
      };

      const success = await onAdd(WidgetTypeEnum.Social, value);

      if (success) {
        formik.resetForm();
        onClose();
      }
    },
  });

  const existingSocials = dataSocial.map(item => item.key);

  return (
    <PopupContainer title="Add Social" onClose={onClose} isOpen={isOpen}>
      <form
        method="dialog"
        className="modal-backdrop flex flex-col gap-5"
        onSubmit={formik.handleSubmit}>
        <p className="text-general-med text-sm">Select social account</p>
        <div className="flex gap-4 justify-between flex-nowrap overflow-x-scroll">
          {socialButtons
            .filter(s => !existingSocials.includes(s.name))
            .map(button => {
              const Icon = button.icon;
              return (
                <div
                  key={button.name}
                  onClick={() => {
                    formik.setFieldValue('key', button.name);
                  }}
                  className={`w-8 p-1 flex justify-center items-center ${formik.values.key !== button.name ? 'grayscale' : 'bg-base-200'} hover:cursor-pointer`}>
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
        {formik.touched.key && formik.errors.key ? (
          <span className="text-red-500 text-sm">{formik.errors.key}</span>
        ) : null}

        <InputLabel
          type="url"
          label="URL Link"
          name="value"
          value={formik.values.value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="https://www."
          error={
            formik.touched.value && formik.errors.value
              ? formik.errors.value
              : ''
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
