import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price);
};
