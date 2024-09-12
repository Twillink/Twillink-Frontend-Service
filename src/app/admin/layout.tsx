'use client';
import NavBar from '@/components/NavBar';
import Sidebar, {Menu} from '@/components/Sidebar';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import SvgChartSquare from '@/assets/svgComponents/SvgChartSquare';
import SvgLink from '@/assets/svgComponents/SvgLink';
import SvgTwilmeetIcon from '@/assets/svgComponents/SvgTwilmeetIcon';
import SvgUser from '@/assets/svgComponents/SvgUser';

export const sidebarMenu: Array<Menu> = [
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
      {
        title: 'Calendar',
        path: '/admin/twilmeet/calendar',
      },
      {
        title: 'Webinar / Class',
        path: '/admin/twilmeet/webinar',
      },
      {
        title: 'Revenue',
        path: '/admin/twilmeet/revenue',
      },
    ],
  },
  {
    title: 'Account',
    path: '/admin/account',
    icon: <SvgUser className="stroke-primary" />,
  },
];

export default function AdminLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const [title, setTitle] = useState('My Twillink');
  useEffect(() => {
    if (pathname) {
      const findPath = sidebarMenu.find(({path}) => path === pathname);
      if (findPath) {
        setTitle(findPath?.title);
      }
    }
  }, [pathname]);

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle"></input>
        <div className="drawer-content">
          <NavBar title={title} />
          <main className="min-h-screen p-3">{children}</main>
        </div>
        <Sidebar menus={sidebarMenu} />
      </div>
    </div>
  );
}
