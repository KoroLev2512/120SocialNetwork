import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSvgOptions = ({
  rotationDegree,
}: {
  rotationDegree: number;
}) => {
  return {
    style: {
      transform: `rotate(${rotationDegree || 0}deg)`,
      transition: "all 0.25s ease-in",
    },
  };
};
