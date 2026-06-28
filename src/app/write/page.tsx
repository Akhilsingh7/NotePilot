import { DynamicEditor } from "@/components/BlockNoteEditor/DynamicEditor";

function NewNote() {
  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-[700px] bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <DynamicEditor />
      </div>
    </div>
  );
}

export default NewNote;
