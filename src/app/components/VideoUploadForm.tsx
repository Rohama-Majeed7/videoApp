"use client";

import React, { useState } from "react";
import FileUpload from "./FileUpload";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

function VideoUploadForm() {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !videoUrl || !thumbnailUrl) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/video", {
        title,
        description,
        videoUrl,
        thumbnailUrl,
      });
      alert("Video uploaded successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(
        error?.response?.data?.error || "An error occurred while uploading."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  text-slate-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-8 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold text-center text-purple-400">
          🎥 Upload New Video
        </h2>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-slate-700 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 bg-slate-700 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            rows={3}
          />
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Video File
          </label>
          <FileUpload
            fileType="video"
            onProgress={(p) => setProgress(p)}
            onSuccess={(res) => setVideoUrl(res.url)}
          />
          {progress > 0 && progress < 100 && (
            <p className="text-sm text-slate-400 mt-1">
              Uploading: {progress.toFixed(0)}%
            </p>
          )}
          {videoUrl && (
            <video
              src={videoUrl}
              controls
              className="mt-3 w-full rounded-md shadow-lg"
            />
          )}
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Thumbnail Image
          </label>
          <FileUpload
            fileType="image"
            onSuccess={(res) => setThumbnailUrl(res.url)}
          />
          {thumbnailUrl && (
            <Image
              src={thumbnailUrl}
              alt="Thumbnail"
              width={160}
              height={90}
              className="mt-3 rounded-md shadow"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition-all duration-300"
        >
          {loading ? "Submitting..." : "Submit Video"}
        </button>
      </form>
    </div>
  );
}

export default VideoUploadForm;
