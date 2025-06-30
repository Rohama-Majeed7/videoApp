"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-900 shadow-md text-slate-100">
      {/* Logo / Title */}
      <h1
        className="text-xl sm:text-2xl font-bold text-purple-400 cursor-pointer"
        onClick={() => router.push("/")}
      >
        🎬 VideoApp
      </h1>

      {/* User Info */}
      {status === "authenticated" && session?.user && (
        <div className="flex items-center gap-3">
          <span className="text-sm sm:text-base font-medium truncate max-w-[140px]">
            👤 {session.user.name}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-md transition-all duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
