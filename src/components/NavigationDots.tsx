import type { FC } from "react";
import type { NavigationDotsProps } from "../types/instagram";

export const NavigationDots: FC<NavigationDotsProps> = ({
  currentSlide,
  totalSlides,
  onNavigate,
}) => (
  <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
    {Array.from({ length: totalSlides }).map((_, index: number) => (
      <div
        key={index}
        onClick={() => onNavigate(index)}
        className={`h-3 bg-black cursor-pointer transition-all ${
          index === currentSlide ? "w-8 opacity-100" : "w-3 opacity-20"
        }`}
      />
    ))}
  </div>
);
