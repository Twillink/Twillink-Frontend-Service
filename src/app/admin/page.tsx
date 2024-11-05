'use client';

import WidgetEditor from '@/components/WidgetEditor';
import {IItemWidgetType} from '@/libs/types/IItemWidgetType';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/libs/hooks/useReduxHook';
import {setWidgetData} from '@/libs/store/features/myWidgetSlice';
import {apiGetWidgetData} from '@/libs/api';
import {formatWidgetData} from '@/utils/formatWidgetData';

const Page = () => {
  const dispatch = useAppDispatch();
  const myWidget = useAppSelector(state => state.myWidget.data);
  const isFetchingRef = useRef(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataWidget, setDataWidget] = useState<IItemWidgetType[]>([]);

  const fetchData = useCallback(
    (withLoading = true) => {
      isFetchingRef.current = true;
      if (withLoading) setIsLoading(true);
      apiGetWidgetData(dispatch, false)
        .then(response => {
          const data = response.data;
          const formattedData: IItemWidgetType[] = data.map(formatWidgetData);
          dispatch(setWidgetData(formattedData));
          setDataWidget([...formattedData]);
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
    <div className="flex justify-center w-full h-[calc(100dvh-7.5rem)]">
      <div className="mockup-phone h-full w-80 md:w-96">
        <div className="camera"></div>
        <div className="display h-full">
          <WidgetEditor
            isLoading={isLoading}
            dataWidget={dataWidget}
            fetchData={fetchData}
            setDataWidget={setDataWidget}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
