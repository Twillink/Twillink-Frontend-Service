import AddWidgetCarouselSchema from '@/libs/schema/Widget/WidgetCarousel.schema';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React, {useMemo} from 'react';
import Button from './Button';
import ImageSelectorWithSource from './ImageSelectorWithSource';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';

interface IPopupWidgetCarousel {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (
    type: WidgetTypeEnum,
    title: string,
    url: string,
    image?: string | ArrayBuffer | null,
    images?: (string | ArrayBuffer | null)[],
  ) => void;
}

const PopupWidgetCarousel: React.FC<IPopupWidgetCarousel> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
}) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      selectedImages: [] as (string | ArrayBuffer | null)[],
    },
    validationSchema: AddWidgetCarouselSchema,
    onSubmit: values => {
      onAdd(
        WidgetTypeEnum.Carousel,
        values.title,
        '',
        null,
        values.selectedImages,
      );
      formik.resetForm();
      onClose();
    },
  });

  const imageIndex = useMemo(
    () => formik.values.selectedImages.length,
    [formik.values.selectedImages.length],
  );

  return (
    <PopupContainer
      title="Add Carousel"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form
        method="dialog"
        className="modal-backdrop flex flex-col gap-5"
        onSubmit={formik.handleSubmit}>
        <InputLabel
          label="Caption"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Your caption carousel"
          error={
            formik.touched.title && formik.errors.title
              ? formik.errors.title
              : ''
          }
        />

        <div className="overflow-x-scroll flex gap-2">
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
          <Button type="submit" className="w-max" title="Add" />
        </div>
      </form>
    </PopupContainer>
  );
};

export default PopupWidgetCarousel;
