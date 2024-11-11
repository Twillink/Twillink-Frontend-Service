'use client';

import NavBar from '@/components/NavBar';
import Sidebar, {Menu} from '@/components/Sidebar';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import SvgChartSquare from '@/assets/svgComponents/SvgChartSquare';
import SvgLink from '@/assets/svgComponents/SvgLink';
import SvgTwilmeetIcon from '@/assets/svgComponents/SvgTwilmeetIcon';
import SvgUser from '@/assets/svgComponents/SvgUser';
import {RootState} from '@/libs/store/store';
import {useAppDispatch, useAppSelector} from '@/libs/hooks/useReduxHook';
import Loader from '@/components/Loader';
import {apiGetCountry, apiGetUserProfile} from '@/libs/api';
import {
  clearUserProfile,
  setUserProfile,
} from '@/libs/store/features/userProfileSlice';
import {setCountries} from '@/libs/store/features/countrySlice';
import {authLogout} from '@/libs/store/features/authSlice';

const sidebarMenu: Menu[] = [
  {
    title: 'My Twillink',
    path: '/admin',
    icon: <SvgLink className="stroke-primary" />,
  },
  {
    title: 'Analytic',
    path: '/admin/analytic',
    icon: <SvgChartSquare className="stroke-primary" />,
    disabled: true,
  },
  {
    title: 'Twilmeet',
    icon: <SvgTwilmeetIcon />,
    disabled: true,
    menuChild: [
      {title: 'Calendar', path: '/admin/twilmeet/calendar'},
      {title: 'Webinar / Class', path: '/admin/twilmeet/webinar'},
      {title: 'Revenue', path: '/admin/twilmeet/revenue'},
    ],
  },
  {
    title: 'Account',
    path: '/admin/account',
    icon: <SvgUser className="stroke-primary" />,
  },
];

export default function AdminLayout({children}: {children: React.ReactNode}) {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state: RootState) => state.userProfile);
  const country = useAppSelector((state: RootState) => state.country);

  const [initialized, setInitialized] = useState<boolean>(false);
  const isFetchingRef = useRef(false);

  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );

  const router = useRouter();
  const pathname = usePathname();
  const [title, setTitle] = useState<string>('My Twillink');

  useEffect(() => {
    const currentPath = pathname ?? '';
    const foundMenu = sidebarMenu.find(menu => menu.path === currentPath);
    if (foundMenu) {
      setTitle(foundMenu.title);
    }
  }, [pathname]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const authResString = queryParams.get('authRes');

    if (authResString) {
      try {
        const authRes = JSON.parse(authResString);
        localStorage.setItem('authToken', authRes.accessToken);
        localStorage.setItem('user', JSON.stringify(authRes));
      } catch (error) {
        console.error('Error parsing authRes:', error);
      }
    }

    const fetchUserProfile = () => {
      apiGetUserProfile(dispatch, false)
        .then(response => {
          dispatch(setUserProfile(response.data));
        })
        .catch(error => {
          console.log(error?.data, 'error');
          if (error?.data?.code === 401) {
            dispatch(authLogout());
            dispatch(clearUserProfile());
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            router.push('/');
          }
        });
    };

    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (!isLoggedIn && !token) {
        router.push('/');
      } else {
        if (country.countries.length === 0 && !isFetchingRef.current) {
          apiGetCountry(dispatch, false).then(response => {
            dispatch(setCountries(response.data));
          });
        }
        if (!userProfile.profile && !isFetchingRef.current) {
          isFetchingRef.current = true;
          fetchUserProfile();
        }

        setInitialized(true);
      }
    };
    checkAuth();
  }, [isLoggedIn, router, dispatch, userProfile, country?.countries?.length]);

  if (!initialized) {
    return <Loader />;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="min-h-dvh flex flex-col">
          <NavBar title={title} />
          <main className="flex flex-grow px-3 pt-3 pb-6">{children}</main>
        </div>
      </div>
      <Sidebar menus={sidebarMenu} />
    </div>
  );
}
