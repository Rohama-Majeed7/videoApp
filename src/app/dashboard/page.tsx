import React from "react";
import VideoFeed from "@/app/components/VideoFeed";
import Header from "../components/Header";
import { getServerSession } from "next-auth";
const page = async () => {
  const session = await getServerSession();
  console.log("session:", session);

  return (
    <div>
      <Header />
      <VideoFeed />
    </div>
  );
};

export default page;
