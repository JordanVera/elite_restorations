import Image from 'next/image';

import { cn } from '@/lib/utils';

export function SiteLogo({ className }: { className?: string }) {
  return (
    <>
      <Image
        src="/images/logo/logo-black.png"
        alt="Elite Restorations"
        width={226}
        height={102}
        priority
        className={cn(
          'h-11 w-auto block dark:hidden', // Show in light theme only
          className,
        )}
      />
      <Image
        src="/images/logo/logo-white.png"
        alt="Elite Restorations"
        width={226}
        height={102}
        priority
        className={cn(
          'h-11 w-auto hidden dark:block', // Show in dark theme only
          className,
        )}
      />
    </>
  );
}
