import * as Yup from 'yup';

const AddWidgetVideoSchema = Yup.object().shape({
  caption: Yup.string().nullable().max(100, 'Caption is 100 characters max'),
  url: Yup.string()
    .url('Invalid URL')
    .test(
      'url-or-selectedVideo',
      'Either url or selectedVideo is required',
      function (value) {
        const {selectedVideo} = this.options.context || {};
        return !!value || !!selectedVideo;
      },
    ),
  selectedVideo: Yup.string()
    .nullable()
    .test(
      'url-or-selectedVideo',
      'Either url or selectedVideo is required',
      function (value) {
        const {url} = this.options.context || {};
        return !!value || !!url;
      },
    ),
});

export default AddWidgetVideoSchema;
