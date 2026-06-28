"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { useState } from "react";
import { schema } from "./CustomSchema";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import NoteEditor from "./NoteEditor";

export default function BlockEditor() {
  const editor = useCreateBlockNote({ schema });
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const createNewNoteHandler = async () => {
    try {
      if (loading) return;

      if (!title.trim()) {
        toast.error("Title is required");
        return;
      }

      if (!editor.document.length) {
        toast.error("Content is empty");
        return;
      }

      setLoading(true);

      const res = await axios.post("/api/notes", {
        title,
        content: editor.document,
        isPublic,
      });

      console.log("response:", res.data);

      if (res?.data?.success) {
        toast.success("Note created successfully");
        setTitle("");
        setIsPublic(false);

        editor.replaceBlocks(editor.document, []);
      }
    } catch (err: unknown) {
      console.log("error:", err);

      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Error creating note. Try again later";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto mt-10 w-full min-w-0 max-w-3xl">
      <input
        type="text"
        placeholder="Untitled"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-2xl sm:text-3xl md:text-4xl font-bold outline-none placeholder-gray-400 mb-6"
      />

      <div className="flex justify-end items-center mb-4">
        {/* <p className="text-sm text-gray-500">Draft</p> */}

        <div className="flex items-center space-x-2">
          <Label htmlFor="public-mode">
            {isPublic ? "Public 🌍" : "Private 🔒"}
          </Label>
          <Switch
            id="public-mode"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
        </div>
      </div>

      <div className="min-w-0 bg-white p-3 sm:p-6 rounded-xl shadow-sm">
        <NoteEditor editor={editor} editable={!loading} />
      </div>
      <div>
        <Button
          disabled={loading}
          onClick={createNewNoteHandler}
          className={`px-4 py-2 rounded mt-4 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"
          }`}
        >
          {loading ? "Saving..." : "Add Note"}
        </Button>
      </div>
    </div>
  );
}
