import dbConnect from "@/lib/dbConnectMongo";
import { errorResponse, successResponse } from "@/lib/response";
import NotesModel from "@/models/Notes.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import LikesModel from "@/models/Likes.model";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return errorResponse("Unauthorized user", 401);
    }

    const likedNoteIds = await LikesModel.find({
      userId: session.user.id,
    }).select("noteId -_id");

    const noteIds = likedNoteIds.map((like) => like.noteId);

    const likedNote = await NotesModel.find({
      _id: { $in: noteIds },
    });

    if (!likedNote) {
      return errorResponse("Notes not found", 404);
    }

    return successResponse(likedNote, "Note fetched successfully", 200);
  } catch (error) {
    console.log("Error in getting particular note:", error);

    return errorResponse("Error in getting user note", 500);
  }
}
