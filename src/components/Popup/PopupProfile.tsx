import SvgMail from '@/assets/svgComponents/SvgMail';
import AddWidgetContactSchema from '@/libs/schema/Widget/WidgetContact.schema';
import {useFormik} from 'formik';
import React, {useMemo} from 'react';
import {IItemWidgetType} from '@/libs/types/IItemWidgetType';
import {useAppSelector} from '@/libs/hooks/useReduxHook';
import {RootState} from '@/libs/store/store';
import {mappingCountryToDialOptions} from '@/utils/mappingCountryToDialOptions';
import PopupContainer from '@/components/PopupContainer';
import InputLabelWithIcon from '@/components/InputLabelWithIcon';
import InputPhoneCountries from '@/components/InputPhoneCountries';
import Button from '@/components/Button';

interface IPopupWidgetContact {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;

  disabled?: boolean;
  dataContact?: IItemWidgetType;
}

const PopupProfile: React.FC<IPopupWidgetContact> = ({
  isOpen,
  onClose,
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
    onSubmit: async () => {
      formik.resetForm();
      onClose();
    },
  });

  const disabledSubmit: boolean = useMemo(() => {
    return (
      Boolean(formik.errors.email || formik.errors.phoneNumber) ||
      disabled ||
      Boolean(!formik.values.email && !formik.values.phoneNumber)
    );
  }, [formik.values, formik.errors, disabled]);

  const handleCLose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <PopupContainer title="Contact" onClose={handleCLose} isOpen={isOpen}>
      <form
        method="dialog"
        className={`${isOpen ? 'visible' : 'hidden'} modal-backdrop flex flex-col gap-5`}
        onSubmit={formik.handleSubmit}>
        <InputLabelWithIcon
          label="Email"
          icon={
            <div className="relative w-5 h-5 mr-2 bg-transparent">
              <SvgMail width={24} height={24} className={'stroke-base-300'} />
            </div>
          }
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="my email"
          readOnly={true}
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
          readOnly={true}
          error={
            formik.touched.phoneNumber && formik.errors.phoneNumber
              ? formik.errors.phoneNumber
              : ''
          }
        />

        <div className="flex justify-end">
          <Button
            type="button"
            className="btn-outline text-primary w-max"
            title="Close"
            disabled={disabledSubmit}
            onClick={handleCLose}
          />
        </div>
      </form>
    </PopupContainer>
  );
};

export default PopupProfile;
