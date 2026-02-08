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
    <div className="p-4 max-w-full bg-white overflow-x-hidden">
      <button
        onClick={onReset}
        className="mb-3 text-xs font-black uppercase flex items-center gap-1.5 hover:gap-2.5 transition-all text-[#0F2854] hover:text-[#1C4D8D]"
      >
        <span>←</span> RESET
      </button>

      <div className="border-4 border-[#0F2854] bg-gradient-to-br from-[#0F2854] to-[#1C4D8D] p-3 mb-4 shadow-[4px_4px_0px_0px_rgba(15,40,84,1)]">
        <h2 className="text-2xl font-black text-white uppercase leading-tight drop-shadow-lg">
          RESULTS
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          {
            count: data.notFollowingBack.length,
            label: "NOT BACK",
            bg: "bg-[#1C4D8D]",
          },
          { count: data.mutuals.length, label: "MUTUAL", bg: "bg-[#4988C4]" },
          {
            count: data.youDontFollow.length,
            label: "YOU DON'T",
            bg: "bg-[#BDE8F5]",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`border-4 border-[#0F2854] ${stat.bg} p-2 text-center hover:scale-105 transition-all shadow-[2px_2px_0px_0px_rgba(15,40,84,1)]`}
          >
            <div
              className={`text-2xl font-black mb-0.5 drop-shadow-md ${stat.bg === "bg-[#BDE8F5]" ? "text-[#0F2854]" : "text-white"}`}
            >
              {stat.count}
            </div>
            <div
              className={`text-[10px] font-black uppercase tracking-wide leading-tight ${stat.bg === "bg-[#BDE8F5]" ? "text-[#0F2854]" : "text-white/90"}`}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mb-3 border-b-4 border-[#0F2854] bg-white shadow-[2px_2px_0px_0px_rgba(15,40,84,1)]">
        {tabs.map((tab: TabData, index: number) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 px-2 py-2 font-black text-xs uppercase border-b-4 transition-all ${
              activeTab === index
                ? "border-[#1C4D8D] text-[#0F2854] bg-[#BDE8F5] bg-opacity-20"
                : "border-transparent text-[#0F2854] opacity-60 hover:opacity-100 hover:bg-[#BDE8F5] hover:bg-opacity-10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mb-3 bg-white border-4 border-[#0F2854] shadow-[2px_2px_0px_0px_rgba(15,40,84,1)] overflow-hidden">
        <UserList users={tabs[activeTab].data} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleCopy}
          className={`border-4 border-[#0F2854] font-black text-xs uppercase py-2.5 transition-all shadow-[3px_3px_0px_0px_rgba(15,40,84,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,40,84,1)] hover:translate-x-[2px] hover:translate-y-[2px] ${
            copySuccess
              ? "bg-[#1C4D8D] text-white"
              : "bg-white hover:bg-[#BDE8F5] hover:bg-opacity-20 text-[#0F2854]"
          }`}
        >
          {copySuccess ? "✓ COPIED!" : "📋 COPY"}
        </button>
        <button
          onClick={handleExportCSV}
          className="bg-white border-4 border-[#0F2854] font-black text-xs uppercase py-2.5 hover:bg-[#BDE8F5] hover:bg-opacity-20 transition-all shadow-[3px_3px_0px_0px_rgba(15,40,84,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,40,84,1)] hover:translate-x-[2px] hover:translate-y-[2px] text-[#0F2854]"
        >
          💾 CSV
        </button>
      </div>
    </div>
  );
};
