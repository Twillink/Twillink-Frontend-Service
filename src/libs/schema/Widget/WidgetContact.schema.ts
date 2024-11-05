import * as Yup from 'yup';

const AddWidgetContactSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .test(
      'email-or-phone',
      'Either email or phone number is required',
      function (value) {
        const {phoneNumber} = this.options.context || {};
        return !!value || !!phoneNumber;
      },
    ),

  phoneNumber: Yup.string()
    .matches(/^[0-9+]*$/, 'Phone number must be digits or "+" only')
    .min(10, 'Phone number must be at least 10 digits')
    .test(
      'email-or-phone',
      'Either email or phone number is required',
      function (value) {
        const {email} = this.options.context || {};
        return !!value || !!email;
      },
    ),
});

export default AddWidgetContactSchema;
