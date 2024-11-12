'use client';

import Button from '@/components/Button';
import Link from 'next/link';
import {useAppSelector} from '@/libs/hooks/useReduxHook';
import {RootState} from '@/libs/store/store';
import {RainbowButton} from '@/components/Button/RainbowButton';
import {MotionDiv, MotionImg, MotionSpan} from '@/libs/motion/motion';

const Home: React.FC = () => {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );
  return (
    <div
      data-theme={'skinLight'}
      className={"bg-[url('/images/bg-intro.webp')] bg-cover"}>
      <div
        data-theme={'skinLight'}
        className={
          'p-4 md:p-16 flex flex-col md:flex-row h-screen bg-transparent max-w-screen-2xl justify-center md:justify-between mx-auto items-center gap-12 md:gap-0 '
        }>
        <div
          // data-theme="skinLight"
          className="flex flex-col items-start justify-center px-2 py-8 md:py-0 gap-0 md:gap-4">
          {/*<SvgTwillinkLogo height={30} className="fill-logo" />*/}

          <h1 className="text-start text-2xl md:text-4xl font-bold text-primary leading-relaxed">
            <MotionSpan
              initial={{opacity: 0, y: 50}}
              whileInView={{opacity: 1, y: 0}}
              transition={{
                ease: 'easeInOut',
                duration: 0.25,
              }}
              className={'block'}>
              Your exceptional{' '}
            </MotionSpan>
            <MotionSpan
              initial={{opacity: 0, y: 50}}
              whileInView={{opacity: 1, y: 0}}
              transition={{
                ease: 'easeInOut',
                duration: 0.25,
                delay: 0.25,
              }}
              className={'block'}>
              Link in Bio
            </MotionSpan>
          </h1>
          <MotionDiv
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            transition={{
              ease: 'easeInOut',
              duration: 0.25,
              delay: 0.75,
            }}>
            <h2 className="text-primary text-xl md:text-[20px] font-normal leading-relaxed mb-4">
              Claim your username now
            </h2>
          </MotionDiv>
          {isLoggedIn ? (
            <MotionDiv
              initial={{opacity: 0, y: 50}}
              whileInView={{opacity: 1, y: 0}}
              transition={{
                ease: 'easeInOut',
                duration: 0.25,
                delay: 1,
              }}>
              <Link href="/admin">
                <RainbowButton>Go to Admin</RainbowButton>
              </Link>
            </MotionDiv>
          ) : (
            <MotionDiv
              initial={{opacity: 0, y: 50}}
              whileInView={{opacity: 1, y: 0}}
              transition={{
                ease: 'easeInOut',
                duration: 0.25,
                delay: 1,
              }}
              className={'flex flex-row  items-center gap-4'}>
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
            </MotionDiv>
          )}
        </div>
        <div>
          <div className={'relative mr-10'}>
            <div>
              <MotionImg
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                transition={{
                  ease: 'easeInOut',
                  duration: 0.5,
                  delay: 1,
                }}
                src="/images/Mobile Preview.webp"
                alt="Preview"
                className={'w-[200px] md:w-80'}
              />
            </div>
            <MotionDiv
              initial={{opacity: 0, x: -100}}
              whileInView={{opacity: 1, x: 0}}
              transition={{
                ease: 'easeInOut',
                duration: 1,
                delay: 1,
              }}
              className={
                'absolute top-[18%] md:top-[14%] left-[-30%] md:left-[-50%]'
              }>
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
                  delay: 1,
                }}
                src="/images/calendar.webp"
                alt="Preview"
                className={'w-[130px] md:w-60'}
              />
            </MotionDiv>
            <MotionDiv
              initial={{opacity: 0, y: 100, scale: 0.8}}
              whileInView={{opacity: 1, y: 0, scale: 1}}
              transition={{
                ease: 'easeInOut',
                duration: 1,
                delay: 1,
              }}
              className={' absolute bottom-[8%] right-[-26%] md:right-[-30%]'}>
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
                  delay: 1,
                }}
                src="/images/blog.webp"
                alt="Preview"
                className="h-[100px] md:h-[168px]"
              />
            </MotionDiv>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
