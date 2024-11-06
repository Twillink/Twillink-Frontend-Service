'use client';

import Button from '@/components/Button';
import SvgTwillinkLogo from '@/assets/svgComponents/SvgTwillinkLogo';
import Link from 'next/link';
import {useAppSelector} from '@/libs/hooks/useReduxHook';
import {RootState} from '@/libs/store/store';
import {RainbowButton} from '@/components/Button/RainbowButton';
import {MotionDiv, MotionImg} from '@/libs/motion/motion';

const Home: React.FC = () => {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );
  return (
    <div
      data-theme={'skinLight'}
      className={
        "p-16 flex h-screen justify-center items-center gap-[20%] bg-[url('/images/bg-intro.webp')] bg-cover"
      }>
      <MotionDiv
        initial={{opacity: 0, x: -100}}
        whileInView={{opacity: 1, x: 0}}
        transition={{
          ease: 'easeInOut',
          duration: 1,
          delay: 1,
        }}
        // data-theme="skinLight"
        className="flex flex-col items-start justify-center px-2 gap-4">
        <SvgTwillinkLogo height={30} className="fill-logo" />
        <h1 className="text-start text-4xl font-bold text-primary leading-relaxed">
          Your exceptional <span className={'block'}>Link in Bio</span>
        </h1>
        <h2 className="text-primary text-[20px] font-normal leading-relaxed mb-4">
          Claim your username now
        </h2>
        {isLoggedIn ? (
          <div>
            <Link href="/admin">
              <Button title="Go to Admin" />
            </Link>
          </div>
        ) : (
          <div className={'flex flex-row  items-center gap-4'}>
            <div>
              <Link href="/signup">
                <RainbowButton>Create your Twillink</RainbowButton>
              </Link>
            </div>
            <div>
              <p className={''}>or</p>
            </div>
            <div>
              <Link href="/login" className="hover:underline">
                <Button title={'Login'} color={'outline'} />
              </Link>
            </div>
          </div>
        )}
      </MotionDiv>
      <div>
        <div className={'relative'}>
          <div>
            <MotionImg
              initial={{opacity: 0, y: 100}}
              whileInView={{opacity: 1, y: 0}}
              transition={{
                ease: 'easeInOut',
                duration: 1,
                delay: 1,
              }}
              src="/images/Mobile Preview.webp"
              alt="Preview"
              className={'w-80'}
            />
          </div>
          <MotionDiv
            initial={{opacity: 0, x: -100}}
            whileInView={{opacity: 1, x: 0}}
            transition={{
              ease: 'easeInOut',
              duration: 1,
              delay: 2,
            }}
            className={'absolute top-[14%] left-[-50%]'}>
            <MotionImg
              initial={{
                transform: 'translateZ(8px) translateY(-2px)',
              }}
              animate={{
                transform: 'translateZ(32px) translateY(-8px)',
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 2,
                ease: 'easeInOut',
                delay: 3,
              }}
              src="/images/calendar.webp"
              alt="Preview"
              className={'w-60 '}
            />
          </MotionDiv>
          <MotionDiv
            initial={{opacity: 0, y: 10, scale: 0.5}}
            whileInView={{opacity: 1, y: 0, scale: 1}}
            transition={{
              ease: 'easeInOut',
              duration: 1,
              delay: 2,
            }}
            className={' absolute bottom-[8%] right-[-30%]'}>
            <MotionImg
              initial={{
                transform: 'translateZ(8px) translateY(0px)',
              }}
              animate={{
                transform: 'translateZ(32px) translateY(-6px)',
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 2,
                ease: 'easeInOut',
                delay: 3,
              }}
              src="/images/blog.webp"
              alt="Preview"
              className="h-[168px]"
            />
          </MotionDiv>
        </div>
      </div>
    </div>
  );
};

export default Home;
