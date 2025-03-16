import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string | undefined | null): string => {
  if (!name) return '';
  const splitted = name.split('');
  return splitted[0]?.toUpperCase() || '';
}
