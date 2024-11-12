import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React from 'react';
import Button from './Button';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';
import AddWidgetBlogSchema from '@/libs/schema/Widget/WidgetBlog.schema';
import TextAreaLabel from '@/components/TextAreaLabel';
import ImageSelectorWithSource from '@/components/ImageSelectorWithSource';

interface IPopupWidgetBlog {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (type: WidgetTypeEnum, value: object) => Promise<boolean>;
  disabled?: boolean;
}

const PopupWidgetBlog: React.FC<IPopupWidgetBlog> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
  disabled = false,
}) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      selectedImage: '',
      image: '',
    },
    validationSchema: AddWidgetBlogSchema,
    onSubmit: async values => {
      const value = {
        title: values.title,
        content: values.content,
        image: values.image,
      };

      const success = await onAdd(WidgetTypeEnum.Blog, value);
      if (success) {
        formik.resetForm();
        onClose();
      }
    },
  });

  return (
    <PopupContainer
      title="Add Blog Content"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form
        method="dialog"
        className="modal-backdrop flex flex-col gap-5"
        onSubmit={formik.handleSubmit}>
        <ImageSelectorWithSource
          image={formik.values.selectedImage}
          name={`image-WBlog`}
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
        />
        {formik.touched.selectedImage && formik.errors.selectedImage ? (
          <span className="text-red-500 text-sm">
            {formik.errors.selectedImage}
          </span>
        ) : null}
        <InputLabel
          label="Blog Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Once upon a time..."
          error={
            formik.touched.title &&
            formik.errors.title &&
            formik.submitCount > 0
              ? formik.errors.title
              : ''
          }
        />
        <TextAreaLabel
          label="Blog Content"
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Type blog content ..."
          rows={5}
          error={
            formik.touched.content &&
            formik.errors.content &&
            formik.submitCount > 0
              ? formik.errors.content
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

export default PopupWidgetBlog;
