'use client';

import GradientBg from '@/components/GradientBg';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import Input from '@/components/Input';
import ErrorMessageField from '@/components/ErrorMessageField';
import Button from '@/components/Button';
import ButtonIcon from '@/components/ButtonIcon';
import SvgArrowLeft from '@/assets/svgComponents/SvgArrowLeft';
import Link from 'next/link';

type InitialData = {
  email: string;
};

const initialValue: InitialData = {
  email: '',
};

const ForgotPasswordPage: React.FC = () => {
  const schema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const handleSubmit = (values: InitialData) => {
    console.log('Form submitted:', values);
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
            <Form className="w-full">
              <div className="stack w-full">
                <div
                  className="card w-full max-w-[528px] bg-contras-high text-primary-content shadow-sm"
                  key="card_login">
                  <div className="card-body w-full px-6 sm:px-[99px] py-10 sm:py-[90px]">
                    <div className="flex flex-col gap-6 w-full">
                      <Link href="/login">
                        <ButtonIcon
                          icon={
                            <SvgArrowLeft
                              height={24}
                              className="stroke-primary hover:stroke-general-med"
                            />
                          }
                          type="button"
                          className="flex justify-start w-max"
                        />
                      </Link>
                      <h3 className="card-title text-primary">
                        Forgot Password
                      </h3>
                      <div>
                        <p className="font-normal text-base text-primary">
                          Please enter your email. <br />
                          We will send you recovery link.
                        </p>
                      </div>
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
                      <div className="flex justify-end">
                        <div>
                          <Button
                            onClick={async () => {
                              const errors = await validateForm();
                              if (Object.keys(errors).length === 0) {
                                handleSubmit({
                                  email: values.email,
                                });
                              }
                            }}
                            title="Submit"
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

export default ForgotPasswordPage;
