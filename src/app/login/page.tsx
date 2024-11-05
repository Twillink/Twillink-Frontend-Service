'use client';

import GradientBg from '@/components/GradientBg';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import ButtonSocialAuth from '@/components/ButtonSocialAuth';
import Button from '@/components/Button';
import Link from 'next/link';
import ErrorMessageField from '@/components/ErrorMessageField';
import Input from '@/components/Input';
import Image from 'next/image';
import GoogleIcon from '@/assets/svgs/google-icon.svg';
import {authLogin} from '@/libs/store/features/authSlice';
import {useRouter} from 'next/navigation';
import {useAppDispatch, useAppSelector} from '@/libs/hooks/useReduxHook';
import {apiAuthLogin} from '@/libs/api';
import {showToast} from '@/libs/store/features/toastSlice';
import {ToastType} from '@/libs/types/ToastType';
import {setSubmitLoading} from '@/libs/store/features/generalSubmitSlice';
import {useEffect} from 'react';
import ButtonIcon from '@/components/ButtonIcon';
import SvgArrowLeft from '@/assets/svgComponents/SvgArrowLeft';

type InitialData = {
  email: string;
  password: string;
};

const initialValue: InitialData = {
  email: '',
  password: '',
};

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const generalSubmit = useAppSelector(state => state.generalSubmit);

  const router = useRouter();

  const schema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const handleGoogleSignIn = async () => {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user-auth-social/google-signin`,
      '_blank',
    );
  };

  const handleSubmit = async (values: InitialData) => {
    dispatch(setSubmitLoading(true));
    const body = {
      email: values.email,
      password: values.password,
    };

    return apiAuthLogin(dispatch, body)
      .then(response => {
        dispatch(authLogin(response.data));
        localStorage.setItem('authToken', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data));
        router.push('/admin');
      })
      .catch()
      .finally(() => {
        dispatch(setSubmitLoading(false));
      });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get('error');

    if (error) {
      dispatch(
        showToast({
          title: 'Failed',
          message: error,
          type: ToastType.ERROR,
        }),
      );
    }
  }, [dispatch]);

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
                      <ButtonIcon
                        icon={
                          <SvgArrowLeft className="stroke-primary hover:stroke-general-med" />
                        }
                        onClick={() => router.back()}
                        type="button"
                        className="flex justify-start w-max"
                      />
                      <h3 className="card-title text-primary">Login</h3>
                      <div className="flex flex-col gap-6">
                        <div>
                          <Input
                            type="email"
                            placeholder="Your mail"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="email"
                            className="h-10"
                          />
                          <ErrorMessageField
                            error={errors.email}
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
                            className="h-10"
                          />
                          <ErrorMessageField
                            error={errors.password}
                            touched={touched.password}
                          />
                        </div>

                        <div className="flex justify-between">
                          <div>
                            <Link
                              href="/forgot-password"
                              className="font-normal text-base text-primary">
                              Forgot Password
                            </Link>
                          </div>
                          <div>
                            <Button
                              onClick={async () => {
                                const errors = await validateForm();
                                if (Object.keys(errors).length === 0) {
                                  handleSubmit(values);
                                }
                              }}
                              title="Login"
                              disabled={
                                !isValid || !dirty || generalSubmit.isLoading
                              }
                              type="button"
                              size="md"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-6">
                          <p className="text-center text-general-med text-base leading-5 font-normal">
                            Or
                          </p>
                          <ButtonSocialAuth
                            title="Log in with Google"
                            icon={<Image src={GoogleIcon} alt="Google icon" />}
                            onClick={handleGoogleSignIn}
                            type="button"
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

export default LoginPage;
