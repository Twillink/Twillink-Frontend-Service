'use client';

import React from 'react';
import {useFormikContext} from 'formik';
import Input from '@/components/Input';
import ErrorMessageField from '@/components/ErrorMessageField';
import Button from '@/components/Button';
import ButtonSocialAuth from '@/components/ButtonSocialAuth';
import Image from 'next/image';
import GoogleIcon from '@/assets/svgs/google-icon.svg';

interface FormEmailValues {
  email: string;
  password: string;
}

interface FormEmailProps {
  onNext: () => void;
}

const FormEmail: React.FC<FormEmailProps> = ({onNext}) => {
  const {values, errors, touched, handleChange, handleBlur, isValid, dirty} =
    useFormikContext<FormEmailValues>();

  const handleGoogleSignUp = async () => {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/user-auth/google`,
      '_blank',
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Input
          type="email"
          placeholder="your mail"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="email"
        />
        <ErrorMessageField error={errors.email} touched={touched.email} />
      </div>

      <div>
        <Input
          type="password"
          placeholder="Your Password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="current-password"
        />
        <ErrorMessageField error={errors.password} touched={touched.password} />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          title="Send"
          disabled={!isValid || !dirty}
          type="button"
          className="px-[42px]"
        />
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-center text-general-med text-base leading-5 font-normal">
          Or
        </p>
        <ButtonSocialAuth
          title="Register with Google"
          icon={<Image src={GoogleIcon} alt="Google icon" />}
          onClick={handleGoogleSignUp}
          type="button"
        />
      </div>
    </div>
  );
};

export default FormEmail;
