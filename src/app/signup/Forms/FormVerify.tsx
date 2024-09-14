'use client';

import React, {useEffect} from 'react';
import {useFormikContext} from 'formik';
import Input from '@/components/Input';
import ErrorMessageField from '@/components/ErrorMessageField';

interface FormVerifyValues {
  otp: string;
}

export default function FormVerify() {
  const {values, errors, touched, handleBlur, setFieldValue} =
    useFormikContext<FormVerifyValues>();

  const verifyOtp = async (otp: string) => {
    try {
      console.log('OTP verification:', otp);
    } catch (error) {
      console.error('OTP verification error:', error);
    }
  };

  useEffect(() => {
    if (values.otp.length === 6) {
      verifyOtp(values.otp);
    }
  }, [values.otp]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    if (value.length <= 6) {
      setFieldValue('otp', value);
    }
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Enter OTP"
        name="otp"
        id="otp"
        value={values.otp}
        onChange={handleInputChange}
        onBlur={handleBlur}
        maxLength={6}
      />
      <ErrorMessageField error={errors.otp} touched={touched.otp} />
    </div>
  );
}
