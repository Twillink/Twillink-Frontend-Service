'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import Input from '@/components/Input';
import ErrorMessageField from '@/components/ErrorMessageField';
import Button from '@/components/Button';
import ButtonSocialAuth from '@/components/ButtonSocialAuth';
import Image from 'next/image';
import GoogleIcon from '@/assets/svgs/google-icon.svg';
import useDebounce from '@/libs/hooks/useDebounce';
import { IGeneralSubmit } from '@/libs/types/IGeneralSubmit';
import { useAppDispatch } from '@/libs/hooks/useReduxHook';
import { apiAuthCheckEmail, apiAuthRegisterGoogle } from '@/libs/api';
import { PasswordInput } from '@/components/PasswordInput';
import { authLogin } from '@/libs/store/features/authSlice';
import { setSubmitLoading, setSubmitSuccess } from '@/libs/store/features/generalSubmitSlice';
import { auth, provider, signInWithPopup } from '@/libs/api/firebase-config';
import { useRouter } from 'next/router';

interface IFormEmailValues {
  email: string;
  password: string;
  username: string;
}

interface IFormEmail {
  onNext: () => void;
  generalSubmit: IGeneralSubmit;
}

const FormEmail: React.FC<IFormEmail> = ({ onNext, generalSubmit }) => {
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
    const { value } = event.target;
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
      } catch (error: any) {
        setApiError('Email ' + error?.message?.toLowerCase());
        setEmailAvail(false);
      } finally {
        setChecking(false);
      }
    },
    [dispatch],
  );

  const router = useRouter();

  const handleGoogleSignUp = async () => {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    const body = {
      token: token,
      username: values.username,
    };

    return apiAuthRegisterGoogle(dispatch, body)
      .then(response => {
        dispatch(authLogin(response.data));
        localStorage.setItem('authToken', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data));
        router.push('/admin');
        return true;
      })
      .catch(() => {
        return false;
      })
      .finally(() => {
        dispatch(setSubmitLoading(false));
      });
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
        <PasswordInput
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
