import dbConnect from "@/lib/dbConnectMongo";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { errorResponse, successResponse } from "@/lib/response";
import NotesModel from "@/models/Notes.model";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return errorResponse("Unauthorized user", 401);
    }

    const body = await request.json();

    if (!body.title.trim() || !body.content) {
      return errorResponse("Title and content are required", 400);
    }

    const newNote = await NotesModel.create({
      authorName: session.user.name,
      userId: session.user.id,
      title: body.title,
      content: body.content,
      isPublic: body.isPublic ?? false,
    });

    if (!newNote) {
      return errorResponse("Error in created new Note", 401);
    }

    return successResponse(newNote, "Note created successfully", 201);
  } catch (error) {
    console.log("Error creating note:", error);

    return errorResponse("Something went wrong", 500);
  }
}

export async function GET(request: Request) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return errorResponse("Unauthorized user", 401);
    }

    const userId = session.user.id;

    const allNotes = await NotesModel.find({ userId });

    if (allNotes.length == 0) {
      return errorResponse(
        "No note exist for the user please create note",
        401
      );
    }

    return successResponse(allNotes, "All nootes for the user", 200);
  } catch (error: any) {
    console.log("error i getting all notes of the logen in user", error);

    return errorResponse(
      "Something went wrong in geeting all notes for the user ",
      500
    );
  }
}
