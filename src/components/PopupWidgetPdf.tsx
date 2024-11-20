import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React from 'react';
import Button from './Button';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';
import {IItemWidgetTypeValues} from '@/libs/types/IItemWidgetType';
import FileDragableWithSource from '@/components/FileDragableWithSource';
import AddWidgetPdfSchema from '@/libs/schema/Widget/WidgetPdf.schema';
import {useAppSelector} from '@/libs/hooks/useReduxHook';

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

const PopupWidgetPdf: React.FC<IPopupWidgetImage> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
  disabled = false,
}) => {
  const uploadProgress = useAppSelector(state => state.uploadProgress.progress);

  const formik = useFormik({
    initialValues: {
      caption: '',
      files: [],
    },
    validationSchema: AddWidgetPdfSchema,
    onSubmit: async values => {
      const value = {
        caption: values.caption,
        files: values.files,
      };
      const success = await onAdd(WidgetTypeEnum.PDF, value);
      if (success) {
        formik.resetForm();
        onClose();
      }
    },
  });

  const handleFileChange = (newFiles: File[]) => {
    if (newFiles) {
      formik.setFieldValue('files', [...newFiles]);
    }
  };

  return (
    <PopupContainer
      title="Add PDF File"
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

        <div>
          <FileDragableWithSource
            name={'file_WPdf'}
            files={formik.values.files}
            handleFileChange={handleFileChange}
            isMultiple={false}
            progress={uploadProgress}
            isLoading={disabled}
            disabled={formik.values?.files?.length > 0 || disabled}
            error={
              formik.touched.files && formik.errors.files
                ? formik.errors.files.toString()
                : ''
            }
          />
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

export default PopupWidgetPdf;
