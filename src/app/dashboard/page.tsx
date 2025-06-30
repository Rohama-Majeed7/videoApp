import React from "react";
import VideoFeed from "@/app/components/VideoFeed";
import Link from "next/link";
import Header from "../components/Header";
import { getServerSession } from "next-auth";
const page = async () => {
  const session = await getServerSession();
  console.log("session:", session);

  return (
    <div>
      <Header />
      <VideoFeed />
      <Link
        href={"/upload"}
        className=" bg-purple-600	 text-white p-2 rounded hover:bg-purple-700 absolute top-18 right-4"
      >
        Upload a video
      </Link>
    </div>
  );
};

export default page;
