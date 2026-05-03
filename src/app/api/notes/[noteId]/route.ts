import dbConnect from "@/lib/dbConnectMongo";
import { errorResponse, successResponse } from "@/lib/response";
import NotesModel from "@/models/Notes.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function GET(
  request: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return errorResponse("Unauthorized user", 401);
    }

    const noteId = params.noteId;

    const note = await NotesModel.findOne({
      _id: noteId,
      userId: session.user.id,
    });

    if (!note) {
      return errorResponse("Note not found", 404);
    }

    return successResponse("Note fetched successfully", note, 200);
  } catch (error: any) {
    console.log("Error in getting particular note:", error);

    return errorResponse("Error in getting user note", 500);
  }
}

export async function POST(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    await dbConnect();
  } catch (error) {
    console.log("Error in creating particular notes", error);
  }
}
