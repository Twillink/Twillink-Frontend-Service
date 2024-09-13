'use client';

import React from 'react';
import {useFormikContext} from 'formik';
import Input from '@/components/Input';
import ErrorMessageField from '@/components/ErrorMessageField';

interface FormEmailValues {
  email: string;
  password: string;
}

export default function FormEmail() {
  const {values, errors, touched, handleChange, handleBlur} =
    useFormikContext<FormEmailValues>();

  return (
    <div className="gap-6 flex flex-col">
      <div>
        <Input
          type="email"
          placeholder="your mail"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="email"
        />
        <ErrorMessageField error={errors.email} touched={touched.email} />
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
        />
        <ErrorMessageField error={errors.password} touched={touched.password} />
      </div>
    </div>
  );
}
