import * as React from 'react';

import { cn } from '@/lib/utils';

const dimmed =
  'group-hover/focus:scale-[0.985] group-hover/focus:opacity-40 hover:scale-100! hover:opacity-100! group-focus-within/focus:scale-[0.985] group-focus-within/focus:opacity-40 focus-within:scale-100! focus-within:opacity-100! motion-reduce:transform-none';

export function FocusCards({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <ul className={cn('group/focus', className)}>
      {React.Children.map(children, (child, index) => (
        <li
          key={index}
          className={cn(
            'transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
            dimmed,
          )}
        >
          {child}
        </li>
      ))}
    </ul>
  );
}
