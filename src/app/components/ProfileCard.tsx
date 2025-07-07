"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
const ProfileCard = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-sm mx-auto bg-slate-800 fixed top-[60px] right-2 rounded-2xl shadow-xl  p-2  border border-slate-700"
    >
      <motion.div
        className="flex  mt-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex flex-col gap-3">
          <span className="text-sm sm:text-base font-medium truncate max-w-[140px]">
            👤 {session?.user.name}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-md transition-all duration-200"
          >
            Logout
          </button>
          <Link
            href={"/upload"}
            className=" bg-purple-600	 text-white p-2 rounded hover:bg-purple-700 "
          >
            Upload video
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;
