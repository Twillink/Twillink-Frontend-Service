import React, {useEffect, useRef} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import InputLabel from '@/components/InputLabel';
import ErrorMessageField from '@/components/ErrorMessageField';
import Button from '@/components/Button';
import InputPhoneCountries from '@/components/InputPhoneCountries';
import {useAppDispatch, useAppSelector} from '@/libs/hooks/useReduxHook';
import {RootState} from '@/libs/store/store';
import {apiGetCountry} from '@/libs/api';
import {setCountries, setIsLoading} from '@/libs/store/features/countrySlice';
import {mappingCountryToDialOptions} from '@/utils/mappingCountryToDialOptions';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
});

interface FormProfileProps {
  onSubmit: (values: {name: string; phoneNumber: string}) => void;
}

const FormProfile: React.FC<FormProfileProps> = ({onSubmit}) => {
  const dispatch = useAppDispatch();
  const generalSubmit = useAppSelector(state => state.generalSubmit);
  const userProfile = useAppSelector((state: RootState) => state.userProfile);
  const country = useAppSelector((state: RootState) => state.country);
  const formikRef = useRef<any>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setFieldValue(
        'name',
        userProfile.profile?.profile?.fullName || '',
      );
      formikRef.current.setFieldValue(
        'phoneNumber',
        userProfile.profile?.profile?.phoneNumber || '+62',
      );
      formikRef.current.setFieldValue(
        'username',
        userProfile.profile?.linkUserAuth[0]?.link.userName || '',
      );
      formikRef.current.setFieldValue(
        'email',
        userProfile.profile?.email || '',
      );
    }
  }, [userProfile]);

  useEffect(() => {
    if (country.countries.length === 0 && !isFetchingRef.current) {
      isFetchingRef.current = true;
      dispatch(setIsLoading(true));
      apiGetCountry(dispatch, false)
        .then(response => {
          dispatch(setCountries(response.data));
        })
        .catch()
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    }
  }, [country.countries.length, dispatch]);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        name: '',
        phoneNumber: '+62',
        username: '',
        email: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({values, errors, touched, isValid, handleChange, handleBlur}) => (
        <Form className="flex flex-wrap w-full md:max-w-[50%]">
          <div className="w-full md:w-1/2 mb-6 md:pr-3">
            <InputLabel
              label="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              placeholder="Input name"
              className={touched.name && errors.name ? 'input-error' : ''}
            />
            <ErrorMessageField error={errors.name} touched={touched.name} />
          </div>

          <div className="w-full md:w-1/2 mb-6 md:pl-3">
            <InputLabel
              label="Username"
              value={values.username}
              name="username"
              placeholder="Username / link"
              disabled
            />
          </div>

          <div className="w-full md:w-1/2 mb-6 md:pr-3">
            <InputLabel
              label="Email"
              value={values.email}
              name="email"
              placeholder="Input email"
              disabled
            />
          </div>

          <div className="w-full md:w-1/2 mb-6 md:pl-3">
            <InputPhoneCountries
              options={mappingCountryToDialOptions(country.countries)}
              label="Phone Number"
              value={values.phoneNumber}
              onChange={newVal =>
                handleChange({
                  target: {name: 'phoneNumber', value: newVal.target.value},
                })
              }
              onBlur={handleBlur}
              placeholder="Input phone number"
              name="phoneNumber"
              className={
                touched.phoneNumber && errors.phoneNumber ? 'input-error' : ''
              }
              autoComplete="phone-number"
              disabled={country.isLoading}
            />
            <ErrorMessageField
              error={errors.phoneNumber}
              touched={touched.phoneNumber}
            />
          </div>

          <div className="mt-6 flex justify-end w-full">
            <Button
              title="Update Profile"
              type="submit"
              outline
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

export default FormProfile;
