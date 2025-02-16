import { WidgetTypeEnum } from '@/libs/types/WidgetTypeEnum';
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import Button from './Button';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainerWebinar';
import { IItemWidgetTypeValues } from '@/libs/types/IItemWidgetType';
import SvgGoogleMeet from '@/assets/svgComponents/SvgGoogleMeet';
import SvgCalendly from '@/assets/svgComponents/SvgCalendly';
import SvgZoom from '@/assets/svgComponents/SvgZoom';
import TextAreaLabel from '@/components/TextAreaLabel';
import AddWidgetWebinarSchema from '@/libs/schema/Widget/WidgetWebinar.schema';
import ErrorMessage from '@/components/ErrorMessage';
import ImageSelectorWithSource from '@/components/ImageSelectorWithSource';
import ConsultationForm from '@/app/admin/twilmeet/calendar/modal/consult';
import Webinar from '@/app/admin/twilmeet/calendar/modal/webinar';
import Meet from '@/app/admin/twilmeet/calendar/modal/meet';


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
    const { webinarType } = formik.values;

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

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  return (
    <>
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
              {/* <div className={'p-4 rounded-2xl bg-base-200'}>
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
            </div> */}

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  onClick={() => setIsModalOpen1(true)}
                  className="border rounded-3xl p-4 flex flex-col hover:shadow-md cursor-pointer transition-shadow duration-200">
                  <div className=" p-3 rounded-full mb-4 justify-center flex">
                    <svg
                      width="60"
                      height="60"
                      viewBox="72 34 75 84"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect
                        x="72"
                        y="34"
                        width="147"
                        height="84"
                        rx="16"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M123 70C132.941 70 141 61.9411 141 52C141 42.0589 132.941 34 123 34C113.059 34 105 42.0589 105 52C105 61.9411 113.059 70 123 70ZM119 76C107.954 76 99 84.9543 99 96V118H147V96C147 84.9543 138.046 76 127 76H119Z"
                        fill="#5CB1FE"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M96 70C105.941 70 114 61.9411 114 52C114 42.0589 105.941 34 96 34C86.0589 34 78 42.0589 78 52C78 61.9411 86.0589 70 96 70ZM92 76C80.9543 76 72 84.9543 72 96V118H120V96C120 84.9543 111.046 76 100 76H92Z"
                        fill="#2071F0"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between gap-10">
                    <h3 className="font-medium text-gray-800">Consultation</h3>
                    <span className="px-2 py-1 text-sm text-white bg-blue-600 rounded-lg  ">
                      Pro
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Design for private consultation
                  </p>
                </div>

                {/* Card 2 */}
                <div
                  onClick={() => setIsModalOpen2(true)}
                  className="border rounded-3xl p-4 flex flex-col hover:shadow-md cursor-pointer transition-shadow duration-200">
                  <div className=" p-3 rounded-full mb-4 justify-center flex">
                    <svg
                      width="60"
                      height="60"
                      viewBox="72 34 75 84"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect
                        x="0.666992"
                        width="219"
                        height="180"
                        rx="16"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M78.667 82C85.2944 82 90.667 76.6274 90.667 70C90.667 63.3726 85.2944 58 78.667 58C72.0396 58 66.667 63.3726 66.667 70C66.667 76.6274 72.0396 82 78.667 82ZM78.667 86C70.3827 86 63.667 92.7157 63.667 101V118H93.667V101C93.667 92.7157 86.9513 86 78.667 86Z"
                        fill="#5CB1FE"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M98.667 82C105.294 82 110.667 76.6274 110.667 70C110.667 63.3726 105.294 58 98.667 58C92.0396 58 86.667 63.3726 86.667 70C86.667 76.6274 92.0396 82 98.667 82ZM98.667 86C90.3827 86 83.667 92.7157 83.667 101V118H113.667V101C113.667 92.7157 106.951 86 98.667 86Z"
                        fill="#5CB1FE"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M141.667 82C148.294 82 153.667 76.6274 153.667 70C153.667 63.3726 148.294 58 141.667 58C135.04 58 129.667 63.3726 129.667 70C129.667 76.6274 135.04 82 141.667 82ZM141.667 86C133.383 86 126.667 92.7157 126.667 101V118H156.667V101C156.667 92.7157 149.951 86 141.667 86Z"
                        fill="#5CB1FE"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M121.667 82C128.294 82 133.667 76.6274 133.667 70C133.667 63.3726 128.294 58 121.667 58C115.04 58 109.667 63.3726 109.667 70C109.667 76.6274 115.04 82 121.667 82ZM121.667 86C113.383 86 106.667 92.7157 106.667 101V118H136.667V101C136.667 92.7157 129.951 86 121.667 86Z"
                        fill="#5CB1FE"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M110.667 72C120.608 72 128.667 63.9411 128.667 54C128.667 44.0589 120.608 36 110.667 36C100.726 36 92.667 44.0589 92.667 54C92.667 63.9411 100.726 72 110.667 72ZM106.667 76C95.6213 76 86.667 84.9543 86.667 96V118H134.667V96C134.667 84.9543 125.713 76 114.667 76H106.667Z"
                        fill="#2071F0"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between gap-10">
                    <h3 className="font-medium text-gray-800">Webinar</h3>
                    <span className="px-2 py-1 text-sm text-white bg-blue-600 rounded-lg  ">
                      Pro
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Group discussion & sharing Session
                  </p>
                </div>
                {/* Card 3 */}
                <div
                  onClick={() => setIsModalOpen3(true)}
                  className="border rounded-3xl p-4 flex flex-col hover:shadow-md cursor-pointer transition-shadow duration-200">
                  <div className=" p-3 rounded-full mb-4 justify-center flex">
                    <svg
                      width="60"
                      height="60"
                      viewBox="78 26 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect
                        x="0.333008"
                        width="219"
                        height="180"
                        rx="16"
                        fill="white"
                      />
                      <rect
                        x="89.333"
                        y="37"
                        width="42"
                        height="42"
                        rx="21"
                        fill="#5CB1FE"
                      />
                      <path
                        d="M115.666 54L120.504 52.0648C121.38 51.7145 122.333 52.3595 122.333 53.3028V62.6973C122.333 63.6406 121.38 64.2856 120.504 63.9353L115.666 62M102.333 67.3333H111.666C113.875 67.3333 115.666 65.5425 115.666 63.3333V52.6667C115.666 50.4575 113.875 48.6667 111.666 48.6667H102.333C100.124 48.6667 98.333 50.4575 98.333 52.6667V63.3333C98.333 65.5425 100.124 67.3333 102.333 67.3333Z"
                        stroke="white"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <rect
                        x="89.333"
                        y="37"
                        width="42"
                        height="42"
                        rx="21"
                        fill="#5CB1FE"
                      />
                      <path
                        d="M113.066 50C114.369 50.2541 115.565 50.891 116.504 51.8292C117.442 52.7675 118.079 53.9644 118.333 55.2667M113.066 44.6667C115.772 44.9672 118.295 46.1789 120.221 48.1027C122.147 50.0265 123.362 52.548 123.666 55.2533M107.969 60.4841C106.367 58.882 105.102 57.0705 104.174 55.1376C104.094 54.9714 104.054 54.8883 104.023 54.7831C103.914 54.4093 103.993 53.9503 104.219 53.6337C104.283 53.5446 104.359 53.4684 104.512 53.316C104.978 52.8498 105.211 52.6168 105.363 52.3824C105.938 51.4985 105.938 50.3591 105.363 49.4752C105.211 49.2409 104.978 49.0078 104.512 48.5417L104.252 48.2818C103.543 47.5732 103.189 47.2189 102.808 47.0265C102.052 46.6437 101.158 46.6437 100.401 47.0265C100.021 47.2189 99.6665 47.5732 98.9579 48.2818L98.7477 48.492C98.0416 49.1982 97.6885 49.5513 97.4188 50.0313C97.1196 50.564 96.9044 51.3913 96.9063 52.0023C96.9079 52.5529 97.0147 52.9292 97.2283 53.6817C98.3763 57.7263 100.542 61.5428 103.726 64.7267C106.91 67.9107 110.727 70.0767 114.771 71.2246C115.524 71.4382 115.9 71.545 116.451 71.5467C117.062 71.5485 117.889 71.3334 118.422 71.0341C118.902 70.7645 119.255 70.4114 119.961 69.7052L120.171 69.495C120.88 68.7864 121.234 68.4321 121.426 68.0516C121.809 67.2949 121.809 66.4012 121.426 65.6445C121.234 65.264 120.88 64.9097 120.171 64.2011L119.911 63.9412C119.445 63.4751 119.212 63.242 118.978 63.0896C118.094 62.515 116.954 62.515 116.071 63.0896C115.836 63.242 115.603 63.4751 115.137 63.9412C114.985 64.0937 114.908 64.1699 114.819 64.2337C114.503 64.4603 114.044 64.5386 113.67 64.4296C113.565 64.399 113.482 64.3591 113.315 64.2792C111.382 63.3512 109.571 62.0862 107.969 60.4841Z"
                        stroke="white"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <rect
                        x="78.333"
                        y="26"
                        width="64"
                        height="64"
                        rx="32"
                        fill="#2071F0"
                      />
                      <path
                        d="M107.667 59.3333C108.239 60.0988 108.97 60.7322 109.809 61.1905C110.648 61.6489 111.575 61.9214 112.529 61.9897C113.482 62.058 114.439 61.9204 115.335 61.5863C116.231 61.2522 117.044 60.7294 117.72 60.0533L121.72 56.0533C122.934 54.7959 123.606 53.1119 123.591 51.3639C123.576 49.616 122.875 47.9439 121.639 46.7078C120.403 45.4718 118.731 44.7707 116.983 44.7555C115.235 44.7403 113.551 45.4122 112.293 46.6266L110 48.9066M113 56.6666C112.427 55.9011 111.697 55.2677 110.858 54.8094C110.019 54.351 109.091 54.0785 108.138 54.0102C107.184 53.9419 106.227 54.0795 105.331 54.4136C104.436 54.7477 103.622 55.2705 102.947 55.9466L98.9466 59.9466C97.7322 61.204 97.0603 62.888 97.0754 64.636C97.0906 66.3839 97.7918 68.056 99.0278 69.2921C100.264 70.5281 101.936 71.2293 103.684 71.2444C105.432 71.2596 107.116 70.5877 108.373 69.3733L110.653 67.0933"
                        stroke="white"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between gap-10">
                    <h3 className="font-medium text-gray-800">Meet</h3>
                    <span className="px-2 py-1 text-sm text-white bg-blue-600 rounded-lg  ">
                      Pro
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Create Link for Meet</p>
                </div>
              </div>

              {/* Divider */}
              {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div> */}

              {/* Choose Existing Section */}
              {/* <div className={'p-4 rounded-2xl bg-base-200'}>
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
            </div> */}
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
                      className={`input text-primary input-sm focus:outline-none input-ghost custom-date-picker  ${formik.touched.date && formik.errors.date
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
                    className={`input text-primary input-sm input-ghost custom-date-picker  ${formik.touched.startDate && formik.errors.startDate
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
                    className={`input text-primary input-sm input-ghost custom-date-picker  ${formik.touched.endDate && formik.errors.endDate
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

          {/* <div className="flex justify-end">
          <Button
            type="submit"
            className="w-max"
            title="Add"
            disabled={disabled}
          />
        </div> */}
        </form>
      </PopupContainer>
      <ConsultationForm
        isOpen={isModalOpen1}
        onClose={() => setIsModalOpen1(false)}
      />
      <Webinar isOpen={isModalOpen2} onClose={() => setIsModalOpen2(false)} />
      <Meet isOpen={isModalOpen3} onClose={() => setIsModalOpen3(false)} />
    </>
  );
};

export default PopupWidgetWebinar;
