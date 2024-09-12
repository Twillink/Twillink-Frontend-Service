'use client';
import React from 'react';
import {usePathname, useRouter} from 'next/navigation';
import SvgTwillinkLogo from '@/assets/svgComponents/SvgTwillinkLogo';
import ComingSoon from './ComingSoon';

export interface ISidebar {
  menus?: Array<Menu>;
}
export type Menu = {
  title: string;
  path?: string;
  menuChild?: Array<MenuChild>;
  icon?: any;
  disabled?: boolean;
};

export type MenuChild = {
  title: string;
  path: string;
  icon?: any;
};

export default function Sidebar(props: ISidebar) {
  const {menus} = props;
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="drawer-side z-50">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"></label>
      <div className="h-full p:0 md:p-6">
        <div className="bg-contras-high h-full w-72 rounded-r-3xl md:rounded-3xl  shadow-[rgba(59,63,81,0.12)_0px_8px_16px_0px]">
          <div className="flex justify-center align-middle p-6">
            <SvgTwillinkLogo className="fill-primary" width={70} />
          </div>
          <ul className="menu gap-3 text-sm font-semibold">
            {menus?.map((item, index) => {
              return (
                <li
                  key={index.toString()}
                  className={`rounded-lg ${pathname === item.path ? 'bg-base-200' : ''} ${item.disabled ? 'disabled pointer-events-none !text-general-med' : 'text-general-high'}`}>
                  {item.path && (
                    <button
                      type="button"
                      onClick={() => router.push(item.path || '')}
                      className="group gap-4">
                      {item.icon && <span>{item.icon}</span>}
                      {item.title}
                      {item.disabled && <ComingSoon className="mr-6" />}
                    </button>
                  )}
                  {item.menuChild && (
                    <details
                      id="disclosure-components"
                      className={`text-general-high ${item.disabled && 'pointer-events-none text-general-med'}`}>
                      <summary className="group gap-4">
                        {item.icon && item.icon}
                        {item.title}
                        {item.disabled && <ComingSoon />}
                      </summary>
                      <ul className="before:hidden">
                        {item.menuChild.map((child, idx) => (
                          <li
                            key={`child-${idx.toString()}`}
                            className={`rounded-lg ${pathname === child.path ? 'bg-base-200' : ''}`}>
                            <button
                              type="button"
                              onClick={() => router.push(child.path)}
                              className="group pl-8 gap-4">
                              {child.icon && child.icon}
                              {child.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
