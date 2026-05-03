"use client";

import { DynamicEditor } from "@/components/BlockNoteEditor/DynamicEditor";
import axios from "axios";
import { useSession } from "next-auth/react";

function DashboardPage() {
  const { data: session } = useSession();

  const addUser = async () => {
    try {
      const res = await axios.post("/api/notes/create", {
        title: "Test Note",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "This is a test note created from frontend 🚀",
                styles: {},
              },
            ],
          },
        ],
        isPublic: false,
      });

      console.log("Response:", res.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  console.log(session?.user?.id);
  return (
    <div className="flex justify-center mt-10">
      <div className="w-[700px] bg-white p-6 rounded-xl shadow-md">
        <DynamicEditor />
        <div>
          <button
            onClick={addUser}
            className="bg-black text-white px-4 py-2 rounded mt-4"
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
