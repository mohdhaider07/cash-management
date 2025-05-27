import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractErrorMessage = (error: any) => {
  const { data } = error;
  const message = data
    ? data.message
      ? data.message
      : "Something went wrong"
    : "Something went wrong";

  return message;
};
