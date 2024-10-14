'use client';

import Button from '@/components/Button';
import SvgTwillinkLogo from '@/assets/svgComponents/SvgTwillinkLogo';
import Link from 'next/link';
import {useAppSelector} from '@/libs/hooks/useReduxHook';
import {RootState} from '@/libs/store/store';

const Home: React.FC = () => {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );
  return (
    <div
      data-theme="skinLight"
      className="h-screen w-screen flex flex-col items-center justify-center px-2 gap-3">
      <SvgTwillinkLogo height={30} className="fill-logo" />
      <h1 className="text-center text-3xl font-bold text-primary leading-relaxed">
        Your exceptional Link in Bio
      </h1>
      <h2 className="text-primary font-semibold leading-relaxed">
        Claim your username now
      </h2>
      {isLoggedIn ? (
        <div>
          <Link href="/admin">
            <Button title="Go to Admin" />
          </Link>
        </div>
      ) : (
        <>
          <div>
            <Link href="/signup">
              <Button title="Create your Twillink" />
            </Link>
          </div>
          <div>
            <Link href="/login" className="hover:underline">
              Log In
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
