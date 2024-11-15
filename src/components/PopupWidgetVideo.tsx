import AddWidgetVideoSchema from '@/libs/schema/Widget/WidgetVideo.schema';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React from 'react';
import Button from './Button';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';
import {IItemWidgetTypeValues} from '@/libs/types/IItemWidgetType';
import VideoSelectorWithSource from '@/components/VideoSelectorWithSource';

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
      video: '',
      selectedVideo: null,
    },
    validationSchema: AddWidgetVideoSchema,
    onSubmit: async values => {
      const value = {
        caption: values.caption,
        url: values.url,
        video: values.video,
      };
      const success = await onAdd(WidgetTypeEnum.Video, value);

      if (success) {
        formik.resetForm();
        onClose();
      }
    },
  });

  const handleResetVideo = () => {
    formik.setFieldValue('selectedVideo', null);
    formik.setFieldValue('video', null);
  };

  return (
    <PopupContainer
      title="Add Video"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form
        method="dialog"
        className={`${isOpen ? 'visible' : 'hidden'} modal-backdrop flex flex-col gap-5`}
        onSubmit={formik.handleSubmit}>
        <div>
          <InputLabel
            label="Video Caption"
            name="caption"
            value={formik.values.caption}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            showLength
            showOptional
            maxLength={100}
            placeholder="Your video caption"
            error={
              formik.touched.caption && formik.errors.caption
                ? formik.errors.caption
                : ''
            }
          />
        </div>

        {!formik.values.selectedVideo && (
          <div>
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
          </div>
        )}

        {!formik.values.selectedVideo && !formik.values.url && (
          <div>
            <p className={'text-center text-primary'}>or</p>
          </div>
        )}

        {!formik.values.url && (
          <div>
            <VideoSelectorWithSource
              video={formik.values.selectedVideo}
              name={`video-WVideo`}
              label={'Browse Video'}
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    formik.setFieldValue('selectedVideo', reader.result);
                  };
                  formik.setFieldValue(`video`, file);
                  formik.setFieldValue('url', '');
                  reader.readAsDataURL(file);
                }
              }}
              reset={formik.values.selectedVideo === null}
              onReset={handleResetVideo}
              error={
                formik.touched.selectedVideo && formik.errors.selectedVideo
                  ? formik.errors.selectedVideo
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

export default PopupWidgetVideo;
