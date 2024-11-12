import * as Yup from 'yup';

const AddWidgetBannerSchema = Yup.object({
  selectedImage: Yup.mixed().required('Image is required'),
});

export default AddWidgetBannerSchema;
