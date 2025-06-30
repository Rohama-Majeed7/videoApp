import Link from "next/link";
import { IVideo } from "../../../models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="rounded-xl overflow-hidden bg-slate-800 shadow-lg hover:shadow-purple-700 transition-all duration-300">
      {/* Video Thumbnail */}
      <figure className="relative">
        <Link href={`/videos/${video._id}`} className="group block">
          <div className="aspect-[14/16] w-full overflow-hidden">
            <video
              src={video.videoUrl}
              poster={video.thumbnailUrl}
              controls={video.controls}
              className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
            />
          </div>
        </Link>
      </figure>

      {/* Video Info */}
      <div className="p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:text-purple-400 transition-colors"
        >
          <h2 className="text-lg font-semibold text-slate-100 truncate">
            {video.title}
          </h2>
        </Link>
        <p className="mt-1 text-sm text-slate-400 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}
