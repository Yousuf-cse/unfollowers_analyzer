import type { FC } from "react";
import type { WelcomeSlideProps } from "../types/instagram";

export const WelcomeSlide: FC<WelcomeSlideProps> = ({ onNext }) => (
  <div className="p-8">
    <div className="border-8 border-black bg-primary p-6 mb-6">
      <h1 className="text-5xl font-black text-gray-500 uppercase leading-none mb-2 tracking-tight">
        INSTA
        <br />
        UNFOLLOWERS
      </h1>
      <p className="text-white font-bold text-sm uppercase tracking-wider">
        PRIVACY → SECURITY → INSTANT
      </p>
    </div>

    <div className="border-4 border-black bg-white mb-6">
      <div className="bg-black text-white px-4 py-2">
        <h3 className="text-sm font-black uppercase tracking-wider">
          🔒 PRIVACY LOCK
        </h3>
      </div>
      <ul className="p-4 space-y-2">
        {["NO LOGIN", "LOCAL ONLY", "NO SERVERS", "100% OFFLINE"].map(
          (item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 font-bold text-xs uppercase"
            >
              <span className="text-gold text-lg">✓</span>
              <span>{item}</span>
            </li>
          ),
        )}
      </ul>
    </div>

    <div className="border-4 border-black bg-lightgold mb-6">
      <div className="bg-gold text-black px-4 py-2 border-b-4 border-black">
        <h3 className="text-sm font-black uppercase tracking-wider">
          📥 GET DATA
        </h3>
      </div>
      <ol className="p-4 space-y-2 list-decimal list-inside text-xs font-bold">
        <li>INSTAGRAM → SETTINGS</li>
        <li>PRIVACY & SECURITY</li>
        <li>DATA DOWNLOAD</li>
        <li>
          FORMAT:{" "}
          <span className="bg-black text-lightgold px-2 py-1 font-mono">
            JSON
          </span>
        </li>
        <li>WAIT 5-10 MIN</li>
        <li>UPLOAD HERE ↓</li>
      </ol>
    </div>

    <button
      onClick={onNext}
      className="w-full bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all font-black text-lg uppercase py-4 tracking-wider shadow-[4px_4px_0px_0px_rgba(47,56,159,1)]"
    >
      START NOW →
    </button>

    <p className="text-center text-xs font-bold uppercase mt-4 opacity-50">
      FREE • NO ADS • OPEN SOURCE
    </p>
  </div>
);
