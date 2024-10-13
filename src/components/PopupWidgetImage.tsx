import AddWidgetImageSchema from '@/libs/schema/Widget/WidgetImage.schema';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React from 'react';
import Button from './Button';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';

interface IPopupWidgetImage {
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

const PopupWidgetImage: React.FC<IPopupWidgetImage> = ({
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
    validationSchema: AddWidgetImageSchema,
    onSubmit: values => {
      onAdd(WidgetTypeEnum.Image, values.title, values.url);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <PopupContainer
      title="Add Image"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form
        method="dialog"
        className="modal-backdrop flex flex-col gap-5"
        onSubmit={formik.handleSubmit}>
        <InputLabel
          label="Image Caption"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Your caption image"
          error={
            formik.touched.title && formik.errors.title
              ? formik.errors.title
              : ''
          }
        />
        <InputLabel
          type="url"
          label="Input URL Image"
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

export default PopupWidgetImage;
