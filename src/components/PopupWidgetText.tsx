import AddWidgetTextSchema from '@/libs/schema/Widget/WidgetText.shcema';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React from 'react';
import Button from './Button';
import PopupContainer from './PopupContainer';
import TextAreaLabel from './TextAreaLabel';

interface IPopupWidgetText {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (type: WidgetTypeEnum, value: object) => Promise<boolean>;
  disabled?: boolean;
}

const PopupWidgetText: React.FC<IPopupWidgetText> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
  disabled = false,
}) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      url: '',
      selectedImage: null,
    },
    validationSchema: AddWidgetTextSchema,
    onSubmit: async values => {
      const value = {
        text: values.title,
      };

      const success = await onAdd(WidgetTypeEnum.Text, value);
      if (success) {
        formik.resetForm();
        onClose();
      }
    },
  });

  return (
    <PopupContainer
      title="Add Text"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form
        method="dialog"
        className="modal-backdrop flex flex-col gap-5"
        onSubmit={formik.handleSubmit}>
        <TextAreaLabel
          label="Text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Input Text..."
          rows={5}
          error={
            formik.touched.title &&
            formik.errors.title &&
            formik.submitCount > 0
              ? formik.errors.title
              : ''
          }
        />
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

export default PopupWidgetText;
