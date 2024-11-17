import * as Yup from 'yup';

const AddWidgetPdfSchema = Yup.object().shape({
  caption: Yup.string().nullable(),
  files: Yup.array()
    .of(Yup.mixed().required('PDF is required'))
    .min(1, 'At least one pdf is required'),
});

export default AddWidgetPdfSchema;
