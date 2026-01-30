import type { FC } from "react";

export const LoadingSlide: FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <div className="w-20 h-20 border-8 border-gray-200 border-t-primary rounded-full spinner mx-auto mb-6"></div>
      <h2 className="text-3xl font-black uppercase mb-2">ANALYZING...</h2>
      <p className="text-sm font-bold uppercase opacity-60">PROCESSING DATA</p>
    </div>
  </div>
);
