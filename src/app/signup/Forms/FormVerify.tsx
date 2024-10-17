'use client';

import React, {useCallback, useEffect, useState} from 'react';
import {useFormikContext} from 'formik';
import OtpInput from 'react-otp-input';
import ErrorMessageField from '@/components/ErrorMessageField';
import ButtonIcon from '@/components/ButtonIcon';
import successIcon from '@/assets/gifs/register-succes.gif';
import Image from 'next/image';
import Link from 'next/link';
import {ErrorApiResponseType} from '@/libs/types/ErrorApiResponseType';
import {IAuthInitialData} from '@/libs/types/IAuthInitialData';
import {apiOtpValidate} from '@/libs/api';
import {IGeneralSubmit} from '@/libs/types/IGeneralSubmit';
import {useAppDispatch} from '@/libs/hooks/useReduxHook';

interface IFormVerifyValues {
  otp: string;
}

interface IFormVerify {
  handleSubmit: () => void;
  generalSubmit: IGeneralSubmit;
  formValues: IAuthInitialData;
}

const NUMINPUT: number = 4;

export default function FormVerify({
  handleSubmit,
  generalSubmit,
  formValues,
}: IFormVerify) {
  const dispatch = useAppDispatch();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>('');
  const {values, errors, touched, setFieldValue, setFieldTouched} =
    useFormikContext<IFormVerifyValues>();

  const verifyOtp = useCallback(
    async (otp: string) => {
      setIsLoading(true);
      setApiError(null);

      const body = {
        codeOtp: otp,
        email: formValues.email,
      };

      return apiOtpValidate(dispatch, body)
        .then(() => {
          setIsVerified(true);
          handleSubmit();
        })
        .catch((error: unknown) => {
          const apiError = error as ErrorApiResponseType;
          setApiError(apiError?.data?.message);
          setIsVerified(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [dispatch, formValues.email, handleSubmit],
  );

  useEffect(() => {
    if (values.otp.length === NUMINPUT) {
      verifyOtp(values.otp);
    }
  }, [values.otp, verifyOtp]);

  const handleOtpChange = (otp: string) => {
    setFieldValue('otp', otp);
  };

  const handleInputBlur = () => {
    setFieldTouched('otp', true);
  };

  return (
    <div className="flex items-center w-full justify-center">
      {isLoading || generalSubmit.isLoading ? (
        <span className="loading loading-ring w-20 text-general-med"></span>
      ) : (
        <>
          {isVerified && !apiError && generalSubmit.isSuccess ? (
            <Link href="/admin">
              <ButtonIcon
                icon={
                  <Image
                    className="h-20 w-20"
                    src={successIcon}
                    alt="valid"
                    priority={false}
                  />
                }
              />
            </Link>
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
              <ErrorMessageField
                error={errors.otp || apiError}
                touched={touched.otp}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
