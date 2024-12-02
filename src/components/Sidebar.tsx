'use client';

import React from 'react';
import {usePathname, useRouter} from 'next/navigation';
import SvgTwillinkLogo from '@/assets/svgComponents/SvgTwillinkLogo';
import ComingSoon from './ComingSoon';
import Image from 'next/image';
import twilmeetAds from '@/assets/gifs/twilmeet-ads.gif';
import SvgTwilmeetIcon from '@/assets/svgComponents/SvgTwilmeetIcon';
import Link from 'next/link';

export interface ISidebar {
  menus?: Menu[];
}

export type Menu = {
  title: string;
  path?: string;
  menuChild?: MenuChild[];
  icon?: React.ReactNode;
  disabled?: boolean;
};

export type MenuChild = {
  title: string;
  path: string;
  icon?: React.ReactNode;
};

const Sidebar: React.FC<ISidebar> = ({menus = []}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (path: string) => () => router.push(path);

  return (
    <div className="drawer-side z-50">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"></label>
      <div className="h-full p-0 md:p-6">
        <div className="flex flex-col justify-between bg-contras-high h-full w-72 rounded-r-3xl md:rounded-3xl shadow-[rgba(59,63,81,0.12)_0px_8px_16px_0px]">
          <div>
            <div className="flex justify-center items-center p-6">
              <SvgTwillinkLogo className="fill-primary" width={70} />
            </div>
            <ul className="menu gap-3 text-sm font-semibold">
              {menus.map((item, index) => {
                const itemClasses = `rounded-lg ${pathname === item.path ? 'bg-base-200' : ''} ${item.disabled ? 'disabled pointer-events-none !text-general-med' : 'text-general-high'}`;
                return (
                  <li key={index.toString()} className={itemClasses}>
                    {item.path && (
                      <button
                        type="button"
                        onClick={item.path ? handleClick(item.path) : undefined}
                        className="group gap-4">
                        {item.icon && <span>{item.icon}</span>}
                        {item.title}
                        {item.disabled && <ComingSoon className="mr-6" />}
                      </button>
                    )}
                    {item.menuChild && (
                      <details
                        id="disclosure-components"
                        className={`text-general-high ${item.disabled ? 'pointer-events-none text-general-med' : ''}`}>
                        <summary className="group gap-4">
                          {item.icon && item.icon}
                          {item.title}
                          {item.disabled && <ComingSoon />}
                        </summary>
                        <ul className="before:hidden">
                          {item.menuChild.map((child, idx) => {
                            const childClasses = `rounded-lg ${pathname === child.path ? 'bg-base-200' : ''}`;
                            return (
                              <li key={`child-${idx}`} className={childClasses}>
                                <Link href={child.path}>
                                  <div className="group flex pl-8 gap-2">
                                    {child.icon && child.icon}
                                    {child.title}
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </details>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="max-h-[365px] h-full w-full p-5">
            <div className="relative h-full w-full">
              <Image
                className="rounded-2xl h-full w-full object-cover"
                src={twilmeetAds}
                alt="twilmeet-ads"
                priority={false}
              />
              <div className="absolute inset-0 z-10 flex flex-col justify-between items-center p-4 bg-gradient-to-t from-black via-transparent to-transparent rounded-2xl">
                <div className="flex items-center justify-end w-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-50">
                    <SvgTwilmeetIcon height={32} />
                  </div>
                </div>
                <div className="text-sm font-semibold text-white">
                  One Click Webinar Tool
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
