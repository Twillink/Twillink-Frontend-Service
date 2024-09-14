'use client';

import {useRouter} from 'next/navigation';
import Button from '@/components/Button';
import SvgTwillinkLogo from '@/assets/svgComponents/SvgTwillinkLogo';

const Home: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signup');
  };

  return (
    <div
      data-theme="skinLight"
      className="h-screen w-screen flex flex-col items-center justify-center px-2">
      <SvgTwillinkLogo height={30} className="fill-logo" />
      <h1 className="text-center text-3xl font-bold text-primary leading-relaxed">
        Your exceptional Link in Bio
      </h1>
      <h2 className="text-primary font-semibold leading-relaxed">
        Claim your username now
      </h2>
      <div className="pt-3">
        <Button title="Get Started!" onClick={handleGetStarted} />
      </div>
    </div>
  );
};

export default Home;
