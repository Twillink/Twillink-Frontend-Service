import React from 'react';
import SkinController from './SkinController';
import BurgerIcon from '@/assets/svg/Burger-Menu-1.svg';
import Image from 'next/image';

interface INavBar {
  title?: string;
}

export default function NavBar(props: INavBar) {
  const {title = 'My Twillink'} = props;
  return (
    <div className="navbar bg-none px-3 pt-0 md:pt-6">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer"
          className="btn drawer-button bg-transparent shadow-none border-none p-2 h-auto min-h-fit">
          <Image src={BurgerIcon} alt="burger-icon" />
        </label>
      </div>
      <div className="flex-1">
        <h2 className="font-bold text-general-high">{title}</h2>
      </div>
      <div className="flex-none">
        <SkinController />
      </div>
    </div>
  );
}
