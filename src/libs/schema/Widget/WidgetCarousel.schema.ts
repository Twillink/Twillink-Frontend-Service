import * as Yup from 'yup';

const AddWidgetCarouselSchema = Yup.object().shape({
  caption: Yup.string().required('Caption is required'),
  selectedImages: Yup.array()
    .of(Yup.string().required('Image is required'))
    .min(1, 'At least one image is required'),
});

export default AddWidgetCarouselSchema;
