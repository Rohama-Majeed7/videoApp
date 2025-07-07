import mongoose, { models, model, Schema } from "mongoose";
import Stream from "stream";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId | string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  fileId: string;
  controls?: boolean;
  transformation?: {
    width: number;
    height: number;
    quality?: number;
  };
  createdBy: mongoose.Types.ObjectId; // ✅ add this
}

const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    fileId: { type: String },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformation: {
      width: { type: Number, default: VIDEO_DIMENSIONS.width },
      height: { type: Number, default: VIDEO_DIMENSIONS.height },
      quality: { type: Number, min: 1, max: 100 },
    },

    // ✅ Add this field
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Video = models?.Video || model<IVideo>("Video", videoSchema);
export default Video;
