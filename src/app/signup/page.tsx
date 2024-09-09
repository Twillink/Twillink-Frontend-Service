'use client';
import Button from '@/components/Button';
/* eslint-disable react-hooks/rules-of-hooks */
import GradientBg from '@/components/GradientBg';
import {motion, AnimatePresence} from 'framer-motion';
import Link from 'next/link';
import {useState} from 'react';

interface Item {
  title: string;
  btnLabel: string;
  key: number;
  children: any;
}

const dataMock: Item[] = [
  {
    key: 1,
    title: 'Claim your link',
    btnLabel: 'Grab My Link',
    children: (
      <label className="input input-bordered flex items-center gap-2 text-primary">
        twilink.com/
        <input type="text" className="grow" placeholder="username" />
      </label>
    ),
  },
  {
    key: 2,
    title: 'Your email and password...',
    btnLabel: 'Send',
    children: (
      <div className="space-y-5">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="your mail"
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Your Password"
        />
      </div>
    ),
  },
  {
    key: 3,
    title: 'Please input code that already sent to your email',
    btnLabel: 'Start Now',
    children: <p className="text-primary">Token Input Here</p>,
  },
];

const page = () => {
  const [cards, setCards] = useState(dataMock);

  const moveToEnd = () => {
    setCards(cards.slice(1));
  };

  const addOneToStart = (key: number) => {
    const filtered = dataMock.filter(obj => {
      return obj.key === key;
    });
    if (filtered) {
      const newArr = filtered.concat(cards);
      setCards(newArr);
    }
  };

  const CARD_OFFSET = -20;
  const SCALE_FACTOR = 0.06;
  return (
    <div data-theme="skinLight">
      <GradientBg />
      <article className="prose">
        <div className="h-screen w-screen flex flex-col items-center justify-center px-1 md-0">
          <div className="stack">
            <AnimatePresence>
              {cards.map((item, index) => {
                return (
                  <motion.div
                    className="card bg-contras-high text-primary-content shadow-sm "
                    key={`card_${item.key}`}
                    initial={{y: 0}}
                    animate={{
                      y: index * 10,
                      opacity: index === 0 ? 1 : 0.5,
                      top: index * -CARD_OFFSET,
                      scale: 1 - index * SCALE_FACTOR,
                      zIndex: cards.length - index,
                    }}
                    exit={{
                      y: -700,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}>
                    <div className="card-body md:px-24 sm:px-12 py-20 ">
                      <div className="w-full space-y-5 md:w-96 sm:w-48">
                        {item.key !== dataMock[0].key && (
                          <button
                            className="btn btn-circle bg-transparent shadow-none border-none"
                            onClick={() => addOneToStart(item.key - 1)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                              />
                            </svg>
                          </button>
                        )}
                        <h3 className="card-title text-primary">
                          {item.title}
                        </h3>
                        {index === 0 && item.children}
                        {item.btnLabel && (
                          <div className="card-actions justify-end">
                            {item.key === dataMock[2].key ? (
                              <Link href={'/admin'}>
                                <Button title={item.btnLabel} />
                              </Link>
                            ) : (
                              <Button
                                title={item.btnLabel}
                                onClick={() => moveToEnd()}
                                icon={
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-5">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m4.5 12.75 6 6 9-13.5"
                                    />
                                  </svg>
                                }
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </article>
    </div>
  );
};

export default page;
