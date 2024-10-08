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
import {useAppDispatch} from '@/libs/hooks/useReduxHook';
import {apiAuthLogin} from '@/libs/api';

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
  const router = useRouter();
  const schema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  const handleGoogleSignIn = async () => {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user-auth-social/google`,
      '_blank',
    );
  };
  const handleSubmit = async (values: InitialData) => {
    try {
      const response = await apiAuthLogin(values.email, values.password);

      if (response.status === 200 || response.status === 201) {
        dispatch(authLogin(response.data));
        localStorage.setItem('authToken', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data));
        router.push('/admin');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

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
            <Form>
              <div className="stack">
                <div
                  className="card bg-contras-high text-primary-content shadow-sm"
                  key="card_login">
                  <div className="card-body px-[99px] py-[90px]">
                    <div className="flex flex-col gap-6 w-full sm:w-[376px]">
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
                              disabled={!isValid || !dirty}
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
