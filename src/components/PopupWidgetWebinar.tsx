import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React, {useMemo} from 'react';
import Button from './Button';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';
import {IItemWidgetTypeValues} from '@/libs/types/IItemWidgetType';
import SvgGoogleMeet from '@/assets/svgComponents/SvgGoogleMeet';
import SvgCalendly from '@/assets/svgComponents/SvgCalendly';
import SvgZoom from '@/assets/svgComponents/SvgZoom';
import TextAreaLabel from '@/components/TextAreaLabel';
import AddWidgetWebinarSchema from '@/libs/schema/Widget/WidgetWebinar.schema';
import ErrorMessage from '@/components/ErrorMessage';
import ImageSelectorWithSource from '@/components/ImageSelectorWithSource';

interface IPopupWidgetVideo {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (
    type: WidgetTypeEnum,
    value: IItemWidgetTypeValues,
  ) => Promise<boolean>;
  disabled?: boolean;
}

const PopupWidgetWebinar: React.FC<IPopupWidgetVideo> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
  disabled = false,
}) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      urlWebinar: '',
      urlThumbnail: '',
      description: '',
      notes: '',
      passcode: '',
      date: '',
      startDate: '',
      endDate: '',
      webinarType: '',
      platform: '',
      selectedImage: '',
      image: '',
    },
    validationSchema: AddWidgetWebinarSchema,
    onSubmit: async values => {
      const value = {
        title: values.title,
        urlWebinar: values.urlWebinar,
        urlThumbnail: values.urlThumbnail,
        description: values.description,
        passcode: values.passcode,
        notes: values.notes,
        startDate: new Date(`${formik.values.date}T${formik.values.startDate}`),
        endDate: new Date(`${formik.values.date}T${formik.values.endDate}`),
        webinarType: values.webinarType,
        image: values.image,
      };

      const success = await onAdd(WidgetTypeEnum.Webinar, value);

      if (success) {
        formik.resetForm();
        onClose();
      }
    },
  });

  const popupTitle = useMemo(() => {
    const {webinarType} = formik.values;

    if (webinarType === 'new') {
      return 'Create a new webinar';
    } else if (webinarType === 'existing') {
      return 'Choose existing webinar';
    }

    return 'Add Webinar';
  }, [formik.values.webinarType]);

  const handleResetImage = () => {
    formik.setFieldValue('selectedImage', null);
    formik.setFieldValue('image', null);
  };

  return (
    <PopupContainer
      title={popupTitle}
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form
        method="dialog"
        className={`${isOpen ? 'visible' : 'hidden'} modal-backdrop flex flex-col gap-5`}
        onSubmit={formik.handleSubmit}>
        {!formik.values.webinarType && (
          <>
            <div className={'p-4 rounded-2xl bg-base-200'}>
              <p className="font-medium text-primary mb-2">
                Creating a webinar is just a few clicks away!
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Customize your schedule, copy, paste the link, and you&#39;re
                ready to go!
              </p>
              <button
                type="button"
                onClick={() => formik.setFieldValue('webinarType', 'new')}
                className="btn btn-xs py-[10px] px-4 btn-outline h-full rounded-xl border border-primary">
                Create New
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Choose Existing Section */}
            <div className={'p-4 rounded-2xl bg-base-200'}>
              <p className="font-medium text-primary mb-2">
                Have a webinar scheduled?
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Select from your calendar dashboard and publish it with ease.
              </p>
              <button
                type="button"
                disabled={true}
                onClick={() => formik.setFieldValue('webinarType', 'existing')}
                className="btn btn-xs py-[10px] px-4 btn-primary bg-primary h-full rounded-xl border border-primary">
                Choose an Existing
              </button>
            </div>
          </>
        )}

        {formik.values.webinarType === 'new' && (
          <>
            <div>
              <ImageSelectorWithSource
                image={formik.values.selectedImage}
                name={`image_WWebinar`}
                label={'Browse Thumbnail'}
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      formik.setFieldValue('selectedImage', reader.result);
                    };
                    formik.setFieldValue(`image`, file);
                    reader.readAsDataURL(file);
                  }
                }}
                reset={formik.values.selectedImage === null}
                onReset={handleResetImage}
                error={
                  formik.touched.selectedImage && formik.errors.selectedImage
                    ? formik.errors.selectedImage
                    : ''
                }
              />
            </div>
            <div>
              <InputLabel
                label="Webinar Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ex. Webinar for sociopreneur"
                error={
                  formik.touched.title && formik.errors.title
                    ? formik.errors.title
                    : ''
                }
              />
            </div>

            {/* Platform Selection */}
            <div className="flex justify-center items-center gap-2">
              <button
                type="button"
                className={`btn btn-ghost  ${formik.values.platform === 'google-meet' ? 'btn-active' : ''}`}
                onClick={() => formik.setFieldValue('platform', 'google-meet')}>
                <SvgGoogleMeet width={24} height={24} />
              </button>
              <button
                type="button"
                className={`btn btn-ghost  ${formik.values.platform === 'teams' ? 'btn-active' : ''}`}
                onClick={() => formik.setFieldValue('platform', 'teams')}>
                <SvgCalendly width={24} height={24} />
              </button>
              <button
                type="button"
                className={`btn btn-ghost  ${formik.values.platform === 'zoom' ? 'btn-active' : ''}`}
                onClick={() => formik.setFieldValue('platform', 'zoom')}>
                <SvgZoom width={24} height={24} />
              </button>
            </div>
            <ErrorMessage
              className={'text-xs text-center'}
              error={
                formik.touched.webinarType && formik.errors.webinarType
                  ? formik.errors.webinarType
                  : ''
              }
            />

            <div>
              <InputLabel
                label="Add Webinar Link"
                name="urlWebinar"
                value={formik.values.urlWebinar}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="https://www."
                error={
                  formik.touched.urlWebinar && formik.errors.urlWebinar
                    ? formik.errors.urlWebinar
                    : ''
                }
              />
            </div>

            <div>
              <InputLabel
                label="Meeting ID"
                name="passcode"
                value={formik.values.passcode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="774 998 994"
                showOptional={true}
                error={
                  formik.touched.passcode && formik.errors.passcode
                    ? formik.errors.passcode
                    : ''
                }
              />
            </div>

            {/* Date and Time */}
            <div className="">
              <div className="flex flex-row justify-between gap-1 items-center form-control">
                <div>
                  <label className="text-primary text-sm label">
                    Select Date
                  </label>
                </div>
                <div>
                  <input
                    type="date"
                    className={`input text-primary input-sm focus:outline-none input-ghost custom-date-picker  ${
                      formik.touched.date && formik.errors.date
                        ? 'input-error'
                        : ''
                    }`}
                    {...formik.getFieldProps('date')}
                  />
                </div>
              </div>
              <ErrorMessage
                className={'text-xs'}
                error={
                  formik.touched.date && formik.errors.date
                    ? formik.errors.date
                    : ''
                }
              />
              <div className="flex flex-row justify-between items-center form-control">
                <div>
                  <label className="text-primary text-sm label">
                    Start Time
                  </label>
                </div>
                <input
                  type="time"
                  className={`input text-primary input-sm input-ghost custom-date-picker  ${
                    formik.touched.startDate && formik.errors.startDate
                      ? 'input-error'
                      : ''
                  }`}
                  {...formik.getFieldProps('startDate')}
                />
              </div>
              <ErrorMessage
                className={'text-xs'}
                error={
                  formik.touched.startDate && formik.errors.startDate
                    ? formik.errors.startDate
                    : ''
                }
              />
              <div className="flex flex-row justify-between items-center form-control">
                <div>
                  <label className="text-primary text-sm label">End Time</label>
                </div>
                <input
                  type="time"
                  className={`input text-primary input-sm input-ghost custom-date-picker  ${
                    formik.touched.endDate && formik.errors.endDate
                      ? 'input-error'
                      : ''
                  }`}
                  {...formik.getFieldProps('endDate')}
                />
              </div>
              <ErrorMessage
                className={'text-xs'}
                error={
                  formik.touched.endDate && formik.errors.endDate
                    ? formik.errors.endDate
                    : ''
                }
              />
            </div>

            <div>
              <TextAreaLabel
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Input Text..."
                rows={3}
                error={
                  formik.touched.description &&
                  formik.errors.description &&
                  formik.submitCount > 0
                    ? formik.errors.description
                    : ''
                }
              />
            </div>
          </>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-max"
            title="Add"
            disabled={disabled}
          />
        </div>
      </form>
    </PopupContainer>
  );
};

export default PopupWidgetWebinar;
