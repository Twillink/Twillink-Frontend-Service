import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React, {useEffect, useMemo} from 'react';
import Button from './Button';
import InputLabel from './InputLabel';
import PopupContainer from './PopupContainer';
import {IItemWidgetTypeValues} from '@/libs/types/IItemWidgetType';
import dynamic from 'next/dynamic';
import {Search} from 'lucide-react';
import useDebounce from '@/libs/hooks/useDebounce';
import {apiGetPlaces} from '@/libs/api';
import {useAppDispatch} from '@/libs/hooks/useReduxHook';
import AddWidgetMapSchema from '@/libs/schema/Widget/WidgetMap.schema';

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
  const [location, setLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map'), {
        loading: () => <p>loading . . .</p>,
        ssr: false,
      }),
    [],
  );

  const [showOptions, setShowOptions] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      caption: '',
      url: '',
      selectedImage: '',
      image: '',
      search: '',
      latitude: location.latitude,
      longitude: location.longitude,
    },
    enableReinitialize: true,
    validationSchema: AddWidgetMapSchema,
    onSubmit: async values => {
      const value = {
        caption: values.caption,
        latitude: values.latitude,
        longitude: values.longitude,
      };
      const success = await onAdd(WidgetTypeEnum.Map, value);
      if (success) {
        formik.resetForm();
        onClose();
      }
    },
  });

  const debouncedSearch = useDebounce(formik.values?.search, 1000);

  useEffect(() => {
    const getLocation = async () => {
      const {data} = await apiGetPlaces(dispatch, debouncedSearch);
      const newOptions = data?.map((item: any) => ({
        label: item.display_name,
        value: item?.display_name,
        latitude: item?.lat,
        longitude: item?.lon,
      }));
      setOptions(newOptions);
    };

    getLocation();
  }, [debouncedSearch]);

  const handleCLose = () => {
    formik.resetForm();
    onClose();
  };

  const handleBack = () => {
    formik.resetForm();
    onBack();
  };

  return (
    <PopupContainer
      title="Add Image"
      onClose={handleCLose}
      onBack={handleBack}
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
            error={
              formik.touched.caption && formik.errors.caption
                ? formik.errors.caption
                : ''
            }
          />
        </div>

        <div className={'relative'}>
          <InputLabel
            name="search"
            label={'Search'}
            value={formik.values.search}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => setShowOptions(true)}
            placeholder="Input your location"
            className=" w-full border border-gray-300 rounded-lg p-2 pr-10 text-sm"
            error={
              (formik.touched.latitude && formik.errors.latitude
                ? formik.errors.latitude
                : '') ||
              (formik.touched.longitude && formik.errors.longitude)
                ? formik.errors.longitude
                : ''
            }
          />
          <div className="btn btn-ghost btn-sm text-primary absolute right-0 top-1/3  h-fit px-3 py-2  hover:bg-transparent">
            <Search className="h-5 w-5 opacity-50 hover:opacity-100 transition-opacity" />
          </div>
          {showOptions && (
            <ul className="absolute z-30 w-full bg-white border border-gray-300 rounded-lg mt-2  max-h-40 overflow-y-auto ">
              {options
                .filter((option: any) =>
                  option?.label
                    ?.toLowerCase()
                    .includes(debouncedSearch.toLowerCase()),
                )
                .map((option: any, index) => (
                  <li
                    key={index}
                    className="p-2 text-sm shadow text-primary hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      formik.setFieldValue('search', option?.label);
                      formik.setFieldValue('latitude', option?.latitude);
                      formik.setFieldValue('longitude', option?.longitude);
                      setShowOptions(false);
                    }}>
                    {option?.label}
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className=" mb-4 z-10 h-36 w-full rounded-2xl overflow-hidden">
          <Map
            position={[formik.values?.latitude, formik.values?.longitude]}
            zoom={20}
            popup={'Location'}
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

export default PopupWidgetMap;
