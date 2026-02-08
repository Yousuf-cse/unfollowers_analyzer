import type { FC } from "react";

export const LoadingSlide: FC = () => (
  <div className="flex items-center justify-center min-h-[400px] p-4 bg-white">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-[#BDE8F5] border-t-[#1C4D8D] rounded-full spinner mx-auto mb-4"></div>
      <h2 className="text-2xl font-black uppercase mb-2 text-[#0F2854]">
        ANALYZING...
      </h2>
      <p className="text-xs font-bold uppercase text-[#1C4D8D]">
        PROCESSING DATA
      </p>
      <div className="mt-4 flex gap-1 justify-center">
        <div className="w-2 h-2 bg-[#0F2854] rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-[#1C4D8D] rounded-full animate-pulse delay-75"></div>
        <div className="w-2 h-2 bg-[#4988C4] rounded-full animate-pulse delay-150"></div>
      </div>
    </div>
  </div>
);
