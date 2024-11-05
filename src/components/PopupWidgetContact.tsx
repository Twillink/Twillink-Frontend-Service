import SvgMail from '@/assets/svgComponents/SvgMail';
import AddWidgetContactSchema from '@/libs/schema/Widget/WidgetContact.schema';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React, {useMemo} from 'react';
import Button from './Button';
import InputLabelWithIcon from './InputLabelWithIcon';
import InputPhoneCountries from './InputPhoneCountries';
import PopupContainer from './PopupContainer';
import {
  IItemWidgetType,
  IItemWidgetTypeValues,
} from '@/libs/types/IItemWidgetType';
import {useAppSelector} from '@/libs/hooks/useReduxHook';
import {RootState} from '@/libs/store/store';
import {mappingCountryToDialOptions} from '@/utils/mappingCountryToDialOptions';

interface IPopupWidgetContact {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (
    type: WidgetTypeEnum,
    value: IItemWidgetTypeValues,
  ) => Promise<boolean>;
  disabled?: boolean;
  dataContact?: IItemWidgetType;
}

const PopupWidgetContact: React.FC<IPopupWidgetContact> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
  disabled = false,
  dataContact,
}) => {
  const country = useAppSelector((state: RootState) => state.country);

  const formik = useFormik({
    initialValues: {
      email: dataContact?.value?.email || '',
      phoneNumber: dataContact?.value?.phoneNumber || '',
    },
    enableReinitialize: true,
    validationSchema: AddWidgetContactSchema,
    onSubmit: async values => {
      const value = {
        email: values.email,
        phoneNumber: values.phoneNumber,
      };
      const success = await onAdd(WidgetTypeEnum.Contact, value);

      if (success) {
        formik.resetForm();
        onClose();
      }
    },
  });

  const disabledSubmit: boolean = useMemo(() => {
    return (
      Boolean(formik.errors.email || formik.errors.phoneNumber) ||
      disabled ||
      Boolean(!formik.values.email && !formik.values.phoneNumber)
    );
  }, [formik.values, formik.errors, disabled]);

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
          options={mappingCountryToDialOptions(country.countries)}
          label="Phone Number"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="87111122222"
          autoComplete={'phone-number'}
          error={
            formik.touched.phoneNumber && formik.errors.phoneNumber
              ? formik.errors.phoneNumber
              : ''
          }
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-max"
            title="Add"
            disabled={disabledSubmit}
          />
        </div>
      </form>
    </PopupContainer>
  );
};

export default PopupWidgetContact;
