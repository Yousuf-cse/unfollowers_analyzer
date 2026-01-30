import type { FC } from "react";
import type { UserListProps } from "../types/instagram";

export const UserList: FC<UserListProps> = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4 opacity-30">✨</div>
        <p className="text-sm font-bold uppercase opacity-50">EMPTY</p>
      </div>
    );
  }

  return (
    <div className="max-h-64 overflow-y-auto mb-4">
      {users.map((username: string, index: number) => {
        const initial = username.charAt(0).toUpperCase();
        return (
          <div
            key={index}
            className="flex items-center gap-3 p-3 mb-2 border-4 border-black bg-white hover:bg-gray-50 transition-all cursor-pointer"
          >
            <div className="w-10 h-10 bg-linear-to-br from-primary to-dark flex items-center justify-center text-white font-black text-lg flex-shrink-0">
              {initial}
            </div>
            <div className="font-black text-sm uppercase">@{username}</div>
          </div>
        );
      })}
    </div>
  );
};
