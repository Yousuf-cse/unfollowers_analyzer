import { useEffect, useRef } from "react";
import type { FC } from "react";
import type { UserListProps } from "../types/instagram";

export const UserList: FC<UserListProps> = ({
  users,
  visited,
  activeIndex,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (activeIndex === undefined) return;

    const el = itemRefs.current[activeIndex];

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  if (!users.length) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4 opacity-30">✨</div>
        <p className="text-sm font-bold uppercase opacity-50">EMPTY</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="max-h-64 overflow-y-auto mb-4">
      {users.map((username, index) => {
        const initial = username.charAt(0).toUpperCase();
        const isVisited = visited.has(username);
        const isActive = index === activeIndex;

        return (
          <div
            key={username}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onClick={() =>
              chrome.runtime.sendMessage({
                type: "OPEN_PROFILE",
                username,
              })
            }
            className={`
              flex items-center gap-3 p-3 mb-2 border-4 cursor-pointer transition-all
              ${
                isActive
                  ? "border-blue-500 bg-blue-50 shadow-lg scale-[1.02]"
                  : "border-black bg-white hover:bg-gray-50"
              }
              ${isVisited ? "opacity-40 line-through" : ""}
            `}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-dark flex items-center justify-center text-white font-black text-lg">
              {initial}
            </div>

            <div className="font-black text-sm uppercase">@{username}</div>

            {isActive && (
              <span className="ml-auto text-xs font-black text-blue-600">
                CURRENT
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
