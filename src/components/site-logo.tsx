import Image from 'next/image';

import { cn } from '@/lib/utils';

export function SiteLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo/logo-main.png"
      alt="Elite Restorations"
      width={743}
      height={336}
      priority
      className={cn('h-11 w-auto', className)}
    />
  );
}
