import React, {useState} from 'react';
import SkinController from './SkinController';
import SvgBurgerMenu from '@/assets/svgComponents/SvgBurgerMenu';
import SvgLink from '@/assets/svgComponents/SvgLink';
import SvgBurgerMenu2 from '@/assets/svgComponents/SvgBurgerMenu2';
import PreviewController from '@/components/PreviewController';
import Button from '@/components/Button';
import PopupShareLink from '@/components/Popup/PopupShareLink';

interface INavBar {
  title?: string;
  username?: string;
}

const NavBar: React.FC<INavBar> = ({
  title = 'My Twillink',
  username = localStorage.getItem('username'),
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
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
      <div className="hidden sm:block">
        <div className="flex items-center gap-6">
          <PreviewController />
          <div className="hidden xl:block border-[1px] h-6"></div>
          <SkinController />
          <Button
            title="Share My Link"
            iconPosition="left"
            icon={<SvgLink className="stroke-primary-content" />}
            onClick={handleOpen}
          />
        </div>
      </div>
      <div className="block sm:hidden">
        <details className="dropdown dropdown-end">
          <summary className="btn bg-transparent shadow-none border-none p-0 m-1">
            <SvgBurgerMenu2 className="stroke-primary" />
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-20 w-52 p-2 shadow">
            <li>
              <div className="flex justify-end">
                <SkinController />
              </div>
            </li>
            <li>
              <div className="flex justify-end">
                <Button
                  title="Share My Link"
                  iconPosition="left"
                  icon={<SvgLink className="stroke-primary-content" />}
                  onClick={handleOpen}
                />
              </div>
            </li>
          </ul>
        </details>
      </div>
      <PopupShareLink
        isOpen={isOpen}
        onClose={handleClosePopup}
        username={username ?? undefined}
      />
    </div>
  );
};

export default NavBar;
