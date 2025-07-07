import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/db";
import Video, { IVideo } from "../../../../models/Video";
import { authOptions } from "../../../../lib/auth";
import { getServerSession } from "next-auth";
import User from "../../../../models/User";
// Delete video from image kit
// import { deleteFromImageKit } from "@/lib/deleteFromImageKit";

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
      return Response.json([], { status: 200 });
    }

    return Response.json(video, { status: 200 });
  } catch (error) {
    console.log("error:", error);

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

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { videoId} = body;

    if (!videoId) {
      return NextResponse.json(
        { error: "Missing videoId or fileId" },
        { status: 400 }
      );
    }
    await dbConnect();

    // 2. Delete from MongoDB
    try {
      await Video.findByIdAndDelete(videoId);
    } catch (dbErr) {
      console.error("DB delete failed:", dbErr);
      return NextResponse.json(
        { error: "Database delete failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Unknown DELETE error:", err);
    return NextResponse.json(
      { error: "Unknown delete error" },
      { status: 500 }
    );
  }
}
