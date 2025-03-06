'use client';

import WidgetViewer from '@/components/WidgetViewer';
import { IItemWidgetType } from '@/libs/types/IItemWidgetType';
import {
  useCallback,
  // useContext,
  useEffect,
  // useMemo,
  useRef,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '@/libs/hooks/useReduxHook';
import { setWidgetData } from '@/libs/store/features/myWidgetSlice';
import { apiGetWidgetUserData } from '@/libs/api';
import { formatWidgetData } from '@/utils/formatWidgetData';
// import {
//   PreviewContext,
//   PreviewTypeEnum,
// } from '@/libs/providers/PreviewProvider';
import { IAddWidgetSocial } from '@/libs/types/IAddWidgetData';
import { IWigetProfile } from '@/libs/types/IWigetProfile';
import { useParams } from 'next/navigation';
import useIsDesktop from './checkDesktop';
import { Rainbow } from 'lucide-react';
import { RainbowButton } from '@/components/Button/RainbowButton';
import Link from 'next/link';
import { motion } from "framer-motion";
import SvgLink from '@/assets/svgComponents/SvgLink';
import Button from '@/components/Button';
import PopupShareLink from '@/components/Popup/PopupShareLink';
import { usePopup } from '@/libs/providers/PopupProvider';


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
  const [showButton, setShowButton] = useState(true);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

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
          setDataProfile({ ...profile });
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

    const handleScroll = () => {
      setShowButton(false); // Sembunyikan tombol saat scroll

      // Hapus timeout sebelumnya jika masih ada
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      // Set timeout agar tombol muncul kembali setelah berhenti scroll
      scrollTimeout.current = setTimeout(() => {
        setShowButton(true);
      }, 500); // Tombol muncul lagi setelah 500ms berhenti scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [fetchData, myWidget]);

  const { openPopup } = usePopup();
  const handleOpen = () => {
    const safeUsername = Array.isArray(username) ? username[0] : username;
    openPopup('', <PopupShareLink username={safeUsername}/>, '');
  };


  return (
    <div className="flex flex-col justify-center items-center w-full bg-white">
      {isDesktop ? (
        <div className="w-full h-full p-20 h-screen   overflow-hidden">
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
        <div className="w-full h-full max-w-full max-h-full w-80 md:w-96 overflow-hidden">
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
          </div>
          <div className="absolute top-0 right-0 m-4 z-[20]">
            <Button
              title=""
              iconPosition="left"
              icon={<SvgLink className="stroke-primary-content" />}
              onClick={handleOpen}
            />
          </div>
          <div className="m-[60px]"></div>
        </div>
      )}
      {!isDesktop && showButton &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showButton ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 w-full py-4 z-30 px-4"
        >
          <p className={'text-sm font-medium text-center'}>
            <Link href="/" target="_blank" className="text-black-500 hover:underline">
              <RainbowButton>
                Try Twillink—it&apos;s free!
              </RainbowButton>
            </Link>
          </p>
        </motion.div>
      }
    </div>
  );
};

export default Page;
