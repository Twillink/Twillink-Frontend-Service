'use client';

import NavBar from '@/components/NavBar';
import Sidebar, {Menu} from '@/components/Sidebar';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import SvgChartSquare from '@/assets/svgComponents/SvgChartSquare';
import SvgLink from '@/assets/svgComponents/SvgLink';
import SvgTwilmeetIcon from '@/assets/svgComponents/SvgTwilmeetIcon';
import SvgUser from '@/assets/svgComponents/SvgUser';

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
  const pathname = usePathname();
  const [title, setTitle] = useState<string>('My Twillink');

  useEffect(() => {
    const currentPath = pathname ?? '';
    const foundMenu = sidebarMenu.find(menu => menu.path === currentPath);
    if (foundMenu) {
      setTitle(foundMenu.title);
    }
  }, [pathname]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <NavBar title={title} />
        <main className="min-h-screen p-3">{children}</main>
      </div>
      <Sidebar menus={sidebarMenu} />
    </div>
  );
}
