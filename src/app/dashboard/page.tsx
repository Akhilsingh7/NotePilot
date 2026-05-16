import { DynamicEditor } from "@/components/BlockNoteEditor/DynamicEditor";
import axios from "axios";
import { useSession } from "next-auth/react";

function DashboardPage() {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-[700px] bg-white p-6 rounded-xl shadow-md">
        <DynamicEditor />
      </div>
    </div>
  );
}

export default DashboardPage;
