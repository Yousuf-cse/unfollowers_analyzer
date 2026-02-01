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
    <div className="p-8">
      <button
        onClick={onBack}
        className="mb-4 text-sm font-black uppercase flex items-center gap-2 hover:gap-3 transition-all"
      >
        <span>←</span> BACK
      </button>

      <button
        onClick={() =>
          chrome.runtime.sendMessage({
            type: "OPEN_INSTAGRAM_EXPORT_NEW",
          })
        }
        className="w-full mb-3 border-4 border-black bg-white font-black text-xs uppercase py-3 hover:bg-gray-100 transition-all"
      >
        🔗 GO TO INSTAGRAM DATA EXPORT
      </button>

      <p className="mt-2 text-[10px] uppercase opacity-50">
        Instagram doesn’t allow automatic access. You’ll finish the export in
        Accounts Center.
      </p>

      <button
        onClick={() =>
          chrome.runtime.sendMessage({
            type: "OPEN_INSTAGRAM_EXPORT_OLD",
          })
        }
        className="w-full text-[10px] uppercase underline opacity-60 hover:opacity-100"
      >
        Having trouble? Try the older Instagram settings
      </button>

      <div className="border-8 border-black bg-dark p-4 mb-6">
        <h2 className="text-3xl font-black text-red-800 uppercase leading-tight">
          UPLOAD
          <br />
          DATA.ZIP
        </h2>
      </div>

      {error && (
        <div className="border-4 border-red-600 bg-red-50 p-4 mb-4">
          <p className="text-red-900 font-bold text-sm">{error}</p>
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`border-8 border-dashed border-black p-8 text-center cursor-pointer transition-all mb-4 ${
          isDragging ? "bg-gray-100" : "hover:bg-gray-50"
        }`}
      >
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-2xl font-black uppercase mb-2">DROP HERE</h3>
        <p className="text-sm font-bold uppercase mb-4 opacity-60">
          OR CLICK TO BROWSE
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="bg-primary text-blue-600 border-4 border-black font-black text-sm uppercase py-3 px-6 hover:bg-dark transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
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

      <div className="border-l-4 border-gold bg-yellow-50 p-4">
        <p className="text-xs font-bold uppercase">
          🔐 ALL PROCESSING IS LOCAL
          <br />
          NOTHING LEAVES YOUR BROWSER
        </p>
      </div>
    </div>
  );
};
