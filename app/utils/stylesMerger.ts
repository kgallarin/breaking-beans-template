import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function stylesMerger(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
