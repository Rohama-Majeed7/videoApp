"use client";

import React, { createContext, useState, ReactNode } from "react";

interface VideoContextType {
  selectedVideoId: string | null;
  setSelectedVideoId: (id: string | null) => void;
  videoRefresh: number;
  setVideoRefresh: React.Dispatch<React.SetStateAction<number>>;
}

export const VideoContext = createContext<VideoContextType | undefined>(
  undefined
);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [videoRefresh, setVideoRefresh] = useState<number>(0);

  return (
    <VideoContext.Provider
      value={{
        selectedVideoId,
        setSelectedVideoId,
        videoRefresh,
        setVideoRefresh,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
