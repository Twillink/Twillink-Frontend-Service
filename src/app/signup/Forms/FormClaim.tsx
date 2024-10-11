'use client';

import SvgCheck from '@/assets/svgComponents/SvgCheck';
import Button from '@/components/Button';
import ErrorMessageField from '@/components/ErrorMessageField';
import InputWithLabel from '@/components/InputWithLabel';
import {apiLinkCheck} from '@/libs/api';
import useDebounce from '@/libs/hooks/useDebounce';
import {ErrorApiResponseType} from '@/libs/types/ErrorApiResponseType';
import {useFormikContext} from 'formik';
import React, {useEffect, useState} from 'react';
import validIcon from '@/assets/gifs/valid-green.gif';
import Image from 'next/image';

interface IFormClaimValues {
  username: string;
}

interface IFormClaim {
  onNext: () => void;
}

const FormClaim: React.FC<IFormClaim> = ({onNext}) => {
  const {values, setFieldValue, errors, touched, handleBlur, isValid, dirty} =
    useFormikContext<IFormClaimValues>();
  const [usernameValid, setUsernameValid] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const debouncedUsername = useDebounce(values.username, 1000);

  const handleCheckUsername = async (username: string) => {
    setChecking(true);
    setApiError(null);
    try {
      const response = await apiLinkCheck(username);
      setUsernameValid(response.status === 200);
    } catch (error: unknown) {
      const apiError = error as ErrorApiResponseType;
      setApiError(apiError?.data?.message);
      setUsernameValid(false);
    } finally {
      setTimeout(() => {
        setChecking(false);
      }, 500);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    const isValid = /^[a-zA-Z0-9._-]+$/.test(value);
    if (isValid) {
      setFieldValue('username', value);
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
    }
    if (!isValid) {
      setUsernameValid(false);
    }
  }, [debouncedUsername, isValid]);

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
          disabled={!isValid || !dirty || !usernameValid || checking}
          type="button"
          icon={<SvgCheck className="stroke-primary-content" height={20} />}
        />
      </div>
    </div>
  );
};

export default FormClaim;
