import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const checkValidPhoneNumber = (num: string) => {
  return num.match(/(0[3|5|7|8|9])+([0-9]{8})\b/g) ? true : false
} 