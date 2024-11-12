'use client';

import WidgetEditor from '@/components/WidgetEditor';
import {IItemWidgetType} from '@/libs/types/IItemWidgetType';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useAppDispatch, useAppSelector} from '@/libs/hooks/useReduxHook';
import {setWidgetData} from '@/libs/store/features/myWidgetSlice';
import {apiGetWidgetData} from '@/libs/api';
import {formatWidgetData} from '@/utils/formatWidgetData';
import {
  PreviewContext,
  PreviewTypeEnum,
} from '@/libs/providers/PreviewProvider';
import {GradientDiv} from '@/components/GradientDiv';
import {IAddWidgetSocial} from '@/libs/types/IAddWidgetData';

const Page = () => {
  const dispatch = useAppDispatch();
  const myWidget = useAppSelector(state => state.myWidget.data);
  const isFetchingRef = useRef(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataWidget, setDataWidget] = useState<IItemWidgetType[]>([]);
  const [dataSocial, setDataSocial] = useState<IAddWidgetSocial[]>([]);
  const {preview, isMobileScreen} = useContext(PreviewContext);

  const isDesktop = useMemo(
    () => preview === PreviewTypeEnum.DESKTOP && !isMobileScreen,
    [preview, isMobileScreen],
  );

  const fetchData = useCallback(
    (withLoading = true) => {
      isFetchingRef.current = true;
      if (withLoading) setIsLoading(true);
      apiGetWidgetData(dispatch, false)
        .then(response => {
          const data = response.data?.data?.widgetList;
          const social = response.data?.data?.sosmed;
          const formattedData: IItemWidgetType[] = data.map(formatWidgetData);
          dispatch(setWidgetData(formattedData));
          setDataWidget([...formattedData]);
          setDataSocial([...social]);
        })
        .catch()
        .finally(() => {
          if (withLoading) setIsLoading(false);
          isFetchingRef.current = false;
        });
    },
    [dispatch],
  );

  useEffect(() => {
    if (myWidget.length === 0 && !isFetchingRef.current) {
      fetchData();
    }
  }, [fetchData, myWidget]);

  return (
    <div className="flex justify-center items-center w-full h-[calc(100dvh-7.5rem)] overflow-hidden">
      {isDesktop ? (
        <div className={'relative max-h-[664px] xl:[756px]  h-full'}>
          <div
            className={
              ' relative aspect-[6.58/4.12] h-full border-4 border-solid rounded-[50px] border-color-[#444] bg-black p-8 overflow-hidden'
            }>
            <div
              className={'mockup-browser h-full w-full bg-base-100 py-6 px-8'}>
              <WidgetEditor
                isLoading={isLoading}
                dataWidget={dataWidget}
                fetchData={fetchData}
                setDataWidget={setDataWidget}
                dataSocial={dataSocial}
              />
            </div>
          </div>
          <GradientDiv />
        </div>
      ) : (
        <div className="mockup-phone h-full max-h-[756px]  w-80 md:w-96">
          <div className="camera"></div>
          <div className="display h-full">
            <WidgetEditor
              isLoading={isLoading}
              dataWidget={dataWidget}
              fetchData={fetchData}
              setDataWidget={setDataWidget}
              dataSocial={dataSocial}
            />
            <div className={'sticky bg-base-100 bottom-0 py-2 z-30 '}>
              <p className={'text-sm font-medium text-center'}>
                Try Twillink—it&apos;s free!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
