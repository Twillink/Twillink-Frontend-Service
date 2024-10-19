import * as Yup from 'yup';

const AddWidgetImageSchema = Yup.object({
  caption: Yup.string().required('Caption is required'),
  url: Yup.string().url('Invalid URL').required('URL is required'),
});

export default AddWidgetImageSchema;
