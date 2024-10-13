import AddWidgetVideoSchema from '@/libs/schema/Widget/WidgetVideo.schema';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React from 'react';
import Button from './Button';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';

interface IPopupWidgetVideo {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (
    type: WidgetTypeEnum,
    title: string,
    url: string,
    attachmentId?: string | null,
  ) => void;
}

const PopupWidgetVideo: React.FC<IPopupWidgetVideo> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
}) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      url: '',
    },
    validationSchema: AddWidgetVideoSchema,
    onSubmit: values => {
      onAdd(WidgetTypeEnum.Video, values.title, values.url);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <PopupContainer
      title="Add Video"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form
        method="dialog"
        className="modal-backdrop flex flex-col gap-5"
        onSubmit={formik.handleSubmit}>
        <InputLabel
          label="Video Caption"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Your video caption"
          error={
            formik.touched.title && formik.errors.title
              ? formik.errors.title
              : ''
          }
        />
        <InputLabel
          type="url"
          label="Input URL Video"
          name="url"
          value={formik.values.url}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="https://www."
          error={
            formik.touched.url && formik.errors.url ? formik.errors.url : ''
          }
        />

        <div className="flex justify-end">
          <Button type="submit" className="w-max" title="Add" />
        </div>
      </form>
    </PopupContainer>
  );
};

export default PopupWidgetVideo;
