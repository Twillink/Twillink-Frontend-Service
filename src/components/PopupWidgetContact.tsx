import SvgMail from '@/assets/svgComponents/SvgMail';
import AddWidgetContactSchema from '@/libs/schema/Widget/WidgetContact.schema';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React from 'react';
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
  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
    },
    validationSchema: AddWidgetContactSchema,
    onSubmit: values => {
      onAdd(WidgetTypeEnum.Contact, values.email, values.phone);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <PopupContainer
      title="Add Contact"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form
        method="dialog"
        className="modal-backdrop flex flex-col gap-5"
        onSubmit={formik.handleSubmit}>
        <InputLabelWithIcon
          label="Email"
          icon={
            <div className="relative w-5 h-5 mr-2 bg-transparent">
              <SvgMail />
            </div>
          }
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="my email"
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ''
          }
        />

        <InputPhoneCountries
          options={[
            {value: '+62', label: '+62', emoji: '🇮🇩'},
            {value: '+1', label: '+1', emoji: '🇺🇸'},
            {value: '+81', label: '+81', emoji: '🇯🇵'},
          ]}
          label="Phone Number"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="87111122222"
          error={
            formik.touched.phone && formik.errors.phone
              ? formik.errors.phone
              : ''
          }
        />

        <div className="flex justify-end">
          <Button type="submit" className="w-max" title="Add" />
        </div>
      </form>
    </PopupContainer>
  );
};

export default PopupWidgetContact;
