'use client';
import Button from '@/components/Button';
import {useRouter} from 'next/navigation';
import SvgTwillinkLogo from '@/assets/svgComponents/SvgTwillinkLogo';

export default function Home() {
  const router = useRouter();
  return (
    <div data-theme="skinLight">
      <div className="h-screen w-screen flex flex-col items-center justify-center px-2">
        <SvgTwillinkLogo height={30} className="fill-logo" />
        <h1 className="text-center text-3xl text-primary font-bold leading-relaxed">
          Your exceptional Link in Bio
        </h1>
        <h2 className="text-primary font-semibold leading-relaxed">
          Claim your username now
        </h2>
        <div className="pt-3">
          <Button title="Get Started!" onClick={() => router.push('/signup')} />
        </div>
      </div>
    </div>
  );
}
