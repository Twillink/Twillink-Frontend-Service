'use client';

import GradientBg from '@/components/GradientBg';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import Button from '@/components/Button';
import ErrorMessageField from '@/components/ErrorMessageField';
import Input from '@/components/Input';

type InitialData = {
  password: string;
  confirmPassword: string;
};

const initialValue: InitialData = {
  password: '',
  confirmPassword: '',
};

const ResetPasswordPage: React.FC = () => {
  const schema = Yup.object({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
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
            <Form>
              <div className="stack">
                <div
                  className="card bg-contras-high text-primary-content shadow-sm"
                  key="card_reset_password">
                  <div className="card-body px-[99px] py-[90px]">
                    <div className="flex flex-col gap-6 w-full sm:w-[376px]">
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
