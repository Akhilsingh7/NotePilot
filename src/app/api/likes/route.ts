import dbConnect from "@/lib/dbConnectMongo";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { errorResponse, successResponse } from "@/lib/response";

import LikesModel from "@/models/Likes.model";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return errorResponse("Unauthorized user", 401);
    }

    const allLikedNotes = await LikesModel.find({
      userId: session.user.id,
    }).select("noteId -_id");

    const likedNoteIds = allLikedNotes.map((like) => like.noteId);

    return successResponse(
      likedNoteIds,
      "Fetched liked notes successfully",
      200
    );
  } catch (error: any) {
    console.log("Error getting liked notes:", error);

    return errorResponse("Something went wrong", 500);
  }
}
