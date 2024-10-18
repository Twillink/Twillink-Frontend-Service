import React from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import InputLabel from '@/components/InputLabel';
import ErrorMessageField from '@/components/ErrorMessageField';
import Button from '@/components/Button';
import {useAppSelector} from '@/libs/hooks/useReduxHook';

const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(6, 'New password must be at least 6 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Confirm password is required'),
});

interface IFormChangePassword {
  onSubmit: (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
}

const FormChangePassword: React.FC<IFormChangePassword> = ({onSubmit}) => {
  const generalSubmit = useAppSelector(state => state.generalSubmit);
  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({values, errors, touched, isValid, handleChange, handleBlur}) => (
        <Form className="flex flex-wrap w-full md:max-w-[50%]">
          <div className="text-primary text-xl font-bold w-full mb-6">
            <p>Password</p>
            <input
              type="text"
              name="username"
              style={{display: 'none'}}
              autoComplete="username"
              aria-hidden="true"
            />
          </div>

          <div className="w-full">
            <div className="w-full md:w-1/2 mb-6 md:pr-3">
              <InputLabel
                label="Current Password"
                type="password"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                name="currentPassword"
                placeholder="Input current password"
                className={
                  touched.currentPassword && errors.currentPassword
                    ? 'input-error'
                    : ''
                }
                autoComplete="current-password"
              />
              <ErrorMessageField
                error={errors.currentPassword}
                touched={touched.currentPassword}
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 mb-6 md:pr-3">
            <InputLabel
              label="New Password"
              type="password"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              name="newPassword"
              placeholder="Input new password"
              className={
                touched.newPassword && errors.newPassword ? 'input-error' : ''
              }
              autoComplete="new-password"
            />
            <ErrorMessageField
              error={errors.newPassword}
              touched={touched.newPassword}
            />
          </div>

          <div className="w-full md:w-1/2 mb-6 md:pl-3">
            <InputLabel
              label="Confirm New Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              name="confirmPassword"
              placeholder="Re input new password"
              className={
                touched.confirmPassword && errors.confirmPassword
                  ? 'input-error'
                  : ''
              }
              autoComplete="new-password"
            />
            <ErrorMessageField
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
          </div>

          <div className="mt-6 flex justify-end w-full">
            <Button
              title="Reset Password"
              type="submit"
              outline
              color="error"
              size="md"
              loading={generalSubmit.isLoading}
              disabled={!isValid || generalSubmit.isLoading}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormChangePassword;
