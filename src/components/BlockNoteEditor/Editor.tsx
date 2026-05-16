"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { SuggestionMenuController } from "@blocknote/react";
import "@blocknote/mantine/style.css";

import { useState } from "react";
import { schema } from "./CustomSchema";
import { getCustomSlashMenuItems } from "./CustomSlash";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import axios from "axios";
import toast from "react-hot-toast";

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
    } catch (err: any) {
      console.log("error:", err);

      const message =
        err?.response?.data?.message || "Error creating note. Try again later";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <input
        type="text"
        placeholder="Untitled"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-4xl font-bold outline-none placeholder-gray-400 mb-6"
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

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <BlockNoteView
          editor={editor}
          formattingToolbar={false}
          slashMenu={false}
          onChange={() => {
            console.log({ title, content: editor.document });
          }}
        >
          <SuggestionMenuController
            triggerCharacter="/"
            getItems={async (query) =>
              getCustomSlashMenuItems(editor).filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase())
              )
            }
          />
        </BlockNoteView>
      </div>
      <div>
        <button
          disabled={loading}
          onClick={createNewNoteHandler}
          className={`px-4 py-2 rounded mt-4 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"
          }`}
        >
          {loading ? "Saving..." : "Add Note"}
        </button>
      </div>
    </div>
  );
}
