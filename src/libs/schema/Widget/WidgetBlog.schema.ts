import * as Yup from 'yup';

const AddWidgetBlogSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  selectedImage: Yup.string()
    .required('Image is required')
    .min(1, 'Image is required'),
});

export default AddWidgetBlogSchema;
