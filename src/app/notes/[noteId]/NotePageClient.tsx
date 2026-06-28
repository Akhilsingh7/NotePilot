"use client";

import NoteEditor from "@/components/BlockNoteEditor/NoteEditor";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { useCreateBlockNote } from "@blocknote/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteNote, updateNote } from "@/redux/slices/notesSlice";
import { Note } from "@/types/Note";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function NotePageClient({ params }: { params: Promise<{ noteId: string }> }) {
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [isEditable, setIsEditable] = useState(false);

  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const { noteId } = use(params);

  const route = useRouter();
  const dispatch = useAppDispatch();

  const { data: session } = useSession();

  const isOwner = session?.user?.id === note?.userId;

  const editor = useCreateBlockNote({});
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`/api/notes/${noteId}`);
        console.log("data of single note is ", res.data);
        if (res.data.success) {
          setNote(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch particular note single page:", error);
        toast.error("try again later");
        route.push("/explore");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, []);

  useEffect(() => {
    if (!note) return;

    setTitle(note.title);
    setIsPublic(note.isPublic);

    editor.replaceBlocks(editor.document, note.content);
  }, [note, editor]);

  const editNotesHandler = async () => {
    try {
      const res = await axios.put(`/api/notes/${noteId}`, {
        title,
        content: editor.document,
        isPublic,
      });

      if (res.data.success) {
        setNote(res.data.data);
        const updatedNote = res.data.data;

        dispatch(updateNote(updatedNote));

        setIsEditable(false);

        toast.success("Note updated successfully");
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to update note");
    }
  };

  const deleteNoteHandler = async () => {
    try {
      const res = await axios.delete(`/api/notes/${noteId}`);

      if (res.data.success) {
        dispatch(deleteNote(noteId));
        toast.success("Note deleted");

        route.push("/dashboard");
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete note");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader text="Loading note..." />
      </div>
    );
  }

  console.log("public or not", note.isPublic);

  return (
    <AlertDialog>
      <main className="mx-auto flex w-full min-w-0 max-w-4xl flex-col gap-2 px-3 py-10 sm:px-6">
        {isOwner && (
          <div className="flex justify-end gap-2 mb-6">
            {isOwner && !isEditable && (
              <>
                <Button onClick={() => setIsEditable(true)}>Edit</Button>

                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
              </>
            )}

            {isOwner && isEditable && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setTitle(note.title);

                    setIsPublic(note.isPublic);

                    editor.replaceBlocks(editor.document, note.content);

                    setIsEditable(false);
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        )}

        {!isEditable ? (
          <h1 className="mb-6 break-words text-3xl font-serif font-bold sm:text-4xl md:text-5xl">
            {title}
          </h1>
        ) : (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-6 w-full min-w-0 border-b pb-2 text-3xl font-serif font-bold outline-none sm:text-4xl md:text-5xl"
          />
        )}

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-stone-300 flex items-center justify-center text-white font-semibold">
            {note.authorName?.slice(0, 2).toUpperCase()}
          </div>
        </div>
        <div className="min-w-0 border-t pt-8">
          <NoteEditor editor={editor} editable={isEditable} />
        </div>

        <div className="flex items-center gap-4 mb-8 text-sm text-gray-500">
          <span>❤️ {note.likesCount}</span>
          <span>{note.isPublic ? "Public 🌍" : "Private 🔒"}</span>
        </div>

        {isEditable && (
          <div className="flex items-center gap-3 mb-8">
            <Label>{isPublic ? "Public 🌍" : "Private 🔒"}</Label>

            <Switch checked={isPublic} onCheckedChange={setIsPublic} />
          </div>
        )}

        {isOwner && isEditable && (
          <Button onClick={() => editNotesHandler()}>Save</Button>
        )}
      </main>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Note?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. The note will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={deleteNoteHandler}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default NotePageClient;
