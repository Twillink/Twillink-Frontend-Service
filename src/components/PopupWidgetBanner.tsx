import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React from 'react';
import Button from './Button';
import PopupContainer from './PopupContainer';
import ImageSelectorWithSource from '@/components/ImageSelectorWithSource';
import AddWidgetBannerSchema from '@/libs/schema/Widget/WidgetBanner.schema';

interface IPopupWidgetLink {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (type: WidgetTypeEnum, value: object) => Promise<boolean>;
  disabled?: boolean;
}

const PopupWidgetBanner: React.FC<IPopupWidgetLink> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
  disabled = false,
}) => {
  const formik = useFormik({
    initialValues: {
      selectedImage: null,
      image: '',
    },
    validationSchema: AddWidgetBannerSchema,
    onSubmit: async values => {
      const value = {
        image: values.image,
      };

      const success = await onAdd(WidgetTypeEnum.Banner, value);
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
      title="Add Banner Image"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form
        method="dialog"
        className={`${isOpen ? 'visible' : 'hidden'} modal-backdrop flex flex-col gap-5`}
        onSubmit={formik.handleSubmit}>
        <ImageSelectorWithSource
          image={formik.values.selectedImage}
          name={`image_WBanner`}
          label={'Browse Image'}
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

export default PopupWidgetBanner;
