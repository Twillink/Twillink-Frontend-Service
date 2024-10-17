import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React from 'react';
import Button from './Button';
import ImageSelector from './ImageSelector';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';
import AddWidgetLinkSchema from '@/libs/schema/Widget/WidgetLink.schema';

interface IPopupWidgetLink {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (type: WidgetTypeEnum, value: object) => Promise<boolean>;
  disabled?: boolean;
}

const PopupWidgetLink: React.FC<IPopupWidgetLink> = ({
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
    validationSchema: AddWidgetLinkSchema,
    onSubmit: async values => {
      const value = {
        title: values.title,
        url: values.url,
        image: values.selectedImage,
      };

      const success = await onAdd(WidgetTypeEnum.Link, value);
      if (success) {
        formik.resetForm();
        onClose();
      }
    },
  });

  return (
    <PopupContainer
      title="Add Link"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form
        method="dialog"
        className="modal-backdrop flex flex-col gap-5"
        onSubmit={formik.handleSubmit}>
        <InputLabel
          label="Link Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Input link title"
          error={
            formik.touched.title &&
            formik.errors.title &&
            formik.submitCount > 0
              ? formik.errors.title
              : ''
          }
        />
        <InputLabel
          type="url"
          name="url"
          label="URL Link"
          value={formik.values.url}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="https://www."
          error={
            formik.touched.url && formik.errors.url && formik.submitCount > 0
              ? formik.errors.url
              : ''
          }
        />
        <ImageSelector
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                formik.setFieldValue('selectedImage', reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
          reset={formik.values.selectedImage === null}
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

export default PopupWidgetLink;
