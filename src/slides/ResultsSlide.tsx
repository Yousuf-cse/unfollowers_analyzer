import type { FC } from "react";
import { useState } from "react";
import type { ResultsSlideProps } from "../types/instagram";
import type { TabData } from "../types/instagram";
import { UserList } from "../components/UserList";

export const ResultsSlide: FC<ResultsSlideProps> = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const tabs: TabData[] = [
    { label: "NOT BACK", data: data.notFollowingBack },
    { label: "MUTUAL", data: data.mutuals },
    { label: "YOU DON'T", data: data.youDontFollow },
  ];

  const handleCopy = (): void => {
    const currentData = tabs[activeTab].data;
    if (currentData.length === 0) {
      alert("NO USERNAMES TO COPY");
      return;
    }

    const text = currentData.map((u) => `@${u}`).join("\n");
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(() => {
        alert("COPY FAILED");
      });
  };

  const handleExportCSV = (): void => {
    const csvContent = [
      ["Category", "Username"],
      ...data.notFollowingBack.map((u) => ["Not Following Back", u]),
      ...data.mutuals.map((u) => ["Mutual", u]),
      ...data.youDontFollow.map((u) => ["You Don't Follow", u]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "instagram_analysis.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <button
        onClick={onReset}
        className="mb-4 text-sm font-black uppercase flex items-center gap-2 hover:gap-3 transition-all"
      >
        <span>←</span> RESET
      </button>

      <div className="border-8 border-black bg-dark p-4 mb-6">
        <h2 className="text-3xl font-black text-white uppercase leading-tight">
          RESULTS
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { count: data.notFollowingBack.length, label: "NOT BACK" },
          { count: data.mutuals.length, label: "MUTUAL" },
          { count: data.youDontFollow.length, label: "YOU DON'T" },
        ].map((stat, index) => (
          <div
            key={index}
            className="border-4 border-black bg-white p-4 text-center hover:bg-gray-50 transition-all"
          >
            <div className="text-4xl font-black text-primary mb-1">
              {stat.count}
            </div>
            <div className="text-[9px] font-black uppercase tracking-wide opacity-60">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4 border-b-4 border-black">
        {tabs.map((tab: TabData, index: number) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 font-black text-xs uppercase border-b-4 transition-all ${
              activeTab === index
                ? "border-black opacity-100"
                : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <UserList users={tabs[activeTab].data} />

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleCopy}
          className={`border-4 border-black font-black text-sm uppercase py-3 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
            copySuccess
              ? "bg-green-500 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {copySuccess ? "✓ COPIED!" : "📋 COPY"}
        </button>
        <button
          onClick={handleExportCSV}
          className="bg-white border-4 border-black font-black text-sm uppercase py-3 hover:bg-gray-100 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        >
          💾 CSV
        </button>
      </div>
    </div>
  );
};
