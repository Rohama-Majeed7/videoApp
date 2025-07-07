"use client";

import axios from "axios";
import React, { useContext } from "react";
import { VideoContext } from "@/app/components/ContextProvider";
import { Types } from "mongoose";

interface VideoProps {
  videoId: string | Types.ObjectId;
}

const DeleteVideo = ({ videoId}: VideoProps) => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("DeleteVideo must be used inside VideoProvider");
  }

  const { setVideoRefresh } = context;
  console.log("set video Refreh:",setVideoRefresh);
  
  const OnDeleteHandle = async () => {
    try {
      await axios.delete("/api/video", {
        data: {
          videoId: typeof videoId === "string" ? videoId : videoId.toString(),
        },
      });
      setVideoRefresh((prev) => prev + 1);

      alert("Video deleted successfully");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete video");
    }
  };
  return (
    <button
      onClick={OnDeleteHandle}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Delete Video
    </button>
  );
};

export default DeleteVideo;
