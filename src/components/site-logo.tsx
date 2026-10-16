import Image from 'next/image';

import { cn } from '@/lib/utils';

export function SiteLogo({
  className,
  tone = 'theme',
}: {
  className?: string;
  /** `light` forces the white mark, used over the dark homepage hero. */
  tone?: 'theme' | 'light';
}) {
  const lightMark = tone === 'light';

  return (
    <>
      <Image
        src="/images/logo/logo-black.png"
        alt="Elite Restorations"
        width={226}
        height={102}
        priority
        className={cn(
          'h-11 w-auto dark:hidden',
          lightMark ? 'hidden' : 'block',
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
          'h-11 w-auto',
          lightMark ? 'block' : 'hidden dark:block',
          className,
        )}
      />
    </>
  );
}
