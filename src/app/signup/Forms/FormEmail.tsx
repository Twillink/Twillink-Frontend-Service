'use client';

import React, {useCallback, useEffect, useState} from 'react';
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
import {IGeneralSubmit} from '@/libs/types/IGeneralSubmit';
import {useAppDispatch} from '@/libs/hooks/useReduxHook';

interface IFormEmailValues {
  email: string;
  password: string;
  username: string;
}

interface IFormEmail {
  onNext: () => void;
  generalSubmit: IGeneralSubmit;
}

const FormEmail: React.FC<IFormEmail> = ({onNext, generalSubmit}) => {
  const dispatch = useAppDispatch();

  const {
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    handleBlur,
    isValid,
    dirty,
  } = useFormikContext<IFormEmailValues>();

  const [emailAvail, setEmailAvail] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const debouncedEmail = useDebounce(values.email);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setFieldValue('email', value);
    setIsTyping(true);
  };

  const handleCheckEmail = useCallback(
    async (email: string) => {
      setChecking(true);
      setApiError(null);

      try {
        await apiAuthCheckEmail(dispatch, email, false);
        setEmailAvail(true);
      } catch (error: unknown) {
        const apiError = error as ErrorApiResponseType;
        setApiError(apiError?.data?.message);
        setEmailAvail(false);
      } finally {
        setChecking(false);
      }
    },
    [dispatch],
  );

  const handleGoogleSignUp = async () => {
    const username = values.username;
    if (!username) {
      return;
    }
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user-auth-social/google-signup?userName=${encodeURIComponent(username)}`,
      '_blank',
    );
  };

  useEffect(() => {
    if (debouncedEmail && !errors.email) {
      handleCheckEmail(debouncedEmail);
      setIsTyping(false);
    } else {
      setEmailAvail(false);
      setApiError(null);
    }
  }, [debouncedEmail, errors.email, handleCheckEmail]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Input
          type="email"
          placeholder="your mail"
          name="email"
          id="email"
          value={values.email}
          onChange={handleEmailChange}
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
            !emailAvail ||
            isTyping ||
            generalSubmit.isLoading
          }
          loading={generalSubmit.isLoading}
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
