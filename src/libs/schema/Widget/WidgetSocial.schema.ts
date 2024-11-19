import * as Yup from 'yup';

const AddWidgetSocialSchema = Yup.object().shape({
  key: Yup.string().required('A social account must be selected'),
  value: Yup.string().required('URL is required'),
});

export default AddWidgetSocialSchema;
