import AddWidgetVideoSchema from '@/libs/schema/Widget/WidgetVideo.schema';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React from 'react';
import Button from './Button';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';
import {IItemWidgetTypeValues} from '@/libs/types/IItemWidgetType';

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

const PopupWidgetVideo: React.FC<IPopupWidgetVideo> = ({
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
      attachmentId: null,
    },
    validationSchema: AddWidgetVideoSchema,
    onSubmit: async values => {
      const value = {
        caption: values.caption,
        url: values.url,
      };
      const success = await onAdd(WidgetTypeEnum.Video, value);

      if (success) {
        formik.resetForm();
        onClose();
      }
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
          name="caption"
          value={formik.values.caption}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Your video caption"
          error={
            formik.touched.caption && formik.errors.caption
              ? formik.errors.caption
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

export default PopupWidgetVideo;
