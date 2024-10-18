import * as Yup from 'yup';

const AddWidgetVideoSchema = Yup.object({
  caption: Yup.string().required('Caption is required'),
  url: Yup.string().url('Invalid URL').required('URL is required'),
});

export default AddWidgetVideoSchema;
