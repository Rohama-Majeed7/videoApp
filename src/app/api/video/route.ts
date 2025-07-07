import { NextRequest } from "next/server";
import { dbConnect } from "../../../../lib/db";
import Video, { IVideo } from "../../../../models/Video";
import { authOptions } from "../../../../lib/auth";
import { getServerSession } from "next-auth";
import User from "../../../../models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    console.log("userId:", userId);
    await dbConnect();
    const user = await User.findById(userId).populate("videos");
    console.log("user:", user);

    const video = user.videos;
    console.log("videos:", video);

    if (!video || video.length === 0) {
      return Response.json([], { status: 404 });
    }

    return Response.json(video, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();
    const userId = session.user.id;
    const body: IVideo = await request.json();
    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return Response.json(
        { error: "missing fields  are required" },
        { status: 400 }
      );
    }
    const videoData = {
      ...body,
      createdBy: userId,
      controls: body.controls || true,
    };

    const video = await Video.create(videoData);
    await User.findByIdAndUpdate(userId, {
      $push: { videos: video._id },
    });

    return Response.json(video, { status: 201 });
  } catch (error) {
    console.log("error:", error);

    return Response.json({ error: "Failed to create video" }, { status: 500 });
  }
}
