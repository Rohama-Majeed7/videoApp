"use client";

import { useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import ProfileCard from "./ProfileCard";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
const [user,setUser] = useState(false)

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
        <HiOutlineUser className="border-2 p-2 border-indigo-800 h-10 w-10 rounded-full" onClick={() => setUser(!user) } />
      )}
      {user && <ProfileCard />}
    </header>
  );
}
