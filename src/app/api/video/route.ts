import { NextRequest } from "next/server";
import { dbConnect } from "../../../../lib/db";
import Video, { IVideo } from "../../../../models/Video";
import { authOptions } from "../../../../lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    await dbConnect();
    const video = await Video.find({}).sort({ createdAt: -1 });
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
      controls: body.controls || true,
      transformation: {
        width: 1080,
        height: 1920,
        quality: body.transformation?.quality || 75, // Default quality
      },
    };

    const video = await Video.create(videoData);
    return Response.json(video, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to create video" }, { status: 500 });
  }
}
