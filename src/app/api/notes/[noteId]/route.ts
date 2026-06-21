import dbConnect from "@/lib/dbConnectMongo";
import { errorResponse, successResponse } from "@/lib/response";
import NotesModel from "@/models/Notes.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ noteId: string }> }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return errorResponse("Unauthorized user", 401);
    }

    const { noteId } = await params;

    const note = await NotesModel.findOne({
      _id: noteId,
      userId: session.user.id,
    });

    if (!note) {
      return errorResponse("Note not found", 404);
    }

    return successResponse(note, "Note fetched successfully", 200);
  } catch (error: any) {
    console.log("Error in getting particular note:", error);

    return errorResponse("Error in getting user note", 500);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return errorResponse("Unauthorized user", 401);
    }

    const { noteId } = await params;

    const body = await req.json();

    if (!body) {
      return errorResponse("No data provided", 400);
    }

    const updatedNote = await NotesModel.findOneAndUpdate(
      { _id: noteId, userId: session.user.id },
      { $set: body },
      { new: true }
    );

    if (!updatedNote) {
      return errorResponse("Note not found or not authorized", 404);
    }

    return successResponse(updatedNote, "Note updated successfully", 200);
  } catch (error: any) {
    console.log("Error in updating note:", error);

    return errorResponse("Something went wrong", 500);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return errorResponse("Unauthorized user", 401);
    }

    const { noteId } = await params;

    const deletedNote = await NotesModel.findOneAndDelete({
      _id: noteId,
      userId: session.user.id,
    });

    if (!deletedNote) {
      return errorResponse("Note not found or not authorized", 404);
    }

    return successResponse(deletedNote, "Note deleted successfully", 200);
  } catch (error: any) {
    console.log("Error in deleting note:", error);

    return errorResponse("Error in deleting note", 500);
  }
}
