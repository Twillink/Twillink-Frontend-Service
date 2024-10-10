'use client';

import React, {useEffect, useState} from 'react';
import {useFormikContext} from 'formik';
import Input from '@/components/Input';
import ErrorMessageField from '@/components/ErrorMessageField';
import Button from '@/components/Button';
import ButtonSocialAuth from '@/components/ButtonSocialAuth';
import Image from 'next/image';
import GoogleIcon from '@/assets/svgs/google-icon.svg';
import useDebounce from '@/libs/hooks/useDebounce';
import {apiAuthCheckEmail} from '@/libs/api';
import {ErrorApiResponseType} from '@/libs/types/ErrorApiResponseType';
import {AuthSubmitState} from '@/libs/types/AuthType';

interface IFormEmailValues {
  email: string;
  password: string;
  username: string;
}

interface IFormEmail {
  onNext: () => void;
  submitState: AuthSubmitState;
}

const FormEmail: React.FC<IFormEmail> = ({onNext, submitState}) => {
  const {values, errors, touched, handleChange, handleBlur, isValid, dirty} =
    useFormikContext<IFormEmailValues>();

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const debouncedEmail = useDebounce(values.email, 1000);

  const handleCheckEmail = async (email: string) => {
    setChecking(true);
    setApiError(null);
    try {
      const response = await apiAuthCheckEmail(email);
      setEmailValid(response.status === 200);
    } catch (error: unknown) {
      const apiError = error as ErrorApiResponseType;
      setApiError(apiError?.data?.message);
      setEmailValid(false);
    } finally {
      setChecking(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const username = values.username;
    if (!username) {
      return;
    }
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user-auth-social/google?userName=${encodeURIComponent(username)}`,
      '_blank',
    );
  };

  useEffect(() => {
    if (debouncedEmail && values.email) {
      handleCheckEmail(debouncedEmail);
    }
    if (!values.email) {
      setEmailValid(false);
    }
  }, [debouncedEmail, values]);

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
        <ErrorMessageField
          error={errors.email || apiError}
          touched={touched.email}
        />
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
          disabled={
            !isValid ||
            !dirty ||
            checking ||
            !emailValid ||
            submitState.isLoading
          }
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
