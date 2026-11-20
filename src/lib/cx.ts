import { clsx, type ClassValue } from 'clsx';

/**
 * Class names for client components. `cn` also pulls in tailwind-merge, which
 * is a large client chunk. These call sites do not rely on conflicting
 * utilities overriding each other.
 */
export function cx(...inputs: ClassValue[]) {
  return clsx(inputs);
}
