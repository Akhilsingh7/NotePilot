import { DynamicEditor } from "@/components/BlockNoteEditor/DynamicEditor";

function NewNote() {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-[700px] bg-white p-6 rounded-xl shadow-md">
        <DynamicEditor />
      </div>
    </div>
  );
}

export default NewNote;
