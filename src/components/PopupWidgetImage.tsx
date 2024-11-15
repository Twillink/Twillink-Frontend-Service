import AddWidgetImageSchema from '@/libs/schema/Widget/WidgetImage.schema';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React from 'react';
import Button from './Button';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';
import {IItemWidgetTypeValues} from '@/libs/types/IItemWidgetType';
import ImageSelectorWithSource from '@/components/ImageSelectorWithSource';

interface IPopupWidgetImage {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (
    type: WidgetTypeEnum,
    value: IItemWidgetTypeValues,
  ) => Promise<boolean>;
  disabled?: boolean;
}

const PopupWidgetImage: React.FC<IPopupWidgetImage> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
  disabled = false,
}) => {
  const formik = useFormik({
    initialValues: {
      caption: '',
      url: '',
      selectedImage: '',
      image: '',
    },
    validationSchema: AddWidgetImageSchema,
    onSubmit: async values => {
      const value = {
        caption: values.caption,
        url: values.url,
        image: values.image,
      };
      const success = await onAdd(WidgetTypeEnum.Image, value);
      if (success) {
        formik.resetForm();
        onClose();
      }
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
        className={`${isOpen ? 'visible' : 'hidden'} modal-backdrop flex flex-col gap-5`}
        onSubmit={formik.handleSubmit}>
        <div>
          <InputLabel
            label="Image Caption"
            name="caption"
            value={formik.values.caption}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Your caption image"
            showLength
            showOptional
            maxLength={100}
            error={
              formik.touched.caption && formik.errors.caption
                ? formik.errors.caption
                : ''
            }
          />
        </div>
        {!formik.values.selectedImage && (
          <div>
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
          </div>
        )}

        {!formik.values.selectedImage && !formik.values.url && (
          <div>
            <p className={'text-center text-primary'}>or</p>
          </div>
        )}

        {!formik.values.url && (
          <div>
            <ImageSelectorWithSource
              image={formik.values.selectedImage}
              name={`image_WImage`}
              label={'Browse Image'}
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    formik.setFieldValue('selectedImage', reader.result);
                  };
                  formik.setFieldValue(`image`, file);
                  formik.setFieldValue('url', '');
                  reader.readAsDataURL(file);
                }
              }}
              reset={formik.values.selectedImage === null}
              error={
                formik.touched.selectedImage && formik.errors.selectedImage
                  ? formik.errors.selectedImage
                  : ''
              }
            />
          </div>
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

export default PopupWidgetImage;
