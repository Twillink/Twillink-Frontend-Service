import * as Yup from 'yup';

const AddWidgetImageSchema = Yup.object().shape({
  caption: Yup.string().nullable().max(100, 'Caption is 100 characters max'),
  url: Yup.string()
    .url('Invalid URL')
    .test(
      'url-or-selectedImage',
      'Either url or selectedImage is required',
      function (value) {
        const {selectedImage} = this.options.context || {};
        return !!value || !!selectedImage;
      },
    ),
  selectedImage: Yup.string()
    .nullable()
    .test(
      'url-or-selectedImage',
      'Either url or selectedImage is required',
      function (value) {
        const {url} = this.options.context || {};
        return !!value || !!url;
      },
    ),
});

export default AddWidgetImageSchema;
