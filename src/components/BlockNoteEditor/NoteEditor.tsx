import { BlockNoteView } from "@blocknote/mantine";
import { SuggestionMenuController, useCreateBlockNote } from "@blocknote/react";
import { getCustomSlashMenuItems } from "./CustomSlash";

type Props = {
  // initialContent?: any;
  editor: any;
  editable: boolean;
};

export default function NoteEditor({
  // initialContent,
  editor,
  editable,
}: Props) {
  return (
    <BlockNoteView
      editor={editor}
      formattingToolbar={false}
      slashMenu={false}
      editable={editable}
      // onChange={() => {
      //   console.log({ title, content: editor.document });
      // }}
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
  );
}
