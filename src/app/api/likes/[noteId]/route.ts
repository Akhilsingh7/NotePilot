import dbConnect from "@/lib/dbConnectMongo";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import { errorResponse, successResponse } from "@/lib/response";

import LikesModel from "@/models/Likes.model";
import NotesModel from "@/models/Notes.model";
import mongoose from "mongoose";

export async function POST(
  request: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return errorResponse("Unauthorized user", 401);
    }

    const { noteId } = await params;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return errorResponse("Invalid note id", 400);
    }

    const alreadyLiked = await LikesModel.findOne({
      userId: session.user.id,
      noteId,
    });

    if (alreadyLiked) {
      await LikesModel.findOneAndDelete({
        userId: session.user.id,
        noteId,
      });

      const updatedNote = await NotesModel.findByIdAndUpdate(
        noteId,
        {
          $inc: { likesCount: -1 },
        },
        { new: true }
      );

      if (!updatedNote) {
        return errorResponse("Note not found", 404);
      }

      return successResponse(
        {
          liked: false,
          noteId: updatedNote._id,
          likesCount: updatedNote.likesCount,
        },
        "Note unliked successfully",
        200
      );
    }

    await LikesModel.create({
      userId: session.user.id,
      noteId,
    });

    const updatedNote = await NotesModel.findByIdAndUpdate(
      noteId,
      {
        $inc: { likesCount: 1 },
      },
      { new: true }
    );

    if (!updatedNote) {
      return errorResponse("Note not found", 404);
    }

    return successResponse(
      {
        liked: true,
        noteId: updatedNote._id,
        likesCount: updatedNote.likesCount,
      },
      "Note liked successfully",
      200
    );
  } catch (error: any) {
    console.log("Error in liking note:", error);

    return errorResponse("Something went wrong", 500);
  }
}
