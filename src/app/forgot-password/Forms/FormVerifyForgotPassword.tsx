import ErrorMessageField from '@/components/ErrorMessageField';
import {IGeneralSubmit} from '@/libs/types/IGeneralSubmit';
import {useFormikContext} from 'formik';
import {useEffect} from 'react';
import OtpInput from 'react-otp-input';
import {ForgotPasswordInitialData} from '../page';

interface IFormVerifyForgotPassword {
  handleSubmit: (data: ForgotPasswordInitialData) => void;
  generalSubmit: IGeneralSubmit;
  formValues: ForgotPasswordInitialData;
}

const NUMINPUT: number = 4;

function FormVerifyForgotPassword({
  handleSubmit,
  generalSubmit,
  formValues,
}: IFormVerifyForgotPassword) {
  const {values, errors, touched, setFieldValue, setFieldTouched} =
    useFormikContext<ForgotPasswordInitialData>();

  useEffect(() => {
    if (values.codeOtp.length === NUMINPUT && !generalSubmit.isLoading) {
      const body = {
        codeOtp: values.codeOtp,
        email: formValues.email,
      };
      handleSubmit(body);
    }
  }, [values.codeOtp]);

  const handleOtpChange = (otp: string) => {
    setFieldValue('codeOtp', otp);
  };

  const handleInputBlur = () => {
    setFieldTouched('codeOtp', true);
  };

  return (
    <div className="flex items-center w-full justify-center">
      {generalSubmit.isLoading ? (
        <span className="loading loading-ring w-20 text-general-med"></span>
      ) : (
        <div className="flex-col w-full">
          <OtpInput
            value={values.codeOtp}
            onChange={handleOtpChange}
            numInputs={NUMINPUT}
            renderSeparator={<span>-</span>}
            containerStyle={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
            renderInput={(inputProps, index) => (
              <input
                {...inputProps}
                maxLength={1}
                id={`codeOtp-${index}`}
                name={`codeOtp-${index}`}
                onBlur={() => handleInputBlur()}
                className={`!w-[60px] h-[84px] input input-bordered rounded-lg p-3 text-primary bg-contras-med`}
              />
            )}
          />
          <ErrorMessageField error={errors.codeOtp} touched={touched.codeOtp} />
        </div>
      )}
    </div>
  );
}

export default FormVerifyForgotPassword;
