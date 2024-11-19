'use client';

import WidgetViewer from '@/components/WidgetViewer';
import {IItemWidgetType} from '@/libs/types/IItemWidgetType';
import {
  useCallback,
  // useContext,
  useEffect,
  // useMemo,
  useRef,
  useState,
} from 'react';
import {useAppDispatch, useAppSelector} from '@/libs/hooks/useReduxHook';
import {setWidgetData} from '@/libs/store/features/myWidgetSlice';
import {apiGetWidgetUserData} from '@/libs/api';
import {formatWidgetData} from '@/utils/formatWidgetData';
// import {
//   PreviewContext,
//   PreviewTypeEnum,
// } from '@/libs/providers/PreviewProvider';
import {IAddWidgetSocial} from '@/libs/types/IAddWidgetData';
import {IWigetProfile} from '@/libs/types/IWigetProfile';
import {useParams} from 'next/navigation';
import useIsDesktop from './checkDesktop';

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
  // const {preview, isMobileScreen} = useContext(PreviewContext);
  const params = useParams(); // Use useParams instead of useRouter
  const username = params?.twillink;

  const isDesktop = useIsDesktop();

  const fetchData = useCallback(
    (withLoading = true) => {
      isFetchingRef.current = true;
      if (withLoading) setIsLoading(true);
      apiGetWidgetUserData(dispatch, false, String(username))
        .then(response => {
          const data = response.data?.data?.widgetList;
          const social = response.data?.data?.sosmed;
          const profile = response?.data?.data?.profile;
          const formattedData: IItemWidgetType[] = data.map(formatWidgetData);

          dispatch(setWidgetData(formattedData));

          setDataWidget([...formattedData]);
          setDataSocial([...social]);
          setDataProfile({...profile});
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
    <div className="flex justify-center items-center w-full  overflow-hidden">
      {isDesktop ? (
        <div className="w-full h-full p-20 h-screen">
          <WidgetViewer
            isLoading={isLoading}
            dataWidget={dataWidget}
            fetchData={fetchData}
            setDataWidget={setDataWidget}
            dataSocial={dataSocial}
            dataProfile={dataProfile}
          />
        </div>
      ) : (
        <div className="w-full h-full max-w-full max-h-full w-80 md:w-96">
          <div className="camera"></div>
          <div className="display h-full">
            <WidgetViewer
              isLoading={isLoading}
              dataWidget={dataWidget}
              fetchData={fetchData}
              setDataWidget={setDataWidget}
              dataSocial={dataSocial}
              dataProfile={dataProfile}
            />
            <div className={'sticky bg-base-100 bottom-0 py-2 z-30 '}>
              <p className={'text-sm font-medium text-center'}>
                <a href="/" className="text-black-500 hover:underline">
                  Try Twillink—it&apos;s free!
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
