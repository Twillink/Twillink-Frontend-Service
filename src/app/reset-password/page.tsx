'use client';

import GradientBg from '@/components/GradientBg';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import Button from '@/components/Button';
import ErrorMessageField from '@/components/ErrorMessageField';
import Input from '@/components/Input';
import {useAppDispatch, useAppSelector} from '@/libs/hooks/useReduxHook';
import {
  setSubmitLoading,
  setSubmitSuccess,
} from '@/libs/store/features/generalSubmitSlice';
import {apiResetPassword} from '@/libs/api';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {showToast} from '@/libs/store/features/toastSlice';
import {ToastType} from '@/libs/types/ToastType';

type InitialData = {
  password: string;
  confirmPassword: string;
};

const initialValue: InitialData = {
  password: '',
  confirmPassword: '',
};

const ResetPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const forgotPassword = useAppSelector(state => state.forgotPassword);

  const router = useRouter();

  const schema = Yup.object({
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values: InitialData) => {
    dispatch(setSubmitLoading(true));

    return apiResetPassword(dispatch, {
      password: values.password,
      codeOtp: forgotPassword.codeOtp,
    })
      .then(() => {
        dispatch(setSubmitSuccess(true));
        router.push('/login');
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
    if (!forgotPassword.codeOtp) {
      dispatch(
        showToast({
          title: 'Failed',
          message: 'Invalid OTP code, Please request new OTP code',
          type: ToastType.ERROR,
        }),
      );
      router.push('/forgot-password');
    }
  }, [forgotPassword.codeOtp]);

  return (
    <div data-theme="skinLight">
      <GradientBg />
      <div className="h-screen w-screen flex flex-col items-center justify-center px-1">
        <Formik
          initialValues={initialValue}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={handleSubmit}
          validationSchema={schema}>
          {({
            values,
            errors,
            touched,
            isValid,
            dirty,
            handleChange,
            handleBlur,
            validateForm,
          }) => (
            <Form className="w-full">
              <div className="stack w-full">
                <div
                  className="card w-full max-w-[528px] bg-contras-high text-primary-content shadow-sm"
                  key="card_login">
                  <div className="card-body w-full px-6 sm:px-[99px] py-10 sm:py-[90px]">
                    <div className="flex flex-col gap-6 w-full">
                      <h3 className="card-title text-primary">
                        Reset Password
                      </h3>
                      <div>
                        <p className="font-normal text-base text-primary">
                          Create your new password
                        </p>
                      </div>
                      <div className="flex flex-col gap-6">
                        <div>
                          <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="new-password"
                            className="h-10"
                          />
                          <ErrorMessageField
                            error={errors.password}
                            touched={touched.password}
                          />
                        </div>

                        <div>
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="new-password"
                            className="h-10"
                          />
                          <ErrorMessageField
                            error={errors.confirmPassword}
                            touched={touched.confirmPassword}
                          />
                        </div>

                        <div className="flex justify-end">
                          <Button
                            onClick={async () => {
                              const errors = await validateForm();
                              if (Object.keys(errors).length === 0) {
                                handleSubmit(values);
                              }
                            }}
                            title="Reset Password"
                            disabled={!isValid || !dirty}
                            type="button"
                            size="md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
