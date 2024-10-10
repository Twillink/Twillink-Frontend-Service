'use client';

import NavBar from '@/components/NavBar';
import Sidebar, {Menu} from '@/components/Sidebar';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import SvgChartSquare from '@/assets/svgComponents/SvgChartSquare';
import SvgLink from '@/assets/svgComponents/SvgLink';
import SvgTwilmeetIcon from '@/assets/svgComponents/SvgTwilmeetIcon';
import SvgUser from '@/assets/svgComponents/SvgUser';
import {RootState} from '@/libs/store/store';
import {useAppSelector} from '@/libs/hooks/useReduxHook';

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
  const [initialized, setInitialized] = useState<boolean>(false);

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
    const token = localStorage.getItem('authToken');
    if (!isLoggedIn && !token) {
      router.push('/');
    } else {
      setInitialized(true);
    }
  }, [isLoggedIn, router]);

  if (!initialized) {
    return <div>Loading...</div>;
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
