'use client';

import React, {useEffect, useState} from 'react';
import {useFormikContext} from 'formik';
import OtpInput from 'react-otp-input';
import ErrorMessageField from '@/components/ErrorMessageField';
import Button from '@/components/Button';
import {useRouter} from 'next/navigation';

interface FormVerifyValues {
  otp: string;
}

const NUMINPUT: number = 4;

export default function FormVerify() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {values, errors, touched, setFieldValue, setFieldTouched} =
    useFormikContext<FormVerifyValues>();

  const verifyOtp = async (otp: string) => {
    try {
      console.log('OTP verification:', otp);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      setIsVerified(true);
    } catch (error) {
      console.error('OTP verification error:', error);
    }
  };

  useEffect(() => {
    if (values.otp.length === NUMINPUT) {
      verifyOtp(values.otp);
    }
  }, [values.otp]);

  const handleOtpChange = (otp: string) => {
    setFieldValue('otp', otp);
  };

  const handleInputBlur = () => {
    setFieldTouched('otp', true);
  };

  return (
    <div className="flex items-center w-full justify-center">
      {isLoading ? (
        <span className="loading loading-ring w-[60px] text-general-med"></span>
      ) : (
        <>
          {isVerified ? (
            <>
              <Button
                title="Navigate to Admin"
                onClick={() => router.push('/admin')}
                type="button"
              />
            </>
          ) : (
            <div className="flex-col w-full">
              <OtpInput
                value={values.otp}
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
                    id={`otp-${index}`}
                    name={`otp-${index}`}
                    onBlur={() => handleInputBlur()}
                    className={`!w-[60px] h-[84px] input input-bordered rounded-lg p-3 text-primary bg-contras-med`}
                  />
                )}
              />
              <ErrorMessageField error={errors.otp} touched={touched.otp} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
