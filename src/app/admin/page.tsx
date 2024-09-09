'use client';
import SkinController from '@/components/SkinController';
import Image from 'next/image';
import Link from 'next/link';
import TwillinkLogo from '@/assets/svg/twillink-logo.svg';
import TwillinkWhiteLogo from '@/assets/svg/twillink-logo-white.svg';
import {usePathname} from 'next/navigation';
import Button from '@/components/Button';

export default function Home() {
  const pathname = usePathname();
  const isActive = pathname === '/admin';
  return (
    <div>
      <article className="prose">
        <SkinController />
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            <div className="mockup-phone">
              <div className="camera"></div>
              <div className="display">
                <div data-theme="skinLight">
                  <div className="artboard artboard-demo bg-base-100 phone-1">
                    <h3>Content page here.</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 space-x-1">
              <Button title="Tiny" size="xs" />
              <Button title="Small" size="sm" />
              <Button title="Large" size="lg" />
              <Button title="Default" />
              <Button title="Success" type="success" />
              <Button title="Error" type="error" />
            </div>
          </div>
          <div className="drawer-side py-6 px-6">
            <ul className="menu bg-contras-high min-h-full w-80 m-0 rounded-3xl shadow-md">
              <div className="flex justify-center align-middle p-3">
                <div data-theme="skinLight" className="bg-transparent p-3">
                  <Image
                    className="[[data-theme=skinDark]_&]:hidden"
                    src={TwillinkLogo}
                    alt="twillink-logo-light"
                  />
                </div>
                <div data-theme="skinDark" className="bg-transparent">
                  <Image
                    className="[[data-theme=skinLight]_&]:hidden"
                    src={TwillinkWhiteLogo}
                    alt="twillink-logo-dark"
                  />
                </div>
              </div>
              <li className={`rounded-lg ${isActive ? 'bg-contras-low' : ''}`}>
                <Link href="/admin">My Twillink</Link>
              </li>
              <li className="rounded-lg">
                <Link href="/">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}
