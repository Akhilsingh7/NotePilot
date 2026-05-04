import dbConnect from "@/lib/dbConnectMongo";
import { errorResponse, successResponse } from "@/lib/response";
import NotesModel from "@/models/Notes.model";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const allNote = await NotesModel.find({ isPublic: true }).sort({
      createdAt: -1,
    });

    return successResponse(allNote, "Public notes fetched", 200);
  } catch (error: any) {
    console.log("Error in fecting all notes", error);

    return errorResponse("Erro in fetching all notes", 500);
  }
}
