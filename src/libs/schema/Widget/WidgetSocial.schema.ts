import * as Yup from 'yup';

const AddWidgetSocialSchema = Yup.object().shape({
  title: Yup.string().required('A social account must be selected'),
  url: Yup.string().url('Invalid URL').required('URL is required'),
});

export default AddWidgetSocialSchema;
