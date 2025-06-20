import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge class names with clsx
 * Provides a consistent way to combine conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}