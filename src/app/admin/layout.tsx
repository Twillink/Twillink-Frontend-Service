'use client';
import NavBar from '@/components/NavBar';
import Sidebar, {Menu} from '@/components/Sidebar';
import LinkIcon from '@/assets/svg/Link-1.svg';
import AnalyticIcon from '@/assets/svg/Chart-Square-2.svg';
import TwilmeetIcon from '@/assets/svg/twilmeet-icon.svg';
import AccountIcon from '@/assets/svg/User-4.svg';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';

export const sidebarMenu: Array<Menu> = [
  {title: 'My Twillink', path: '/admin', icon: LinkIcon},
  {title: 'Analytic', path: '/admin/analytic', icon: AnalyticIcon},
  {
    title: 'Twilmeet',
    disabled: true,
    menuChild: [
      {title: 'Calendar', path: '/admin/twilmeet/calendar', icon: LinkIcon},
      {
        title: 'Webinar / Class',
        path: '/admin/twilmeet/webinar',
        icon: LinkIcon,
      },
      {title: 'Revenue', path: '/admin/twilmeet/revenue', icon: LinkIcon},
    ],
    icon: TwilmeetIcon,
  },
  {title: 'Account', path: '/admin/account', icon: AccountIcon},
];

export default function AdminLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const [title, setTitle] = useState('');
  useEffect(() => {
    console.log('+++ pathname', pathname);
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
