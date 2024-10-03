import React from 'react';
import SkinController from './SkinController';
import SvgBurgerMenu from '@/assets/svgComponents/SvgBurgerMenu';
import SvgLink from '@/assets/svgComponents/SvgLink';
import ButtonLink from './ButtonLink';

interface INavBar {
  title?: string;
}

const NavBar: React.FC<INavBar> = ({title = 'My Twillink'}) => (
  <div className="navbar bg-none px-3 pt-0 md:pt-6">
    <div className="flex-none lg:hidden">
      <label
        htmlFor="my-drawer"
        className="btn drawer-button bg-transparent shadow-none border-none p-2 h-auto min-h-fit">
        <SvgBurgerMenu className="stroke-primary" />
      </label>
    </div>
    <div className="flex-1">
      <h2 className="font-bold text-general-high">{title}</h2>
    </div>
    <div className="flex-none">
      <div className="flex items-center gap-6">
        <SkinController />
        <ButtonLink
          title="Share My Link"
          iconPosition="left"
          icon={<SvgLink className="stroke-primary-content" />}
          href="/johndoe"
          target="_blank"
        />
      </div>
    </div>
  </div>
);

export default NavBar;
