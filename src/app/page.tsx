import Button from '@/components/Button';
import Image from 'next/image';
import Link from 'next/link';
import TwillinkLogo from '@/assets/svg/twillink-logo.svg';

export default function Home() {
  return (
    <div data-theme="skinLight">
      <article className="prose">
        <div className="h-screen w-screen flex flex-col items-center justify-center px-2">
          <Image src={TwillinkLogo} alt="twillink-logo-light" height={40} />
          <h1 className="text-center text-3xl text-primary font-bold leading-relaxed">
            Your exceptional Link in Bio
          </h1>
          <h2 className="text-primary font-semibold leading-relaxed">
            Claim your username now
          </h2>
          <Link href="/signup" className="pt-3">
            <Button title="Get Started!" />
          </Link>
        </div>
      </article>
    </div>
  );
}
