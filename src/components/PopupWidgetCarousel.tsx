import AddWidgetCarouselSchema from '@/libs/schema/Widget/WidgetCarousel.schema';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React, {useMemo} from 'react';
import Button from './Button';
import ImageSelectorWithSource from './ImageSelectorWithSource';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';
import {IItemWidgetTypeValues} from '@/libs/types/IItemWidgetType';

interface IPopupWidgetCarousel {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (
    type: WidgetTypeEnum,
    value: IItemWidgetTypeValues,
  ) => Promise<boolean>;
  disabled?: boolean;
}

const PopupWidgetCarousel: React.FC<IPopupWidgetCarousel> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
  disabled = false,
}) => {
  const formik = useFormik({
    initialValues: {
      caption: '',
      selectedImages: [] as string[],
      images: [],
    },
    validationSchema: AddWidgetCarouselSchema,
    onSubmit: async values => {
      const value = {
        caption: values.caption,
        images: values.images,
      };

      const success = await onAdd(WidgetTypeEnum.Carousel, value);

      if (success) {
        formik.resetForm();
        onClose();
      }
    },
  });

  const imageIndex = useMemo(
    () => formik.values.selectedImages.length,
    [formik.values.selectedImages.length],
  );

  const handleResetImage = (index: number) => {
    const array = formik.values.selectedImages ?? [];
    const arrayImages = formik.values.images ?? [];
    if (index > -1) {
      array.splice(index, 1);
      arrayImages.splice(index, 1);
    }

    formik.setFieldValue(`selectedImages`, array);
    formik.setFieldValue(`images`, arrayImages);
  };

  return (
    <PopupContainer
      title="Add Carousel"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form
        method="dialog"
        className={`${isOpen ? 'visible' : 'hidden'} modal-backdrop flex flex-col gap-5`}
        onSubmit={formik.handleSubmit}>
        <InputLabel
          label="Caption"
          name="caption"
          value={formik.values.caption}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Your caption carousel"
          error={
            formik.touched.caption && formik.errors.caption
              ? formik.errors.caption
              : ''
          }
        />

        <div
          className="overflow-x-scroll flex pt-1 gap-2"
          style={{scrollbarWidth: 'none'}}>
          {formik.values.selectedImages.map((item, index) => (
            <div key={index} className="w-full h-full">
              <ImageSelectorWithSource
                image={item}
                name={`image-${index}`}
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      formik.setFieldValue(
                        `selectedImages[${index}]`,
                        reader.result,
                      );
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
                onReset={() => handleResetImage(index)}
              />
            </div>
          ))}

          <div className="w-full h-full">
            <ImageSelectorWithSource
              image={null}
              name={`image-${imageIndex}`}
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    formik.setFieldValue(
                      `selectedImages[${imageIndex}]`,
                      reader.result,
                    );
                    formik.setFieldValue(
                      `images[${formik.values.selectedImages.length}]`,
                      file,
                    );
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
            {formik.touched.selectedImages && formik.errors.selectedImages ? (
              <span className="text-red-500 text-sm">
                {formik.errors.selectedImages}
              </span>
            ) : null}
          </div>
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

export default PopupWidgetCarousel;
