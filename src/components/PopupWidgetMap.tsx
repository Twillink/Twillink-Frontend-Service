import AddWidgetImageSchema from '@/libs/schema/Widget/WidgetImage.schema';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React from 'react';
import Button from './Button';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';
import {IItemWidgetTypeValues} from '@/libs/types/IItemWidgetType';

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

const PopupWidgetMap: React.FC<IPopupWidgetImage> = ({
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
        className="modal-backdrop flex flex-col gap-5"
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

        {/*<div className="mb-4">*/}
        {/*  <MapContainer*/}
        {/*    center={[51.505, -0.09]}*/}
        {/*    zoom={13}*/}
        {/*    className="h-48 w-full rounded-lg">*/}
        {/*    <TileLayer*/}
        {/*      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
        {/*      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'*/}
        {/*    />*/}
        {/*    <Marker position={[51.505, -0.09]}>*/}
        {/*      <Popup>*/}
        {/*        A pretty CSS3 popup. <br /> Easily customizable.*/}
        {/*      </Popup>*/}
        {/*    </Marker>*/}
        {/*  </MapContainer>*/}
        {/*</div>*/}

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

export default PopupWidgetMap;
