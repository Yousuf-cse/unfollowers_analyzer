import type { FC } from "react";
import type { WelcomeSlideProps } from "../types/instagram";

export const WelcomeSlide: FC<WelcomeSlideProps> = ({ onNext }) => (
  <div className="p-4 max-w-full bg-white">
    <div className="border-4 border-[#0F2854] bg-gradient-to-br from-[#0F2854] to-[#1C4D8D] p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(15,40,84,1)]">
      <h1 className="text-3xl font-black text-white uppercase leading-none mb-2 tracking-tight drop-shadow-lg">
        INSTA
        <br />
        UNFOLLOWERS
      </h1>
      <p className="text-[#BDE8F5] font-bold text-xs uppercase tracking-wide">
        PRIVACY → SECURITY → INSTANT
      </p>
    </div>

    <div className="border-4 border-[#0F2854] bg-white mb-4 shadow-[3px_3px_0px_0px_rgba(15,40,84,1)]">
      <div className="bg-[#0F2854] text-white px-3 py-2">
        <h3 className="text-xs font-black uppercase tracking-wide">
          🔒 PRIVACY LOCK
        </h3>
      </div>
      <ul className="p-3 space-y-1.5 bg-[#BDE8F5] bg-opacity-20">
        {["NO LOGIN", "LOCAL ONLY", "NO SERVERS", "100% OFFLINE"].map(
          (item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 font-bold text-xs uppercase text-[#0F2854]"
            >
              <span className="text-[#1C4D8D] text-base leading-none">✓</span>
              <span className="leading-tight">{item}</span>
            </li>
          ),
        )}
      </ul>
    </div>

    <div className="border-4 border-[#0F2854] bg-white mb-4 shadow-[3px_3px_0px_0px_rgba(15,40,84,1)]">
      <div className="bg-[#4988C4] text-white px-3 py-2 border-b-4 border-[#0F2854]">
        <h3 className="text-xs font-black uppercase tracking-wide">
          📥 GET DATA
        </h3>
      </div>
      <ol className="p-3 space-y-1.5 list-decimal list-inside text-xs font-bold text-[#0F2854] bg-[#BDE8F5] bg-opacity-20">
        <li>INSTAGRAM → SETTINGS</li>
        <li>PRIVACY & SECURITY</li>
        <li>DATA DOWNLOAD</li>
        <li className="flex items-center gap-1 flex-wrap">
          <span>FORMAT:</span>
          <span className="bg-[#0F2854] text-[#BDE8F5] px-2 py-0.5 font-mono text-xs rounded">
            JSON
          </span>
        </li>
        <li>WAIT 5-10 MIN</li>
        <li>UPLOAD HERE ↓</li>
      </ol>
    </div>

    <button
      onClick={onNext}
      className="w-full bg-[#1C4D8D] text-white border-4 border-[#0F2854] hover:bg-[#4988C4] transition-all font-black text-base uppercase py-3 tracking-wide shadow-[4px_4px_0px_0px_rgba(15,40,84,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,40,84,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
    >
      START NOW →
    </button>

    <p className="text-center text-xs font-bold uppercase mt-4 text-[#0F2854] opacity-60">
      FREE • NO ADS • OPEN SOURCE
    </p>
  </div>
);
