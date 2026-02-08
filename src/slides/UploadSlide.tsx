import type { FC, ChangeEvent, DragEvent } from "react";
import { useState, useRef } from "react";
import type { UploadSlideProps } from "../types/instagram";

export const UploadSlide: FC<UploadSlideProps> = ({
  onBack,
  onFileSelect,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="p-4 max-w-full bg-white">
      <button
        onClick={onBack}
        className="mb-3 text-xs font-black uppercase flex items-center gap-1.5 hover:gap-2.5 transition-all text-[#0F2854] hover:text-[#1C4D8D]"
      >
        <span>←</span> BACK
      </button>

      <div className="border-4 border-[#0F2854] bg-gradient-to-br from-[#0F2854] to-[#1C4D8D] p-3 mb-4 shadow-[4px_4px_0px_0px_rgba(15,40,84,1)]">
        <h2 className="text-2xl font-black text-white uppercase leading-tight drop-shadow-lg">
          UPLOAD
          <br />
          DATA.ZIP
        </h2>
      </div>

      <button
        onClick={() =>
          chrome.runtime.sendMessage({
            type: "OPEN_INSTAGRAM_EXPORT_NEW",
          })
        }
        className="w-full mb-2 border-4 border-[#0F2854] bg-white font-black text-xs uppercase py-2.5 hover:bg-[#BDE8F5] hover:bg-opacity-20 transition-all shadow-[2px_2px_0px_0px_rgba(15,40,84,1)] text-[#0F2854]"
      >
        🔗 GO TO INSTAGRAM DATA EXPORT
      </button>

      <button
        onClick={() => setShowGuide((prev) => !prev)}
        className="w-full mb-2 text-xs uppercase underline font-bold text-[#1C4D8D] hover:text-[#4988C4] transition-all"
      >
        {showGuide ? "Hide export steps ⬆️" : "How to export from Instagram ⬇️"}
      </button>

      {showGuide && (
        <div className="mb-3 border-4 border-[#0F2854] bg-white p-3 text-xs font-bold uppercase space-y-2 shadow-[2px_2px_0px_0px_rgba(15,40,84,1)] text-[#0F2854]">
          <p className="text-xs text-[#1C4D8D]">
            Follow these steps in Instagram:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-xs">
            <li>
              Click{" "}
              <span className="underline text-[#4988C4]">Create export</span>
            </li>
            <li>Choose your Instagram profile</li>
            <li>
              Select{" "}
              <span className="underline text-[#4988C4]">Export to device</span>
            </li>
            <li>
              Change format to{" "}
              <span className="underline text-[#4988C4]">JSON</span>
            </li>
            <li>
              Click{" "}
              <span className="underline text-[#4988C4]">Start export</span>
            </li>
          </ol>
          <p className="pt-1 text-xs">
            When the file is ready, download it and upload it here.
          </p>
        </div>
      )}

      <p className="mb-2 text-xs uppercase leading-tight text-[#0F2854] opacity-70">
        Instagram doesn't allow automatic access. You'll finish the export in
        Accounts Center.
      </p>

      <button
        onClick={() =>
          chrome.runtime.sendMessage({
            type: "OPEN_INSTAGRAM_EXPORT_OLD",
          })
        }
        className="w-full mb-3 text-xs uppercase underline font-bold text-[#0F2854] opacity-60 hover:opacity-100 transition-all"
      >
        Having trouble? Try the older Instagram settings
      </button>

      {error && (
        <div className="border-4 border-[#1C4D8D] bg-[#BDE8F5] bg-opacity-30 p-3 mb-3 shadow-[2px_2px_0px_0px_rgba(28,77,141,1)]">
          <p className="text-[#0F2854] font-bold text-xs leading-tight">
            {error}
          </p>
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`border-4 border-dashed p-6 text-center cursor-pointer transition-all mb-3 shadow-[3px_3px_0px_0px_rgba(15,40,84,1)] ${
          isDragging
            ? "bg-[#BDE8F5] bg-opacity-30 border-[#1C4D8D]"
            : "bg-white hover:bg-[#BDE8F5] hover:bg-opacity-10 border-[#0F2854]"
        }`}
      >
        <div className="text-4xl mb-3">📦</div>
        <h3 className="text-xl font-black uppercase mb-2 text-[#0F2854]">
          DROP HERE
        </h3>
        <p className="text-xs font-bold uppercase mb-3 text-[#0F2854] opacity-60">
          OR CLICK TO BROWSE
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="bg-[#1C4D8D] text-white border-4 border-[#0F2854] font-black text-xs uppercase py-2 px-4 hover:bg-[#4988C4] transition-all shadow-[3px_3px_0px_0px_rgba(15,40,84,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,40,84,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
        >
          CHOOSE FILE
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".zip"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="border-l-4 border-[#4988C4] bg-[#BDE8F5] bg-opacity-20 p-3 shadow-[2px_2px_0px_0px_rgba(73,136,196,0.3)]">
        <p className="text-xs font-bold uppercase leading-tight text-[#0F2854]">
          🔐 ALL PROCESSING IS LOCAL
          <br />
          <span className="text-[#1C4D8D]">NOTHING LEAVES YOUR BROWSER</span>
        </p>
      </div>
    </div>
  );
};
