import ErrorMessage from '@/components/ErrorMessage';
import ImageSelectorWithSource from '@/components/ImageSelectorWithSource';
import AddWidgetWebinarSchema from '@/libs/schema/Widget/WidgetWebinar.schema';
import {IItemWidgetTypeValues} from '@/libs/types/IItemWidgetType';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import Image from 'next/image';
import React from 'react';
import Button from './Button';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';

interface IPopupWidgetEvent {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (
    type: WidgetTypeEnum,
    value: IItemWidgetTypeValues,
  ) => Promise<boolean>;
  disabled?: boolean;
}

const PopupWidgetEvent: React.FC<IPopupWidgetEvent> = ({
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

      const success = await onAdd(WidgetTypeEnum.Event, value);

      if (success) {
        formik.resetForm();
        onClose();
      }
    },
  });

  const handleResetImage = () => {
    formik.setFieldValue('selectedImage', null);
    formik.setFieldValue('image', null);
  };

  return (
    <PopupContainer
      title={'Add Event'}
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form
        method="dialog"
        className={`${isOpen ? 'visible' : 'hidden'} modal-backdrop flex flex-col gap-5`}
        onSubmit={formik.handleSubmit}>
        <div>
          <ImageSelectorWithSource
            image={formik.values.selectedImage}
            name={`image_WEvent`}
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
            label="Event Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ex. Event for business owner"
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
            className={`btn btn-ghost  ${formik.values.platform === 'humanitix' ? 'btn-active' : ''}`}
            onClick={() => formik.setFieldValue('platform', 'humanitix')}>
            <Image
              src="/images/Humanitix.png"
              alt="humanitix"
              width={24}
              height={24}
            />
          </button>
          <button
            type="button"
            className={`btn btn-ghost  ${formik.values.platform === 'evenbrite' ? 'btn-active' : ''}`}
            onClick={() => formik.setFieldValue('platform', 'evenbrite')}>
            <Image
              src="/images/Evenbrite.png"
              alt="evenbrite"
              width={24}
              height={24}
            />
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
            label="Add Event Link"
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

        {/* Date and Time */}
        <div className="">
          <div className="flex flex-row justify-between gap-1 items-center form-control">
            <div>
              <label className="text-primary text-sm label">Select Date</label>
            </div>
            <div>
              <input
                type="date"
                className={`input text-primary input-sm focus:outline-none input-ghost custom-date-picker  ${
                  formik.touched.date && formik.errors.date ? 'input-error' : ''
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
              <label className="text-primary text-sm label">Start Time</label>
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

export default PopupWidgetEvent;
