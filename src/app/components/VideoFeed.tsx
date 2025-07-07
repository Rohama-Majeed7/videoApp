"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import VideoComponent from "./VideoComponent";
import { IVideo } from "../../../models/Video";
import { VideoContext } from "./ContextProvider";
export default function VideoFeed() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);
const context = useContext(VideoContext)
if (!context) {
    throw new Error("DeleteVideo must be used inside VideoProvider");
  }
  const {videoRefresh} = context
  console.log("video Refresh:",videoRefresh);
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/video");
        console.log("response:",response);
        if(response.status === 200){
        setVideos(response.data);
        }
        else{
          setVideos([])
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [videoRefresh]);

  return (
    <div className="min-h-screen bg-slate-900 py-10 px-4 text-slate-100">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center text-purple-400 mb-10">
        🎥 Explore Videos
      </h1>

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-slate-400 text-lg">Loading videos...</div>
      ) : (
        <>
          {/* Video Grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
            {videos.length > 0 ? (
              videos.map((video) => (
                <VideoComponent key={video._id?.toString()} video={video} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-slate-500 text-lg">No videos found 🥲</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
