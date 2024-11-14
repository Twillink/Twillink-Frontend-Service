import * as Yup from 'yup';

const AddWidgetMapSchema = Yup.object({
  caption: Yup.string().required('Caption is required'),
  latitude: Yup.number().required('latitude is required'),
  longitude: Yup.number().required('longitude is required'),
});

export default AddWidgetMapSchema;
