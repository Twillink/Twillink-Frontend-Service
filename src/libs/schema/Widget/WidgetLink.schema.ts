import * as Yup from 'yup';

const AddWidgetLinkSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  url: Yup.string()
    // .matches(
    //   /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
    //   'Invalid URL',
    // )
    .required('URL is required'),
  selectedImage: Yup.mixed().required('Image is required'),
});

export default AddWidgetLinkSchema;
