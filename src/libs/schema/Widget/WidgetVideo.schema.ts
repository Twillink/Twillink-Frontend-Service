import * as Yup from 'yup';

const AddWidgetVideoSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  url: Yup.string().url('Invalid URL').required('URL is required'),
});

export default AddWidgetVideoSchema;
