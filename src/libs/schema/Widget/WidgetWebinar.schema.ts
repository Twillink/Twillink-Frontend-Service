import * as Yup from 'yup';

const AddWidgetWebinarSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  urlWebinar: Yup.string().required('URL is required'),
  description: Yup.string().required('Description is required'),
  webinarType: Yup.string().required('Webinar Type is required'),
  passcode: Yup.string().nullable(),
  urlThumbnail: Yup.string().nullable(),
  notes: Yup.string().nullable(),
  startDate: Yup.string().required('Start Time is required'),
  endDate: Yup.string().required('End Time is required'),
  date: Yup.string().required('Date is required'),
});

export default AddWidgetWebinarSchema;
