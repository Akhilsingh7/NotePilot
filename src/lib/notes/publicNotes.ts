import NotesModel from "@/models/Notes.model";
import dbConnect from "../dbConnectMongo";

export async function getPublicNotes() {
  await dbConnect();

  const notes = await NotesModel.find({ isPublic: true }).lean();

  return notes.map((note) => ({
    ...note,
    _id: note._id.toString(),
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  }));
}
