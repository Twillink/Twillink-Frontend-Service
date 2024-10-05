import Button from '@/components/Button';
import SvgTwillinkLogo from '@/assets/svgComponents/SvgTwillinkLogo';
import Link from 'next/link';

const Home: React.FC = () => {
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
        <Link href="/signup">
          <Button title="Get Started!" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
