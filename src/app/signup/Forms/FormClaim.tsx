'use client';

import SvgCheck from '@/assets/svgComponents/SvgCheck';
import Button from '@/components/Button';
import ErrorMessageField from '@/components/ErrorMessageField';
import InputWithLabel from '@/components/InputWithLabel';
import {useFormikContext} from 'formik';
import React from 'react';

interface IFormClaimValues {
  username: string;
}

interface IFormClaim {
  onNext: () => void;
}

const FormClaim: React.FC<IFormClaim> = ({onNext}) => {
  const {values, errors, touched, handleChange, handleBlur, isValid, dirty} =
    useFormikContext<IFormClaimValues>();

  return (
    <div className="flex flex-col gap-6">
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
      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={onNext}
          title="Grab My Link"
          disabled={!isValid || !dirty}
          type="button"
          icon={<SvgCheck className="stroke-primary-content" />}
        />
      </div>
    </div>
  );
};

export default FormClaim;
