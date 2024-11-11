'use client';

import SvgCheck from '@/assets/svgComponents/SvgCheck';
import Button from '@/components/Button';
import ErrorMessageField from '@/components/ErrorMessageField';
import InputWithLabel from '@/components/InputWithLabel';
import useDebounce from '@/libs/hooks/useDebounce';
import {ErrorApiResponseType} from '@/libs/types/ErrorApiResponseType';
import {useFormikContext} from 'formik';
import React, {useCallback, useEffect, useState} from 'react';
import validIcon from '@/assets/gifs/valid-green.gif';
import Image from 'next/image';
import {testValidUsername} from '@/utils/validationTest';
import {useAppDispatch} from '@/libs/hooks/useReduxHook';
import {apiLinkCheck} from '@/libs/api';

interface IFormClaimValues {
  username: string;
}

interface IFormClaim {
  onNext: () => void;
}

const FormClaim: React.FC<IFormClaim> = ({onNext}) => {
  const dispatch = useAppDispatch();

  const {values, setFieldValue, errors, touched, handleBlur, isValid, dirty} =
    useFormikContext<IFormClaimValues>();
  const [usernameValid, setUsernameValid] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const debouncedUsername = useDebounce(values.username, 2000);

  const handleCheckUsername = useCallback(
    async (username: string) => {
      setChecking(true);
      setApiError(null);

      try {
        await apiLinkCheck(dispatch, username, false);
        setUsernameValid(true);
      } catch (error: unknown) {
        const apiError = error as ErrorApiResponseType;

        setApiError(apiError?.data?.message);
        setUsernameValid(false);
      } finally {
        setChecking(false);
      }
    },
    [dispatch],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    const isValid = testValidUsername(value);
    if (isValid) {
      setFieldValue('username', value);
      setIsTyping(true);
    }
  };

  const handleClear = () => {
    setFieldValue('username', '');
    setUsernameValid(false);
    setApiError(null);
  };

  useEffect(() => {
    if (debouncedUsername && isValid) {
      handleCheckUsername(debouncedUsername);
      setIsTyping(false);
    }
    if (!isValid) {
      setUsernameValid(false);
    }
  }, [debouncedUsername, isValid, handleCheckUsername]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <InputWithLabel
          label="twilink.com/"
          type="text"
          placeholder="username"
          name="username"
          id="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          loading={checking}
          handleClear={handleClear}
          iconRight={
            usernameValid && (
              <Image
                className="h-6 w-6"
                src={validIcon}
                alt="valid"
                priority={false}
              />
            )
          }
        />
        <ErrorMessageField
          error={errors.username || apiError}
          touched={touched.username}
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={onNext}
          title="Grab My Link"
          disabled={
            !isValid || !dirty || !usernameValid || checking || isTyping
          }
          type="button"
          icon={<SvgCheck className="stroke-primary-content" height={20} />}
        />
      </div>
    </div>
  );
};

export default FormClaim;
