"use client";

import { upload } from "@imagekit/next";
import { useState } from "react";
import axios from "axios";
interface ImageKitUploadResponse {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  filePath: string;
  height?: number;
  width?: number;
  size: number;
  fileType: "image" | "video";
  isPrivateFile?: boolean;
}

interface FileUploadProps {
    onSuccess: (res: ImageKitUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    if (fileType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a valid video file");
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
      return false;
    }
    setError(null);
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      // ✅ Changed from fetch to axios
      const { data: auth } = await axios.get("/api/upload-file");

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: auth.publicKey,
        signature: auth.authenticationParameters.signature,
        expire: auth.authenticationParameters.expire,
        token: auth.authenticationParameters.token,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent));
          }
        },
      });
      console.log("upload response:", res);

      if (!res.fileId) {
        throw new Error("Upload response missing fileId");
      }
      onSuccess({
        fileId: res.fileId,
        name: res.name || "",
        url: res.url || "",
        thumbnailUrl: res.thumbnailUrl,
        filePath: res.filePath || "",
        height: res.height,
        width: res.width,
        size: res.size || 0,
        fileType: fileType ?? "image",
        isPrivateFile: res.isPrivateFile,
      });
    } catch (error) {
      console.error("Upload failed", error);
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
      />
      {uploading && <span>Uploading...</span>}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default FileUpload;
