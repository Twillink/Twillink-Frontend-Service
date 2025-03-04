'use client';

import WidgetEditor from '@/components/WidgetEditor';
import { IItemWidgetType } from '@/libs/types/IItemWidgetType';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '@/libs/hooks/useReduxHook';
import { setWidgetData } from '@/libs/store/features/myWidgetSlice';
import { apiGetWidgetData } from '@/libs/api';
import { formatWidgetData } from '@/utils/formatWidgetData';
import {
  PreviewContext,
  PreviewTypeEnum,
} from '@/libs/providers/PreviewProvider';
import { GradientDiv } from '@/components/GradientDiv';
import { IAddWidgetSocial } from '@/libs/types/IAddWidgetData';
import { IWigetProfile } from '@/libs/types/IWigetProfile';
import { RainbowButton } from '@/components/Button/RainbowButton';
import Link from 'next/link';
import Button from '@/components/Button';
import SvgSparkle from '@/assets/svgComponents/SvgSparkle';

const Page = () => {
  const dispatch = useAppDispatch();
  const myWidget = useAppSelector(state => state.myWidget.data);
  const isFetchingRef = useRef(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataWidget, setDataWidget] = useState<IItemWidgetType[]>([]);
  const [dataSocial, setDataSocial] = useState<IAddWidgetSocial[]>([]);
  const [dataProfile, setDataProfile] = useState<IWigetProfile>({
    username: '',
    email: '',
  });
  const { preview, isMobileScreen } = useContext(PreviewContext);

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
          const profile = response?.data?.data?.profile;
          const formattedData: IItemWidgetType[] = data.map(formatWidgetData);

          dispatch(setWidgetData(formattedData));

          setDataWidget([...formattedData]);
          setDataSocial([...social]);
          setDataProfile({ ...profile });
          localStorage.setItem('username', String(profile.username));
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
              ' relative aspect-[8/5] h-full border-4 border-solid rounded-[50px] border-color-[#444] bg-black p-8 overflow-hidden'
            }>
            <div
              className={'mockup-browser h-full w-full bg-base-100 py-6 px-8'}>
              <WidgetEditor
                isLoading={isLoading}
                dataWidget={dataWidget}
                fetchData={fetchData}
                setDataWidget={setDataWidget}
                dataSocial={dataSocial}
                dataProfile={dataProfile}
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
              dataProfile={dataProfile}
            />

            {/* <div
              className={
                'sticky bg-base-100 bottom-0 px-100 py-2 z-20 cursor-pointer'
              }>
              <div className={'px-6 mb-4'}>
                <Button
                  size={'md'}
                  className={'w-full h-8'}
                  title={'Go Pro'}
                  icon={
                    <SvgSparkle
                      width={20}
                      height={20}
                      className={'stroke-primary-content'}
                    />
                  }
                />
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
