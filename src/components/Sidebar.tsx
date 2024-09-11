'use client';
import React from 'react';
import Image from 'next/image';
import {usePathname, useRouter} from 'next/navigation';
import SvgTwillinkLogo from '@/assets/svg/SvgTwillinkLogo';

export interface ISidebar {
  menus?: Array<Menu>;
}
export type Menu = {
  title: string;
  path?: string;
  menuChild?: Array<MenuChild>;
  icon?: string;
  disabled?: boolean;
};

export type MenuChild = {
  title: string;
  path: string;
  icon?: string;
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
        <div className="bg-contras-high h-full w-72 shadow-contras-low shadow-md rounded-r-3xl md:rounded-3xl">
          <div className="flex justify-center align-middle p-6">
            <SvgTwillinkLogo />
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
                      {item.icon && (
                        <span>
                          <Image
                            src={item.icon}
                            alt={`icn-menu-${index}`}
                            className="stroke-red-700"
                            height={16}
                          />
                        </span>
                      )}
                      {item.title}
                    </button>
                  )}
                  {item.menuChild && (
                    <details
                      id="disclosure-components"
                      className={`text-general-high ${item.disabled && 'pointer-events-none text-general-med'}`}>
                      <summary className="group gap-4">
                        {item.icon && (
                          <span>
                            <Image src={item.icon} alt={`icn-menu-${index}`} />
                          </span>
                        )}
                        {item.title}
                        <span className="font-normal text-tiny bg-contras-med px-2 rounded-full text-general-med">
                          Coming Soon
                        </span>
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
                              {child.icon && (
                                <span>
                                  <Image
                                    src={child.icon}
                                    alt={`icn-menu-child-${idx}`}
                                  />
                                </span>
                              )}
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
