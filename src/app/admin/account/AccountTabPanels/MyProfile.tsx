import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import InputLabel from '@/components/InputLabel';
import ErrorMessageField from '@/components/ErrorMessageField';
import Button from '@/components/Button';
import InputPhoneCountries from '@/components/InputPhoneCountries';
import countryOptions from '@/mock/countryOptions';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: Yup.string().required('Email is required').email('Email is not valid'),
  currentPassword: Yup.string(),
  newPassword: Yup.string().min(
    6,
    'New password must be at least 6 characters',
  ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), undefined],
    'Passwords must match',
  ),
});

const MyProfile: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      phoneNumber: '+62',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: values => {
      console.log('Form data:', values);
    },
  });

  return (
    <div className="w-full">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-wrap w-full md:max-w-[50%]">
        <div className="w-full md:w-1/2 mb-6 md:pr-3">
          <InputLabel
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            placeholder="Input name"
            className={
              formik.touched.name && formik.errors.name ? 'input-error' : ''
            }
          />
          <ErrorMessageField
            error={formik.errors.name}
            touched={formik.touched.name}
          />
        </div>

        <div className="w-full md:w-1/2 mb-6 md:pl-3">
          <InputLabel
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="username"
            placeholder="Username / link"
            className={
              formik.touched.username && formik.errors.username
                ? 'input-error'
                : ''
            }
            autoComplete="username"
          />
          <ErrorMessageField
            error={formik.errors.username}
            touched={formik.touched.username}
          />
        </div>

        <div className="w-full md:w-1/2 mb-6 md:pr-3">
          <InputLabel
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            placeholder="Input email"
            className={
              formik.touched.email && formik.errors.email ? 'input-error' : ''
            }
            autoComplete="email"
          />
          <ErrorMessageField
            error={formik.errors.email}
            touched={formik.touched.email}
          />
        </div>

        <div className="w-full md:w-1/2 mb-6 md:pl-3">
          <InputPhoneCountries
            options={countryOptions}
            label="Phone Number"
            value={formik.values.phoneNumber}
            onChange={newVal => {
              formik.setFieldValue('phoneNumber', newVal.target.value);
            }}
            onBlur={formik.handleBlur}
            placeholder="Input phone number"
            name="phoneNumber"
            className={
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? 'input-error'
                : ''
            }
            autoComplete="phone-number"
          />
          <ErrorMessageField
            error={formik.errors.phoneNumber}
            touched={formik.touched.phoneNumber}
          />
        </div>

        <p className="text-primary text-xl font-bold w-full mb-6">Password</p>

        <div className="w-full">
          <div className="w-full md:w-1/2 mb-6 md:pr-3">
            <InputLabel
              label="Current Password"
              type="password"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="currentPassword"
              placeholder="Input current password"
              className={
                formik.touched.currentPassword && formik.errors.currentPassword
                  ? 'input-error'
                  : ''
              }
              autoComplete="current-password"
            />
            <ErrorMessageField
              error={formik.errors.currentPassword}
              touched={formik.touched.currentPassword}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 mb-6 md:pr-3">
          <InputLabel
            label="New Password"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="newPassword"
            placeholder="Input new password"
            className={
              formik.touched.newPassword && formik.errors.newPassword
                ? 'input-error'
                : ''
            }
            autoComplete="new-password"
          />
          <ErrorMessageField
            error={formik.errors.newPassword}
            touched={formik.touched.newPassword}
          />
        </div>

        <div className="w-full md:w-1/2 mb-6 md:pl-3">
          <InputLabel
            label="Confirm New Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="confirmPassword"
            placeholder="Re input new password"
            className={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? 'input-error'
                : ''
            }
            autoComplete="new-password"
          />
          <ErrorMessageField
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
          />
        </div>

        <div className="mt-6 flex justify-end w-full">
          <Button title="Update" type="submit" outline size="md" />
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
