import {IGeneralSubmit} from '@/libs/types/IGeneralSubmit';
import {useFormikContext} from 'formik';
import React, {useEffect, useState} from 'react';
import useDebounce from '@/libs/hooks/useDebounce';
import Input from '@/components/Input';
import ErrorMessageField from '@/components/ErrorMessageField';
import Button from '@/components/Button';

interface IFormEmailForgotPasswordValues {
  email: string;
}

interface IFormEmailForgotPassword {
  onNext: () => void;
  generalSubmit: IGeneralSubmit;
}

function FormEmailForgotPassword({
  onNext,
  generalSubmit,
}: IFormEmailForgotPassword) {
  const {values, errors, touched, setFieldValue, handleBlur, isValid, dirty} =
    useFormikContext<IFormEmailForgotPasswordValues>();

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const debouncedEmail = useDebounce(values.email);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setFieldValue('email', value);
    setIsTyping(true);
  };

  useEffect(() => {
    if (debouncedEmail && !errors.email) {
      setIsTyping(false);
    }
  }, [debouncedEmail, errors.email]);

  return (
    <>
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
          onChange={handleEmailChange}
          onBlur={handleBlur}
          autoComplete="email"
          className="h-10"
        />
        <ErrorMessageField error={errors.email} touched={touched.email} />
      </div>

      <div className="flex justify-end">
        <div>
          <Button
            onClick={onNext}
            title="Submit"
            disabled={!isValid || !dirty || isTyping || generalSubmit.isLoading}
            loading={generalSubmit.isLoading}
            type="button"
            size="md"
          />
        </div>
      </div>
    </>
  );
}

export default FormEmailForgotPassword;
