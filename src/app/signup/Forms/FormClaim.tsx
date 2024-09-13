'use client';

import ErrorMessageField from '@/components/ErrorMessageField';
import InputWithLabel from '@/components/InputWithLabel';
import {useFormikContext} from 'formik';
import React from 'react';

interface FormClaimValues {
  username: string;
}

const FormClaim: React.FC = () => {
  const {values, errors, touched, handleChange, handleBlur} =
    useFormikContext<FormClaimValues>();

  return (
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
      />
      <ErrorMessageField error={errors.username} touched={touched.username} />
    </div>
  );
};

export default FormClaim;
