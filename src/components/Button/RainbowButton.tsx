import React from 'react';
import {cn} from '@/utils/formater';

type RainbowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <div className={'relative h-11'}>
      <button
        className={cn(
          'group relative inline-flex h-11 z-10 bg-black animate-rainbow cursor-pointer items-center justify-center rounded-xl border-4 bg-[length:200%] px-8 py-2 font-medium text-base-100 transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',

          // before styles
          // 'before:absolute before:-z-10 before:bottom-[-10%] before:left-1/2  before:h-[120%] before:w-[120%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]',

          // light mode colors
          // 'dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]',

          // dark mode colors
          // 'light:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]',

          className,
        )}
        {...props}>
        {children}
      </button>
      <div
        className={cn(
          // base
          'absolute z-1 top-1/2 left-1/2 h-[90%] w-[100%] rounded-lg animate-pulse -translate-x-1/2 -translate-y-1/2',
          // bg color
          'before:absolute before:-z-10 before:left-1/2  before:h-[100%] before:w-[100%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.4*1rem))]',

          'dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]',

          'light:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]',
        )}
      />
    </div>
  );
}
