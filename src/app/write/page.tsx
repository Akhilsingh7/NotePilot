import { DynamicEditor } from "@/components/BlockNoteEditor/DynamicEditor";

function NewNote() {
  return (
    <div className="flex w-full min-w-0 justify-center mt-10 px-3 sm:px-4 ">
      <div className="w-full min-w-0 max-w-[700px] bg-white p-3 sm:p-6 rounded-xl">
        <DynamicEditor />
      </div>
    </div>
  );
}

export default NewNote;
